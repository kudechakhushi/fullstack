import express from "express";
import Property from "../table.js";

const router = express.Router();


router.get("/", async (req, res, next) => {
  try {
    const properties = await Property.find({}, { _id: 0, __v: 0 }).sort({ id: 1 });
    res.json({
      success: true,
      message: "Operation completed successfully.",
      data: properties,
    });
  } catch (err) {
    next(err); 
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID.",
        errors: null,
      });
    }

    const property = await Property.findOne({ id: id }, { _id: 0, __v: 0 });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
        errors: null,
      });
    }

    res.json({
      success: true,
      message: "Operation completed successfully.",
      data: property,
    });
  } catch (err) {
    next(err);
  }
});

export default router;