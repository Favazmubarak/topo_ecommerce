import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const images = await Gallery.find().sort({ createdAt: -1 });
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery images" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { title, imageUrl, publicId } = body;

    const newImage = await Gallery.create({ title, imageUrl, publicId });
    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload gallery image" }, { status: 500 });
  }
}
