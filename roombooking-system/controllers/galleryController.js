// controllers/galleryController.js
const { sql, poolPromise } = require("../config/db");
const path = require("path");
const fs = require("fs");

const saveImageToServer = (file, folder) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No image uploaded"));
    }
    const imageUrl = `${process.env.DOMAIN_URL}/uploads/${folder}/${file.filename}`; // path where the image is saved
    resolve(imageUrl);
  });
};

class GalleryController {
  async getAllImages(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT * FROM gallery");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getImagesPaginated(req, res) {
    try {
      const { page = 1, limit = 5 } = req.query;
      const offset = (page - 1) * limit;

      const pool = await poolPromise;
      const result = await pool
        .request()
        .query(
          `SELECT * FROM gallery ORDER BY id OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`
        );

      const totalResult = await pool
        .request()
        .query("SELECT COUNT(*) as total FROM gallery");

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

  async uploadImage(req, res) {
    try {
      const pool = await poolPromise;

      const imageUrl = await saveImageToServer(req.file, "gallery");

      await pool
        .request()
        .input("image_url", sql.NVarChar, imageUrl) // Use the image URL obtained above
        .query("INSERT INTO gallery (image_url) VALUES (@image_url)");

      res.json({ message: "Image uploaded successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateImage(req, res) {
    const { id } = req.params;
    let { image_url } = req.body;

    try {
      const pool = await poolPromise;

      // Check if a new image file is uploaded
      if (req.file) {
        const newImageUrl = `${process.env.DOMAIN_URL}/uploads/gallery/${req.file.filename}`; // Obtain the new image URL
        image_url = newImageUrl; // Update the image_url with the new image URL
      }

      await pool
        .request()
        .input("id", sql.Int, id)
        .input("image_url", sql.NVarChar, image_url)
        .query("UPDATE gallery SET image_url = @image_url WHERE id = @id");
      res.json({ message: "Image updated successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // async deleteImage(req, res) {
  //   const { id } = req.params;
  //   try {
  //     const pool = await poolPromise;
  //     await pool
  //       .request()
  //       .input("id", sql.Int, id)
  //       .query("DELETE FROM gallery WHERE id = @id");
  //     res.json({ message: "Image deleted successfully" });
  //   } catch (err) {
  //     res.status(500).send(err.message);
  //   }
  // }

  async deleteImage(req, res) {
    const { id } = req.params;
    try {
      const pool = await poolPromise;

      // Retrieve image details to get the file name
      const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query("SELECT image_url FROM gallery WHERE id = @id");

      if (!result.recordset.length || !result.recordset[0].image_url) {
        return res.status(404).json({ message: "Image not found" });
      }

      const imageUrl = result.recordset[0].image_url;
      const fileName = imageUrl.split("/").pop(); // Extract filename from URL

      // Delete file from uploads/gallery directory
      const filePath = path.join(__dirname, `../uploads/gallery/${fileName}`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      // Delete image record from database
      await pool
        .request()
        .input("id", sql.Int, id)
        .query("DELETE FROM gallery WHERE id = @id");

      res.json({ message: "Image and file deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }
}

module.exports = new GalleryController();
