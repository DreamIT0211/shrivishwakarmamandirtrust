// controllers/trusteeController.js
const { sql, poolPromise } = require("../config/db");
const fs = require("fs");
const path = require("path");

const saveImageToServer = (file, folder) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No image uploaded"));
    }
    const imageUrl = `${process.env.DOMAIN_URL}/uploads/trustees/${file.filename}`; // path where the image is saved
    resolve(imageUrl);
  });
};

class TrusteeController {
  async getAllTrusteesClient(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT * FROM trustee");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getAllTrustees(req, res) {
    try {
      const { page = 1, limit = 5 } = req.query;
      const offset = (page - 1) * limit;

      const pool = await poolPromise;
      const result = await pool
        .request()
        .query(
          `SELECT * FROM trustee ORDER BY trustee_id OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`
        );

      const totalResult = await pool
        .request()
        .query("SELECT COUNT(*) as total FROM trustee");

      const totalTrustees = totalResult.recordset[0].total;

      res.json({
        trustees: result.recordset,
        totalTrustees,
        totalPages: Math.ceil(totalTrustees / limit),
        currentPage: Number(page),
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async createTrustee(req, res) {
    const {
      trustee_name,
      trustee_mobileNo,
      trustee_description,
      trustee_title,
    } = req.body;

    try {
      const pool = await poolPromise;

      // Save the image to your server and obtain the image URL or file path
      const imageUrl = await saveImageToServer(req.file, "trustees");

      // Save trustee details (including the image URL) to the database
      await pool
        .request()
        .input("trustee_image", sql.NVarChar, imageUrl) // Use the image URL obtained above
        .input("trustee_name", sql.NVarChar, trustee_name)
        .input("trustee_mobileNo", sql.NVarChar, trustee_mobileNo)
        .input("trustee_description", sql.NVarChar, trustee_description)
        .input("trustee_title", sql.NVarChar, trustee_title) // New column
        .query(
          "INSERT INTO trustee (trustee_image, trustee_name, trustee_mobileNo, trustee_description, trustee_title) VALUES (@trustee_image, @trustee_name, @trustee_mobileNo, @trustee_description, @trustee_title)"
        );

      res.json({ message: "Trustee created successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateTrustee(req, res) {
    const { id } = req.params;
    const {
      trustee_name,
      trustee_mobileNo,
      trustee_description,
      trustee_title,
    } = req.body;
    let { trustee_image } = req.body;

    try {
      const pool = await poolPromise;

      // Check if a new image file is uploaded
      if (req.file) {
        const imageUrl = `${process.env.DOMAIN_URL}/uploads/trustees/${req.file.filename}`; // Obtain the image URL
        trustee_image = imageUrl; // Update the trustee_image with the new image URL
      }

      await pool
        .request()
        .input("id", sql.Int, id)
        .input("trustee_image", sql.NVarChar, trustee_image)
        .input("trustee_name", sql.NVarChar, trustee_name)
        .input("trustee_mobileNo", sql.NVarChar, trustee_mobileNo)
        .input("trustee_description", sql.NVarChar, trustee_description)
        .input("trustee_title", sql.NVarChar, trustee_title) // New column
        .query(
          "UPDATE trustee SET trustee_image = @trustee_image, trustee_name = @trustee_name, trustee_mobileNo = @trustee_mobileNo, trustee_description = @trustee_description, trustee_title = @trustee_title WHERE trustee_id = @id"
        );
      res.json({ message: "Trustee updated successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // async deleteTrustee(req, res) {
  //   const { id } = req.params;
  //   try {
  //     const pool = await poolPromise;
  //     await pool
  //       .request()
  //       .input("id", sql.Int, id)
  //       .query("DELETE FROM trustee WHERE trustee_id = @id");
  //     res.json({ message: "Trustee deleted successfully" });
  //   } catch (err) {
  //     res.status(500).send(err.message);
  //   }
  // }

  async deleteTrustee(req, res) {
    const { id } = req.params;
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query("SELECT trustee_image FROM trustee WHERE trustee_id = @id");
      const trusteeImage = result.recordset[0].trustee_image;
      const fileName = path.basename(trusteeImage); // Get the file name from the URL
      const filePath = path.join(__dirname, "../uploads/trustees", fileName); // Construct the file path

      // Delete the file from the directory
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
        }
      });

      await pool
        .request()
        .input("id", sql.Int, id)
        .query("DELETE FROM trustee WHERE trustee_id = @id");
      res.json({ message: "Trustee deleted successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new TrusteeController();
