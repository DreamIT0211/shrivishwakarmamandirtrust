// controllers/liveDarshanController.js

const { sql, poolPromise } = require("../config/db");

class LiveDarshanController {
  async getLiveDarshan(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT TOP 1 * FROM live_darshan ORDER BY created_at DESC");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async createLiveDarshan(req, res) {
    const { video_link } = req.body;
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("video_link", sql.NVarChar, video_link)
        .query("INSERT INTO live_darshan (video_link) VALUES (@video_link); SELECT SCOPE_IDENTITY() AS id");
      
      const newDarshan = result.recordset[0];
      res.json({ id: newDarshan.id, video_link, created_at: new Date() });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateLiveDarshan(req, res) {
    const { id } = req.params;
    const { video_link } = req.body;
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("id", sql.Int, id)
        .input("video_link", sql.NVarChar, video_link)
        .query("UPDATE live_darshan SET video_link = @video_link WHERE id = @id");
      res.json({ message: "Live Darshan link updated successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async deleteLiveDarshan(req, res) {
    const { id } = req.params;
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("id", sql.Int, id)
        .query("DELETE FROM live_darshan WHERE id = @id");
      res.json({ message: "Live Darshan link deleted successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new LiveDarshanController();
