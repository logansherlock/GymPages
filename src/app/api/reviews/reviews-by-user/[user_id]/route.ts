import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { user_id: string } }
) {
  try {
    const { user_id } = await params;
    const [rows] = await pool.query<any>(
        "SELECT gyms.gym_name, reviews.review_id, reviews.gym_id, users.username, reviews.rating, " +
          "reviews.review_date, reviews.body FROM reviews " +
          "JOIN users ON reviews.user_id = users.user_id " +
          "JOIN gyms ON reviews.gym_id = gyms.gym_id " +
          "WHERE reviews.user_id = ? " +
          "ORDER BY reviews.review_date DESC",
        [user_id]
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
