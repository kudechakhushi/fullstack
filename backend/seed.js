import "dotenv/config";
import fs from "fs";
import mongoose from "mongoose";
import Property from "./table.js";

const data = JSON.parse(fs.readFileSync("./property-list-data.json", "utf-8"));

async function seed() {
  await mongoose.connect(process.env.MONGODBURI);
  console.log("Database:", mongoose.connection.name);

  await Property.deleteMany({});
  await Property.insertMany(data.properties);

  const count = await Property.countDocuments();
  console.log("Saved", count, "documents in collection:", Property.collection.name);

  await mongoose.disconnect();
}

seed();