import mongoose, { Schema, model, models } from "mongoose";

const HeroSchema = new Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true }, // Cloudinary public ID
  },
  { timestamps: true }
);

const Hero = models.Hero || model("Hero", HeroSchema);

export default Hero;
