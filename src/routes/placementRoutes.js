const express = require("express");

const {
  createPlacement,
  getPlacements,
  getPlacement,
  updatePlacement,
  deletePlacement,
} = require("../controllers/placementController");

const router = express.Router();

router.post("/", createPlacement);

router.get("/", getPlacements);

router.get("/:id", getPlacement);

router.put("/:id", updatePlacement);

router.delete("/:id", deletePlacement);

module.exports = router;