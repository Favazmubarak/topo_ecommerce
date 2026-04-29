import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Faq from "@/models/Faq";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const faqs = await Faq.find().sort({ createdAt: 1 });
    return NextResponse.json(faqs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { question, answer } = body;

    const newFaq = await Faq.create({ question, answer });
    return NextResponse.json(newFaq, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}
