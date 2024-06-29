import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "users",
    },
  },
  { timestamps: true },
);

const Category =
  mongoose.models.categories || mongoose.model("categories", categorySchema);

export default Category;
