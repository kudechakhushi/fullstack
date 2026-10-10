import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  slug: { type: String, unique: true },
  title: String,
  property_image: String,
  property_price: Number,
  currency: String,
  area: String,
  developer: { type: String, index: true },
  project_description: String,
  small_description: String,
  property_type: { type: String, index: true },
});

export default mongoose.model("Property", propertySchema, "properties");