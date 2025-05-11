// /api/reviews/[review_id]/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(request: Request, { params }: { params: { review_id: string } }) {
  try {
    const { review_id } = await params;

    if (!review_id) {
      return NextResponse.json({ error: "Missing review ID" }, { status: 400 });
    }

    await pool.query("DELETE FROM reviews WHERE review_id = ?", [review_id]);
    return NextResponse.json({ message: "Review deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}