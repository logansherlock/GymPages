import { NextResponse } from "next/server";
import type { ResultSetHeader } from "mysql2";
import pool from "@/lib/db";

export async function DELETE(  request: Request,
    { params }: { params: { exercise_id: string } }) {
    try {
      const { exercise_id } = await params;
  
      console.log("In API", exercise_id);
      if (!exercise_id) {
        return NextResponse.json({ error: "Missing exercise ID" }, { status: 400 });
      }
  
      const [queryResult] = await pool.query("DELETE FROM exercises WHERE exercise_id = ?", [exercise_id]) as unknown as [ResultSetHeader];
      if (queryResult.affectedRows === 0) {
        return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Exercise deleted successfully" });
    } catch (error) {
      console.error("Delete exercise error:", error);
      return NextResponse.json({ error: "Failed to delete exercise" }, { status: 500 });
    }
  }