// Script to delete CourseProgress documents missing userId field
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/SkillNestDB";

const courseProgressSchema = new mongoose.Schema({}, { strict: false });
const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema, "courseprogresses");

async function cleanup() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const result = await CourseProgress.deleteMany({ userId: { $exists: false } });
  console.log(`Deleted ${result.deletedCount} CourseProgress documents missing userId.`);
  await mongoose.disconnect();
}

cleanup().catch(err => {
  console.error("Cleanup failed:", err);
  process.exit(1);
});
