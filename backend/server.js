const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const nodemailer = require("nodemailer");

dotenv.config();

const sequelize = require("./db");
const Settings = require("./models/Settings");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect DB
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("MySQL connected");
  } catch (err) {
    console.error("DB error:", err.message);
  }
})();

// GET settings
app.get("/api/settings", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT settings
app.put("/api/settings", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      // Merge incoming changes with existing settings for JSON fields
      const updatedData = {
        theme: req.body.theme ? { ...settings.theme, ...req.body.theme } : settings.theme,
        smtp: req.body.smtp ? { ...settings.smtp, ...req.body.smtp } : settings.smtp,
        gateway: req.body.gateway ? { ...settings.gateway, ...req.body.gateway } : settings.gateway,
        // Add other top-level settings here if they exist and need merging
      };
      await settings.update(updatedData);
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// SMTP test
app.post("/api/settings/test-smtp", async (req, res) => {
  const { recipientEmail } = req.body;
  if (!recipientEmail) return res.status(400).json({ message: "recipientEmail is required" });

  try {
    const settings = await Settings.findOne();
    const smtp = settings?.smtp || {};

    // Basic validation
    if (!smtp.host || !smtp.port || !smtp.user || !smtp.pass) {
      return res.status(400).json({ message: "SMTP settings are incomplete. Save SMTP settings first." });
    }

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: Number(smtp.port),
      secure: String(smtp.encryption || "").toUpperCase() === "SSL", // SSL typically port 465
      auth: { user: smtp.user, pass: smtp.pass },
    });

    await transporter.sendMail({
      from: `"${smtp.fromName || "Admin Panel"}" <${smtp.fromEmail || smtp.user}>`,
      to: recipientEmail,
      subject: "Test Email",
      text: "This is a test email from your SMTP configuration.",
    });

    res.json({ message: "Test email sent successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send test email", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});