import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import WhyChoose from "@/models/WhyChoose";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const data = await WhyChoose.findOne().sort({ createdAt: -1 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch why-choose data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { imageUrl, publicId } = body;

    const data = await WhyChoose.findOneAndUpdate(
      {},
      { imageUrl, publicId },
      { upsert: true, new: true }
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update why-choose data" }, { status: 500 });
  }
}
