// controllers/roomController.js
const { sql, poolPromise } = require("../config/db");

class RoomController {
  async getAllRooms(req, res) {
    try {
      const { page = 1, limit = 5 } = req.query;
      const offset = (page - 1) * limit;

      const pool = await poolPromise;
      const result = await pool
        .request()
        .query(
          `SELECT * FROM rooms ORDER BY RoomID OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`
        );

      const totalResult = await pool
        .request()
        .query("SELECT COUNT(*) as total FROM rooms");

      const totalRooms = totalResult.recordset[0].total;

      res.json({
        rooms: result.recordset,
        totalRooms,
        totalPages: Math.ceil(totalRooms / limit),
        currentPage: Number(page),
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // async createRoom(req, res) {
  //   try {
  //     const { RoomNumber, Capacity, Location, Price } = req.body;

  //     if (!RoomNumber || !Capacity || !Location || !Price) {
  //       return res
  //         .status(400)
  //         .json({ message: "RoomNumber, Capacity, Location & Price are required" });
  //     }
      

  //     const pool = await poolPromise;
  //     const result = await pool
  //       .request()
  //       .input("RoomNumber", sql.VarChar, RoomNumber)
  //       .input("Capacity", sql.Int, Capacity)
  //       .input("Location", sql.VarChar, Location)
  //       .input("Price", sql.Float, Price)
  //       .query(
  //         "INSERT INTO rooms (RoomNumber, Capacity, Location, Price) VALUES (@RoomNumber, @Capacity, @Location, @Price)"
  //       );
  //     res.json({ message: "Room created successfully" });
  //   } catch (err) {
  //     res.status(500).send(err.message);
  //   }
  // }

  async createRoom(req, res) {
    try {
        const { RoomNumber, Capacity, Location, Price } = req.body;

        if (!RoomNumber || !Capacity || !Location || !Price) {
            return res
                .status(400)
                .json({ message: "RoomNumber, Capacity, Location & Price are required" });
        }

        // Convert the input values to the appropriate data types
        const roomNumberStr = String(RoomNumber);
        const capacityInt = parseInt(Capacity, 10);
        const locationStr = String(Location);
        const priceFloat = parseFloat(Price);

        // // Check if conversion was successful for numeric values
        // if (isNaN(capacityInt) || isNaN(priceFloat)) {
        //     return res
        //         .status(400)
        //         .json({ message: "Capacity and Price must be valid numbers" });
        // }

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("RoomNumber", sql.VarChar, roomNumberStr)
            .input("Capacity", sql.Int, capacityInt)
            .input("Location", sql.VarChar, locationStr)
            .input("Price", sql.Float, priceFloat)
            .query(
                "INSERT INTO rooms (RoomNumber, Capacity, Location, Price) VALUES (@RoomNumber, @Capacity, @Location, @Price)"
            );

        res.json({ message: "Room created successfully" });
    } catch (err) {
        res.status(500).send(err.message);
    }
}


  async updateRoom(req, res) {
    try {
      const { RoomID } = req.params;
      const { RoomNumber, Capacity, Location, Price } = req.body;

      if (!RoomID) {
        return res.status(400).json({ message: "RoomID is required" });
      }

      if (!RoomNumber && !Capacity && !Location && !Price) {
        return res
          .status(400)
          .json({ message: "At least one field is required to update" });
      }

      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("RoomID", sql.Int, RoomID)
        .input("RoomNumber", sql.VarChar, RoomNumber)
        .input("Capacity", sql.Int, Capacity)
        .input("Location", sql.VarChar, Location)
        .input("Price", sql.Float, Price)
        .query(
          "UPDATE rooms SET RoomNumber = @RoomNumber, Capacity = @Capacity, Location = @Location, Price = @Price WHERE RoomID = @RoomID"
        );
      res.json({ message: "Room updated successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async deleteRoom(req, res) {
    try {
      const { RoomID } = req.params;

      if (!RoomID) {
        return res.status(400).json({ message: "RoomID is required" });
      }

      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("RoomID", sql.Int, RoomID)
        .query("DELETE FROM rooms WHERE RoomID = @RoomID");
      res.json({ message: "Room deleted successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getAvailableRooms(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(`
        SELECT * FROM rooms
        WHERE RoomID NOT IN (
          SELECT RoomID FROM roombooking
          WHERE StartDate <= GETDATE() AND EndDate >= GETDATE()
        )
      `);
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  
}

module.exports = new RoomController();
