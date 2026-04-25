import mongoose, { Schema, model, models } from "mongoose";

const GallerySchema = new Schema(
  {
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true }, // Cloudinary public ID
    title: { type: String },
  },
  { timestamps: true }
);

const Gallery = models.Gallery || model("Gallery", GallerySchema);

export default Gallery;
