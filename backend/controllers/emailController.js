// backend/controllers/emailController.js

const pool = require("../config/dbConfig");
const mailjetService = require("../services/mailJetService.js");

const sendEmail = async (req, res) => {
  const { to, subject, message, member_id } = req.body;

  if (!to || !subject || !message || !member_id) {
    return res.status(400).json({
      error: 'Missing "to", "subject", "message", or "member_id"',
    });
  }

  try {
    const response = await mailjetService.sendEmail({ to, subject, message });

    const message_id = response.To[0].MessageID.toString();
    const status = response.Status;

    // Save to MySQL
    await pool.execute(
      "INSERT INTO email_statuses (message_id, member_id, status) VALUES (?, ?, ?)",
      [message_id, member_id, status]
    );

    res.json({
      message: "Email sent successfully and status logged",
      message_id,
      status,
    });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ error: "Failed to send email or log status" });
  }
};

module.exports = {
  sendEmail,
};
