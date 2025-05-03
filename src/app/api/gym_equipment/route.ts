import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request: Request) {
  try {
    const [rows] = await pool.query<any>(
        "SELECT gyms.gym_name, gym_equipment.gym_id, gym_equipment.equipment_id, equipment.equipment_name FROM gym_equipment JOIN gyms on gym_equipment.gym_id = gyms.gym_id JOIN equipment ON gym_equipment.equipment_id = equipment.equipment_id"    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Gym Equipment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
 