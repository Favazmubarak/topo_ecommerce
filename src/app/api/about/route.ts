import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import About from "@/models/About";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const about = await About.findOne().sort({ createdAt: -1 });
    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch about data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { image1Url, image1PublicId, image2Url, image2PublicId } = body;

    const about = await About.findOneAndUpdate(
      {},
      { image1Url, image1PublicId, image2Url, image2PublicId },
      { upsert: true, new: true }
    );

    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update about data" }, { status: 500 });
  }
}
