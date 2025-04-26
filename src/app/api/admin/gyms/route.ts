import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT gym_id, gym_name, street_address, city, zip, state FROM gyms"
    );
    console.log("Database response:", rows);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      gym_id,
      gym_name,
      latitude,
      longitude,
      street_address,
      city,
      zip,
      state,
      phone_number,
    } = body;

    if (
      !gym_id ||
      !gym_name ||
      !latitude ||
      !longitude ||
      !street_address ||
      !city ||
      !zip ||
      !state ||
      !phone_number
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const locationPoint = `POINT(${longitude} ${latitude})`;

    const [result] = await pool.query<any>(
      "INSERT INTO gyms (gym_id, gym_name, location, street_address, city, zip, state, phone_number) VALUES (?, ?, ST_GeomFromText(?), ?, ?, ?, ?, ?)",
      [
        gym_id,
        gym_name,
        locationPoint,
        street_address,
        city,
        zip,
        state,
        phone_number,
      ]
    );

    return NextResponse.json(
      { message: "Gym created", post_id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to create gym" },
      { status: 500 }
    );
  }
}
