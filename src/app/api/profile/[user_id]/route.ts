import { NextResponse, NextRequest } from "next/server";
import pool from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { user_id: number } }
) {
  try {
    const { user_id } = await params;

    const [rows] = await pool.query<any>(
      "SELECT users.username, users.firstname, users.lastname, users.gym_member, gyms.gym_name, gyms.city, gyms.state, profiles.visibility, profiles.max_bench, profiles.max_squat, profiles.max_dead FROM profiles JOIN users ON profiles.user_id = users.user_id LEFT JOIN gyms ON users.gym_member = gyms.gym_id WHERE profiles.user_id = ?",
      [user_id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    const { username, firstname, lastname, gym_member, gym_name, city, state, visibility, max_bench, max_squat, max_dead } = rows[0];

    return NextResponse.json(
      { username, firstname, lastname, gym_member, gym_name, city, state, visibility, max_bench, max_squat, max_dead },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { user_id: string } }) {
  try {
    const userId = parseInt(params.user_id);
    const { visibility, max_bench, max_squat, max_dead } = await req.json();

    if (!["public", "private"].includes(visibility)) {
      return NextResponse.json({ error: "Invalid visibility" }, { status: 400 });
    }

    await pool.query(
      `UPDATE profile 
       SET visibility = ?, max_bench = ?, max_squat = ?, max_dead = ?
       WHERE user_id = ?`,
      [visibility, max_bench || null, max_squat || null, max_dead || null, userId]
    );

    return NextResponse.json({ message: "Profile updated" }, { status: 200 });
  } catch (err) {
    console.error("PUT /api/profile/:user_id error:", err);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}