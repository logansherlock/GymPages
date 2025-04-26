import { NextResponse } from "next/server";
import type { ResultSetHeader } from "mysql2";
import pool from "@/lib/db";

export async function DELETE(  request: Request,
    { params }: { params: { gym_id: string } }) {
    try {
      const { gym_id } = await params;
  
      if (!gym_id) {
        return NextResponse.json({ error: "Missing exercise ID" }, { status: 400 });
      }
  
      const [queryResult] = await pool.query("DELETE FROM gyms WHERE gym_id = ?", [gym_id]) as unknown as [ResultSetHeader];
      if (queryResult.affectedRows === 0) {
        return NextResponse.json({ error: "Gym not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Gym deleted successfully" });
    } catch (error) {
      console.error("Delete exercise error:", error);
      return NextResponse.json({ error: "Failed to delete gym" }, { status: 500 });
    }
  }