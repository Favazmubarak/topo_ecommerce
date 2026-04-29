import mongoose, { Schema, model, models } from "mongoose";

const WhyChooseSchema = new Schema(
  {
    imageUrl: { type: String, required: true },
    publicId: { type: String, default: "" },
  },
  { timestamps: true }
);

const WhyChoose = models.WhyChoose || model("WhyChoose", WhyChooseSchema);

export default WhyChoose;
