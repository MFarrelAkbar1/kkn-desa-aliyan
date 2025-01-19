import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import Admin from "../models/admin.model"; // Adjust path to your model

dotenv.config(); // Load environment variables

async function createAdmin() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI!);

    const adminExists = await Admin.findOne({ username: "admin" });
    if (adminExists) {
      console.log("Admin already exists.");
      return;
    }

    const admin = new Admin({
      username: "admin", // Set desired username
      password: "password123", // Set desired password
    });

    await admin.save();
    console.log("Admin user created successfully!");
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

createAdmin();
