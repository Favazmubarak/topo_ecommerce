import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Faq from "@/models/Faq";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    await Faq.findByIdAndDelete(id);
    return NextResponse.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}