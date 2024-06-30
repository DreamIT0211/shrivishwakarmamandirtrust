// controllers/headlineController.js

const { sql, poolPromise } = require("../config/db");
const Headline = require("../models/headline");

class HeadlineController {
  async getHeadline(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT TOP 1 * FROM Headline ORDER BY created_at DESC");
      if (result.recordset.length > 0) {
        const headline = result.recordset[0];
        res.json(new Headline(headline.NewsLineID, headline.Line, headline.created_at));
      } else {
        res.status(404).send('No headline found.');
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async createHeadline(req, res) {
    const { line } = req.body;
    try {
      const pool = await poolPromise;
      const check = await pool.request().query("SELECT COUNT(*) AS count FROM Headline");
      if (check.recordset[0].count > 0) {
        return res.status(400).send('Only one headline is allowed.');
      }

      const result = await pool
        .request()
        .input("line", sql.NVarChar, line)
        .query("INSERT INTO Headline (Line, created_at) VALUES (@line, GETDATE()); SELECT SCOPE_IDENTITY() AS NewsLineID");
      
      const newHeadline = result.recordset[0];
      res.json(new Headline(newHeadline.NewsLineID, line, new Date()));
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateHeadline(req, res) {
    const { id } = req.params; // id here refers to NewsLineID
    const { line } = req.body;
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("id", sql.Int, id)
        .input("line", sql.NVarChar, line)
        .query("UPDATE Headline SET Line = @line WHERE NewsLineID = @id");
      res.json({ message: "Headline updated successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async deleteHeadline(req, res) {
    const { id } = req.params; // id here refers to NewsLineID
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("id", sql.Int, id)
        .query("DELETE FROM Headline WHERE NewsLineID = @id");
      res.json({ message: "Headline deleted successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new HeadlineController();
