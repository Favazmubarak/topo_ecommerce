import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  try {
    await dbConnect();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, text, imageUrl, publicId } = body;

    const newTestimonial = await Testimonial.create({ name, text, imageUrl, publicId });
    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
