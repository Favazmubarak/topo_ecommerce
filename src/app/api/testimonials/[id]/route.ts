import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const testimonial = await Testimonial.findById(id);
    if (testimonial && testimonial.publicId) {
      await cloudinary.uploader.destroy(testimonial.publicId);
    }
    
    await Testimonial.findByIdAndDelete(id);
    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}