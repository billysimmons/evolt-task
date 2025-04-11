require("dotenv").config();
const express = require("express");
const app = express();
const emailRoutes = require("./routes/emailRoutes");

app.use(express.json());

// Use email-related routes
app.use("/api/email", emailRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
