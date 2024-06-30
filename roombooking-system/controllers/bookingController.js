// controllers/bookingController.js
const { sql, poolPromise } = require("../config/db");

class BookingController {
  async getAllBookings(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(`
        SELECT 
          rb.BookingID, 
          r.RoomNumber, 
          u.Username, 
          rb.StartDate, 
          rb.EndDate, 
          rb.BookingStatus
        FROM 
          roombooking rb
        INNER JOIN 
          rooms r ON rb.RoomID = r.RoomID
        INNER JOIN 
          users u ON rb.UserID = u.UserID
      `);
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async createBooking(req, res) {
    const { RoomID, UserID, StartDate, EndDate, BookingStatus } = req.body;
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("RoomID", sql.Int, RoomID)
        .input("UserID", sql.Int, UserID)
        .input("StartDate", sql.DateTime, StartDate)
        .input("EndDate", sql.DateTime, EndDate)
        .input("BookingStatus", sql.NVarChar, BookingStatus)
        .query(
          "INSERT INTO roombooking (RoomID, UserID, StartDate, EndDate, BookingStatus) VALUES (@RoomID, @UserID, @StartDate, @EndDate, @BookingStatus)"
        );
      res.json({ message: "Booking created successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateBooking(req, res) {
    const { BookingID } = req.params;
    const { RoomID, UserID, StartDate, EndDate, BookingStatus } = req.body;
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("BookingID", sql.Int, BookingID)
        .input("RoomID", sql.Int, RoomID)
        .input("UserID", sql.Int, UserID)
        .input("StartDate", sql.DateTime, StartDate)
        .input("EndDate", sql.DateTime, EndDate)
        .input("BookingStatus", sql.NVarChar, BookingStatus)
        .query(
          "UPDATE roombooking SET RoomID = @RoomID, UserID = @UserID, StartDate = @StartDate, EndDate = @EndDate, BookingStatus = @BookingStatus WHERE BookingID = @BookingID"
        );
      res.json({ message: "Booking updated successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async deleteBooking(req, res) {
    const { BookingID } = req.params;
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("BookingID", sql.Int, BookingID)
        .query("DELETE FROM roombooking WHERE BookingID = @BookingID");
      res.json({ message: "Booking deleted successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getBookingsByUserID(req, res) {
    const { UserID } = req.params;
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("UserID", sql.Int, UserID)
        .query("SELECT * FROM roombooking WHERE UserID = @UserID");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new BookingController();
