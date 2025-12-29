const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const nodemailer = require('nodemailer');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins (adjust in production)
app.use(express.json()); // Parse JSON request bodies

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Settings Schema and Model
const settingsSchema = new mongoose.Schema({
  theme: {
    mode: { type: String, default: 'light' },
    primaryColor: { type: String, default: '#2563eb' },
    userDefinedColors: [{ name: String, hex: String }]
  },
  smtp: {
    host: { type: String, default: process.env.SMTP_HOST },
    port: { type: Number, default: parseInt(process.env.SMTP_PORT, 10) },
    user: { type: String, default: process.env.SMTP_USER },
    pass: { type: String, default: process.env.SMTP_PASS },
    encryption: { type: String, default: process.env.SMTP_ENCRYPTION },
    fromName: { type: String, default: process.env.SMTP_FROM_NAME },
    fromEmail: { type: String, default: process.env.SMTP_FROM_EMAIL }
  },
  gateway: {
    // Placeholder for gateway settings
    provider: { type: String, default: 'None' },
    apiKey: { type: String, default: '' }
  }
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);

// API Routes

// GET /api/settings - Retrieve settings
app.get('/api/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      // If no settings document exists, create a default one
      settings = new Settings({});
      await settings.save();
    }
    res.status(200).json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/settings - Update settings
app.put('/api/settings', async (req, res) => {
  try {
    const updatedSettings = req.body;
    // Find and update the single settings document.
    // `upsert: true` creates the document if it doesn't exist.
    // `new: true` returns the modified document rather than the original.
    // `setDefaultsOnInsert: true` applies schema defaults if a new document is created.
    const settings = await Settings.findOneAndUpdate(
      {}, // Query to find the single document
      updatedSettings, // The new data to update/replace
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/settings/test-smtp - Send a test SMTP email
app.post('/api/settings/test-smtp', async (req, res) => {
  const { recipientEmail } = req.body;

  if (!recipientEmail) {
    return res.status(400).json({ message: 'Recipient email is required for a test.' });
  }

  try {
    const settingsDoc = await Settings.findOne();
    if (!settingsDoc || !settingsDoc.smtp || !settingsDoc.smtp.host || !settingsDoc.smtp.user || !settingsDoc.smtp.pass) {
      return res.status(400).json({ message: 'SMTP settings are incomplete in the database.' });
    }

    const { host, port, user, pass, encryption, fromName, fromEmail } = settingsDoc.smtp;

    const transporter = nodemailer.createTransport({
      host: host,
      port: port,
      secure: encryption === 'SSL', // Use 'secure' for port 465 (SSL), otherwise false for TLS/STARTTLS
      auth: {
        user: user,
        pass: pass,
      },
      tls: {
        // Do not fail on invalid certs, useful for some local/self-signed setups
        // In production, you should ensure proper certificate validation
        rejectUnauthorized: false 
      }
    });

    const mailOptions = {
      from: `"${fromName || 'Admin Panel'}" <${fromEmail || user}>`,
      to: recipientEmail,
      subject: 'Test Email from Admin Panel',
      text: 'This is a test email sent from your Admin Panel SMTP configuration.',
      html: '<p>This is a <strong>test email</strong> sent from your Admin Panel SMTP configuration.</p>',
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Test email sent successfully!' });

  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ message: 'Failed to send test email', error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});