import mongoose, { Schema, model, models } from "mongoose";

const HeroSchema = new Schema(
  {
    title: { type: String },
    titleColor: { type: String, default: "#FFFFFF" },
    imageUrl: { type: String, required: true },
    publicId: { type: String, default: "" },
  },
  { timestamps: true }
);

const Hero = models.Hero || model("Hero", HeroSchema);

export default Hero;
