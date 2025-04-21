import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { gym_id: string } }
) {
  try {
    const { gym_id } = await params;
    const [rows] = await pool.query<any>(
      "SELECT reviews.review_id, reviews.user_id, users.username, reviews.rating, " +
        "reviews.review_date, reviews.body  FROM reviews " +
        "JOIN users on reviews.user_id = users.user_id WHERE gym_id = ? " +
        "ORDER BY reviews.review_date DESC",
      [gym_id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Reviews not found" }, { status: 404 });
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
