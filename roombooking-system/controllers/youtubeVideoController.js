// controllers/youtubeVideoController.js

const { sql, poolPromise } = require("../config/db");

class YouTubeVideoController {
  async getAllVideos(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT * FROM YouTubeVideos");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getAllVideosAdmin(req, res) {
    try {
      const { page = 1, limit = 5 } = req.query;
      const offset = (page - 1) * limit;

      const pool = await poolPromise;
      const result = await pool
        .request()
        .query(
          `SELECT * FROM YouTubeVideos ORDER BY video_id OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`
        );

      const totalResult = await pool
        .request()
        .query("SELECT COUNT(*) as total FROM YouTubeVideos");

      const totalvideos = totalResult.recordset[0].total;

      res.json({
        videos: result.recordset,
        totalvideos,
        totalPages: Math.ceil(totalvideos / limit),
        currentPage: Number(page),
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async createVideo(req, res) {
    const videos = Array.isArray(req.body) ? req.body : [req.body];

    try {
      const pool = await poolPromise;

      for (const video of videos) {
        const { video_link, video_title, video_description } = video;
        await pool
          .request()
          .input("video_link", sql.NVarChar, video_link)
          .input("video_title", sql.NVarChar, video_title)
          .input("video_description", sql.NVarChar, video_description)
          .query(
            "INSERT INTO YouTubeVideos (video_link, video_title, video_description) VALUES (@video_link, @video_title, @video_description)"
          );
      }

      res.json({ message: `${videos.length} video(s) created successfully` });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateVideo(req, res) {
    const { video_id } = req.params;
    const { video_link, video_title, video_description } = req.body;
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("video_id", sql.Int, video_id)
        .input("video_link", sql.NVarChar, video_link)
        .input("video_title", sql.NVarChar, video_title)
        .input("video_description", sql.NVarChar, video_description)
        .query(
          "UPDATE YouTubeVideos SET video_link = @video_link, video_title = @video_title, video_description = @video_description WHERE video_id = @video_id"
        );
      res.json({ message: "Video updated successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async deleteVideo(req, res) {
    const { video_id } = req.params;
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("video_id", sql.Int, video_id)
        .query("DELETE FROM YouTubeVideos WHERE video_id = @video_id");
      res.json({ message: "Video deleted successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getVideoById(req, res) {
    const { video_id } = req.params;
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("video_id", sql.Int, video_id)
        .query("SELECT * FROM YouTubeVideos WHERE video_id = @video_id");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new YouTubeVideoController();
