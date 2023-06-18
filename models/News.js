// const db = require("../ext/db");
const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 255,
      minlength: 2,
      unique: true,
      trim: true,
    },
    image_url: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    article_url: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    article_preview: String,
    publication_date: {
      type: Date,
      default: Date.now,
    },
    tag_article: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("News", schema);
