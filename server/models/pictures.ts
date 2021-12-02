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
