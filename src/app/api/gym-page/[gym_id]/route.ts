import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { gym_id: string } }
) {
  try {
    const { gym_id } = await params; // No need to await, params are already an object

    const [rows] = await pool.query<any>(
      "SELECT gym_id, gym_name, location, street_address, city, zip, state FROM gyms WHERE gym_id = ?",
      [gym_id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Gym not found" }, { status: 404 });
    }
    const { gym_name, location, street_address, city, zip, state } = rows[0];

    // Return the gym details as the API response
    return NextResponse.json(
      { gym_id, gym_name, location, street_address, city, zip, state },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
