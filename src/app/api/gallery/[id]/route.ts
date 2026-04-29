import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const image = await Gallery.findById(id);
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
    await Gallery.findByIdAndDelete(id);
    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}