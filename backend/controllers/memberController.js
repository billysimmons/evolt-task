const pool = require("../config/dbConfig");

// /api/members
exports.getAllMembers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM members");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching members:", err);
    res.status(500).json({ error: "Failed to fetch members" });
  }
};

// /api/members/:id/scans
exports.getMemberScans = async (req, res) => {
  const memberId = req.params.id;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM member_scans WHERE member_id = ?",
      [memberId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching member scans:", err);
    res.status(500).json({ error: "Failed to fetch member scans" });
  }
};
