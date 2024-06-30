// app.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer'); 
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

// Function to create multiple directories if they don't exist
const createDirectories = (dirs) => {
  dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
      }
  });
};

// Call the function to ensure directories exist
createDirectories([
  path.join(__dirname, 'uploads/events'),
  path.join(__dirname, 'uploads/home'),
  path.join(__dirname, 'uploads/trustees')
]);

const heroImageMulter = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/home');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

// Create separate multer instances for each subdirectory
const eventMulter = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/events');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

const trusteeMulter = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/trustees');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
});
  

// app.use(cors());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const bookingRoutes = require('./routes/bookingRoutes');
const roomRoutes = require('./routes/roomRoutes');
const userRoutes = require('./routes/userRoutes');
const eventsRoutes = require('./routes/eventRoutes');
const youtubeVideoRoutes = require('./routes/youtubeVideoRoutes');
const liveDarshanRoutes = require('./routes/liveDarshanRoutes');
const heroImageRoutes = require('./routes/heroImageRoutes');
const contactRoutes = require('./routes/contactRoutes'); 
const headlineRoutes = require('./routes/headlineRoutes');
const trusteeRoutes = require('./routes/trusteeRoutes');

app.use('/api/bookings', bookingRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/users', userRoutes);
app.use('/api/youtube-videos', youtubeVideoRoutes);
app.use('/api/live-darshan', liveDarshanRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/headlines', headlineRoutes);
app.use('/api/events', eventMulter.single('image'), eventsRoutes);
app.use('/api/hero-images', heroImageMulter.single('image'), heroImageRoutes);
app.use('/api/trustees', trusteeMulter.single('image'), trusteeRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
