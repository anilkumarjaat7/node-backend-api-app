const prisma = require("../lib/prisma");

const createPlacement = async (req, res) => {
  try {
    const { studentName, imageUrl, companyName, package } = req.body;

    const placement = await prisma.placement.create({
      data: {
        studentName,
        imageUrl,
        companyName,
        package,
      },
    });

    res.status(201).json({
      message: "Placement created successfully",
      placement,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getPlacements = async (req, res) => {
  try {
    const placements = await prisma.placement.findMany();

    res.json({
      message: "Placements fetched successfully",
      placements,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getPlacement = async (req, res) => {
  try {
    const { id } = req.params;

    const placement = await prisma.placement.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!placement) {
      return res.status(404).json({
        message: "Placement not found",
      });
    }

    res.json({
      message: "Placement fetched successfully",
      placement,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const updatePlacement = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentName, imageUrl, companyName, package } = req.body;

    const placement = await prisma.placement.update({
      where: {
        id: Number(id),
      },
      data: {
        studentName,
        imageUrl,
        companyName,
        package,
      },
    });

    res.json({
      message: "Placement updated successfully",
      placement,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const deletePlacement = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.placement.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Placement deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createPlacement,
  getPlacements,
  getPlacement,
  updatePlacement,
  deletePlacement,
};