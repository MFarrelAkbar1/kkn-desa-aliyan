import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/admin.model";
import dotenv from "dotenv";

dotenv.config();

async function hashAdminPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const admin = await Admin.findOne({ username: "admin" });
    if (!admin) {
      console.log("Admin user not found.");
      return;
    }

    admin.password = await bcrypt.hash("farrel123", 10);
    await admin.save();

    console.log("Admin password updated successfully.");
  } catch (error) {
    console.error("Error updating admin password:", error);
  } finally {
    await mongoose.disconnect();
  }
}

hashAdminPassword();
