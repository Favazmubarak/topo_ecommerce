import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
