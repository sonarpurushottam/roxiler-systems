import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Add an `id` field
  title: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  sold: { type: Boolean, default: false },
  dateOfSale: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
