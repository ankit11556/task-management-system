import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Database connection failed:", error);

    // Stop the app if database connection fails
    process.exit(1)
  }
}

export default connectDb