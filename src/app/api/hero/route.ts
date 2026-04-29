import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Hero from "@/models/Hero";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const hero = await Hero.findOne().sort({ createdAt: -1 });
    return NextResponse.json(hero);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hero data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { title, titleColor, imageUrl, publicId } = body;

    const hero = await Hero.findOneAndUpdate(
      {},
      { title, titleColor, imageUrl, publicId },
      { upsert: true, new: true }
    );

    return NextResponse.json(hero);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update hero data" }, { status: 500 });
  }
}
