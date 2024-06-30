// controllers/eventController.js
const { sql, poolPromise } = require("../config/db");

const saveImageToServer = (file, folder) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No image uploaded"));
    }
    const imageUrl = `${process.env.DOMAIN_URL}/uploads/${folder}/${file.filename}`; // path where the image is saved
    resolve(imageUrl);
  });
};

class EventController {
  async getAllEventsClient(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT * FROM events");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getAllEvents(req, res) {
    try {
      const { page = 1, limit = 5 } = req.query;
      const offset = (page - 1) * limit;

      const pool = await poolPromise;
      const result = await pool
        .request()
        .query(
          `SELECT * FROM events ORDER BY event_id OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`
        );

      const totalResult = await pool
        .request()
        .query("SELECT COUNT(*) as total FROM events");

      const totalEvents = totalResult.recordset[0].total;

      res.json({
        events: result.recordset,
        totalEvents,
        totalPages: Math.ceil(totalEvents / limit),
        currentPage: Number(page),
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async createEvent(req, res) {
    const events = Array.isArray(req.body) ? req.body : [req.body];

    try {
      const pool = await poolPromise;

      for (const event of events) {
        const { event_title, event_description } = event;

        // Save the image to your server and obtain the image URL or file path
        const imageUrl = await saveImageToServer(req.file, 'events');

        // Save event details (including the image URL) to the database
        await pool
          .request()
          .input("event_image", sql.NVarChar, imageUrl) // Use the image URL obtained above
          .input("event_title", sql.NVarChar, event_title)
          .input("event_description", sql.NVarChar, event_description)
          .query(
            "INSERT INTO events (event_image, event_title, event_description) VALUES (@event_image, @event_title, @event_description)"
          );
      }

      res.json({ message: `${events.length} event(s) created successfully` });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateEvent(req, res) {
    const { id } = req.params;
    const { event_title, event_description } = req.body;
    let { event_image } = req.body;
  
    try {
      const pool = await poolPromise;
  
      // Check if a new image file is uploaded
      if (req.file) {
        const imageUrl = `${process.env.DOMAIN_URL}/uploads/events/${req.file.filename}`; // Obtain the image URL
        event_image = imageUrl; // Update the event_image with the new image URL
      }
  
      await pool
        .request()
        .input("id", sql.Int, id)
        .input("event_image", sql.NVarChar, event_image)
        .input("event_title", sql.NVarChar, event_title)
        .input("event_description", sql.NVarChar, event_description)
        .query(
          "UPDATE events SET event_image = @event_image, event_title = @event_title, event_description = @event_description WHERE event_id = @id"
        );
      res.json({ message: "Event updated successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async deleteEvent(req, res) {
    const { id } = req.params;
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("id", sql.Int, id)
        .query("DELETE FROM events WHERE event_id = @id");
      res.json({ message: "Event deleted successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new EventController();
