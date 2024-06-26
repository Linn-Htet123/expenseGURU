import mongoose from "mongoose";

mongoose.set("strictPopulate", false);

export async function connect() {
  try {
    console.log(process.env.MONGO_URL);
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongodb connected successfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error" + err);
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
}
