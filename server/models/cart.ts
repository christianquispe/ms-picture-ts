import mongoose from "mongoose";

import { connectionMongoWebPicture } from "../db/mongodb.db";

const Status = ["available", "unavailable"];

const ProductSummarySchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  status: {
    type: String,
    default: "unavailable",
    enum: Status,
  },
  img: {
    type: String,
    default:
      "https://i.pinimg.com/originals/77/82/21/778221a7b51e8ea9142e4a724f3edf87.jpg",
  },
  simbol: {
    type: String,
    default: "S/",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    set: () => Date.now(),
  },
});

const cartSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  productSummary: ProductSummarySchema,
  quantity: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    set: () => Date.now(),
  },
});

const Cart = connectionMongoWebPicture.model("Cart", cartSchema);

export { Cart };
