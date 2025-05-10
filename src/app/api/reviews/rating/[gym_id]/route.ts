import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { gym_id: string } }
) {
  try {
    const { gym_id } = await params;
    const [rows] = await pool.query<any>(
      "SELECT avg(rating) as average_rating FROM reviews WHERE gym_id = ?",
      [gym_id]
    );

    if (!rows || rows.length === 0 || rows[0].average_rating === null) {
      return NextResponse.json({ error: "Rating not found" }, { status: 404 });
    }

    return NextResponse.json({ average_rating: rows[0].average_rating }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}