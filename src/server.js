const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const placementRoutes = require("./routes/placementRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/placement", placementRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Auth API is running",
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:5000");
});
