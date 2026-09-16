const prisma = require("../lib/prisma");

const createCourse = async (req, res) => {
  try {
    const { name, slug, des, imgUrl, fees, duration } = req.body;

    const existingCourse = await prisma.course.findUnique({
      where: {
        slug: slug,
      },
    });

    if (existingCourse) {
      return res.status(400).json({
        message: "Slug already exists",
      });
    }

    const course = await prisma.course.create({
      data: {
        name,
        slug,
        des,
        imgUrl,
        fees,
        duration,
      },
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany();

    res.json({
      message: "Courses fetched successfully",
      courses,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json({
      message: "Course fetched successfully",
      course,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, des, imgUrl, fees, duration } = req.body;

    const course = await prisma.course.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        slug,
        des,
        imgUrl,
        fees,
        duration,
      },
    });

    res.json({
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.course.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};