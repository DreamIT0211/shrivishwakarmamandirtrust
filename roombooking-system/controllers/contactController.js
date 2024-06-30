// controllers/contactController.js

const nodemailer = require("nodemailer");

// Create transporter object for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sparadocx07@gmail.com", // Your Gmail email address
    pass: "oewx puka kdhg zlwe", // Your Gmail password or app-specific password if 2-factor authentication is enabled
  },
});

// Controller method to send contact message
exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Extract recipient email dynamically from the form data
    const recipientEmail = email; // Assuming email field contains the recipient's email

    // Create email content
    const mailOptions = {
      from: 'sparadocx07@gmail.com',
      to: recipientEmail, // Use recipient's email from the form data
      subject: 'New Contact Message',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};
