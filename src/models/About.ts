import mongoose, { Schema, model, models } from "mongoose";

const AboutSchema = new Schema(
  {
    image1Url: { type: String, required: true },
    image1PublicId: { type: String, default: "" },
    image2Url: { type: String, required: true },
    image2PublicId: { type: String, default: "" },
  },
  { timestamps: true }
);

const About = models.About || model("About", AboutSchema);

export default About;
