require("dotenv").config();
const express = require("express");
const Mailjet = require("node-mailjet");
const mysql = require("mysql2/promise"); // Using promise-based client

const app = express();
app.use(express.json());

// Mailjet setup
const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_PUBLIC_KEY,
  process.env.MAILJET_SECRET_KEY
);

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.post("/send-email", async (req, res) => {
  const { to, subject, message, member_id } = req.body;

  if (!to || !subject || !message || !member_id) {
    return res.status(400).json({
      error: 'Missing "to", "subject", "message", or "member_id"',
    });
  }

  try {
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "billysimmons577@gmail.com",
            Name: "Test",
          },
          To: [
            {
              Email: to,
              Name: to.split("@")[0],
            },
          ],
          Subject: subject,
          TextPart: message,
          HTMLPart: `<h3>${message}</h3>`,
        },
      ],
    });

    const result = await request;
    const response = result.body.Messages[0];

    // Log the entire response to check its structure
    console.log("Mailjet response:", response);

    // Access the MessageID correctly
    const message_id = response.To[0].MessageID.toString(); // Access MessageID inside the 'To' object
    const status = response.Status;

    console.log("Message ID:", message_id);
    console.log("Status:", status);

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
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
