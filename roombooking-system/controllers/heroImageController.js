// controllers/heroImageController.js

const { sql, poolPromise } = require("../config/db");
const path = require('path');
const fs = require("fs");

// Function to save image to the server and return the URL
const saveImageToServer = (file, folder) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No image uploaded"));
    }
    const imageUrl = `${process.env.DOMAIN_URL}/uploads/${folder}/${file.filename}`; // Path where the image is saved
    resolve(imageUrl);
  });
};

class HeroImageController {
  async getAllHeroImages(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT * FROM HeroImages");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getAllHeroImagesAdmin(req, res) {
    try {
      const { page = 1, limit = 5 } = req.query;
      const offset = (page - 1) * limit;

      const pool = await poolPromise;
      const result = await pool
        .request()
        .query(
          `SELECT * FROM HeroImages ORDER BY image_id OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`
        );

      const totalResult = await pool
        .request()
        .query("SELECT COUNT(*) as total FROM HeroImages");

      const totalImages = totalResult.recordset[0].total;

      res.json({
        images: result.recordset,
        totalImages,
        totalPages: Math.ceil(totalImages / limit),
        currentPage: Number(page),
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async createHeroImage(req, res) {
    const images = Array.isArray(req.body) ? req.body : [req.body];

    try {
      const pool = await poolPromise;

      for (const image of images) {
        // Save the image to your server and obtain the image URL or file path
        const imageUrl = await saveImageToServer(req.file, "home");

        // Save image details (including the image URL) to the database
        await pool
          .request()
          .input("image_link", sql.NVarChar, imageUrl)
          .query("INSERT INTO HeroImages (image_link) VALUES (@image_link)");
      }

      res.json({ message: `${images.length} image(s) created successfully` });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateHeroImage(req, res) {
    const { image_id } = req.params;
    let { image_link } = req.body;

    try {
      const pool = await poolPromise;

      // Check if a new image file is uploaded
      if (req.file) {
        const imageUrl = await saveImageToServer(req.file, "home"); // Obtain the image URL
        image_link = imageUrl; // Update the image_link with the new image URL
      }

      await pool
        .request()
        .input("image_id", sql.Int, image_id)
        .input("image_link", sql.NVarChar, image_link)
        .query(
          "UPDATE HeroImages SET image_link = @image_link WHERE image_id = @image_id"
        );
      res.json({ message: "Image updated successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // async deleteHeroImage(req, res) {
  //   const { image_id } = req.params;
  //   try {
  //     const pool = await poolPromise;
  //     await pool
  //       .request()
  //       .input("image_id", sql.Int, image_id)
  //       .query("DELETE FROM HeroImages WHERE image_id = @image_id");
  //     res.json({ message: "Image deleted successfully" });
  //   } catch (err) {
  //     res.status(500).send(err.message);
  //   }
  // }

  async deleteHeroImage(req, res) {
    const { image_id } = req.params;
    try {
      const pool = await poolPromise;

      // Retrieve image details to get the file name
      const result = await pool
        .request()
        .input("image_id", sql.Int, image_id)
        .query("SELECT image_link FROM HeroImages WHERE image_id = @image_id");

      if (!result.recordset.length) {
        return res.status(404).json({ message: "Image not found" });
      }

      const imageUrl = result.recordset[0].image_link;
      const fileName = imageUrl.split("/").pop(); // Extract filename from URL

      // Delete file from uploads/home directory
      const filePath = path.join(__dirname, `../uploads/home/${fileName}`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      // Delete image record from database
      await pool
        .request()
        .input("image_id", sql.Int, image_id)
        .query("DELETE FROM HeroImages WHERE image_id = @image_id");

      res.json({ message: "Image and file deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }

  async getHeroImageById(req, res) {
    const { image_id } = req.params;
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("image_id", sql.Int, image_id)
        .query("SELECT * FROM HeroImages WHERE image_id = @image_id");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new HeroImageController();
