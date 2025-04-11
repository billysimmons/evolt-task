const express = require("express");
require("dotenv").config();

const emailRoutes = require("./routes/emailRoutes");
const memberRoutes = require("./routes/memberRoutes");

const app = express();
app.use(express.json());

app.use("/api/email", emailRoutes);
app.use("/api/members", memberRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
