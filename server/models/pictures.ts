import mongoose from "mongoose";

import { connectionMongoWebPicture } from "../db/mongodb.db";

const Status = ["available", "unavailable"];

const pictureSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  status: {
    type: String,
    default: "unavailable",
    enum: Status,
  },
  price: { type: Number },
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

const Pictures = connectionMongoWebPicture.model("Pictures", pictureSchema);

export { Pictures };
