// controllers/userController.js
const { sql, poolPromise } = require("../config/db");
require("dotenv").config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sparadocx07@gmail.com", // Your Gmail email address
    pass: "oewx puka kdhg zlwe", // Your Gmail password or app-specific password if 2-factor authentication is enabled
  },
});

class UserController {
  async getAllUsers(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT * FROM users");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getAllUsersAdmin(req, res) {
    try {
      const { page = 1, limit = 5 } = req.query;
      const offset = (page - 1) * limit;

      const pool = await poolPromise;
      const result = await pool
        .request()
        .query(
          `SELECT * FROM users ORDER BY UserID OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`
        );

      const totalResult = await pool
        .request()
        .query("SELECT COUNT(*) as total FROM users");

      const totalUsers = totalResult.recordset[0].total;

      res.json({
        users: result.recordset,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: Number(page),
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateUser(req, res) {
    try {
      const { UserID } = req.params;
      const { Username, Email, FullName } = req.body;

      // Check if UserID, Username, Email, and FullName are provided
      if (!UserID || !Username || !Email || !FullName) {
        return res
          .status(400)
          .json({
            message: "UserID, Username, Email, and FullName are required",
          });
      }

      const pool = await poolPromise;

      // Check if the user exists
      const userExistsQuery = await pool
        .request()
        .input("UserID", sql.Int, UserID)
        .query("SELECT * FROM users WHERE UserID = @UserID");

      if (!userExistsQuery.recordset[0]) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update the user in the database
      const updateUserQuery = await pool
        .request()
        .input("UserID", sql.Int, UserID)
        .input("Username", sql.VarChar, Username)
        .input("Email", sql.VarChar, Email)
        .input("FullName", sql.VarChar, FullName).query(`
          UPDATE users 
          SET Username = @Username, Email = @Email, FullName = @FullName 
          WHERE UserID = @UserID
        `);

      res.json({ message: "User updated successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async registerUser(req, res) {
    try {
      const { Username, Password, Email, FullName } = req.body;

      const missingFields = [];

      if (!Username) {
        missingFields.push("Username");
      }
      if (!Password) {
        missingFields.push("Password");
      }
      if (!Email) {
        missingFields.push("Email");
      }
      if (!FullName) {
        missingFields.push("FullName");
      }

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `The following fields are required: ${missingFields.join(
            ", "
          )}`,
        });
      }

      const hashedPassword = await bcrypt.hash(Password, saltRounds);
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("Username", sql.VarChar, Username)
        .input("Password", sql.VarChar, hashedPassword)
        .input("Email", sql.VarChar, Email)
        .input("FullName", sql.VarChar, FullName)
        .query(
          "INSERT INTO users (Username, Password, Email, FullName) VALUES (@Username, @Password, @Email, @FullName)"
        );
      res.json({ message: "User created successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const UserID = req.params.UserID;
      const pool = await poolPromise;

      // Delete related records in the roombooking table
      await pool
        .request()
        .input("UserID", sql.Int, UserID)
        .query("DELETE FROM roombooking WHERE UserID = @UserID");

      // Delete related records in the room table
      const roombookingResult = await pool
        .request()
        .input("UserID", sql.Int, UserID)
        .query("SELECT RoomID FROM roombooking WHERE UserID = @UserID");
      const roomIDs = roombookingResult.recordset.map((row) => row.RoomID);
      for (const roomID of roomIDs) {
        await pool
          .request()
          .input("RoomID", sql.Int, roomID)
          .query("DELETE FROM room WHERE RoomID = @RoomID");
      }

      // Delete the user
      const result = await pool
        .request()
        .input("UserID", sql.Int, UserID)
        .query("DELETE FROM users WHERE UserID = @UserID");
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async loginUser(req, res) {
    try {
      const { UsernameOrEmail, Password } = req.body;

      if (!UsernameOrEmail) {
        return res
          .status(400)
          .json({ message: "Username or Email is required" });
      }

      if (!Password) {
        return res.status(400).json({ message: "Password is required" });
      }

      const pool = await poolPromise;

      // Determine if the input is an email or username
      const isEmail = UsernameOrEmail.includes("@");
      const query = isEmail
        ? "SELECT * FROM users WHERE Email = @UsernameOrEmail"
        : "SELECT * FROM users WHERE Username = @UsernameOrEmail";

      const result = await pool
        .request()
        .input("UsernameOrEmail", sql.VarChar, UsernameOrEmail)
        .query(query);

      const user = result.recordset[0];

      if (!user) {
        return res
          .status(401)
          .json({ message: `Invalid ${isEmail ? "email" : "username"}` });
      }

      const isValidPassword = await bcrypt.compare(Password, user.Password);

      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        {
          userId: user.UserID,
          username: user.Username,
          useremail: user.Email,
          userrole: user.Role,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.json({ message: "Login successful", token });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async forgotPassword(req, res) {
    try {
      const { Email } = req.body;

      if (!Email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("Email", sql.VarChar, Email)
        .query("SELECT * FROM users WHERE Email = @Email");
      const user = result.recordset[0];

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate a unique token for password reset
      const resetToken = jwt.sign(
        { userId: user.UserID },
        process.env.RESET_SECRET_KEY,
        {
          expiresIn: "1h", // token expires in 1 hour
        }
      );

      // Save the token in the database
      // Here you should have a method to save the token with the user ID and expiry timestamp

      // Send email with password reset link containing the token
      const resetLink = `http://localhost:3000/reset-password.html?token=${resetToken}`;
      const mailOptions = {
        from: "sparadocx07@gmail.com",
        to: user.Email,
        subject: "Password Reset",
        html: `Click <a href="${resetLink}">here</a> to reset your password.`,
      };

      // Sending email
      await transporter.sendMail(mailOptions);

      res.json({ message: "Password reset link sent to your email" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res
          .status(400)
          .json({ message: "Token and new password are required" });
      }

      // Decode the token to get the user ID
      const decodedToken = jwt.verify(token, process.env.RESET_SECRET_KEY);
      const userId = decodedToken.userId;

      // Update the user's password in the database
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      const pool = await poolPromise;
      await pool
        .request()
        .input("UserID", sql.Int, userId)
        .input("Password", sql.VarChar, hashedPassword)
        .query("UPDATE users SET Password = @Password WHERE UserID = @UserID");

      res.json({ message: "Password reset successful" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new UserController();
