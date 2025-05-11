import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(request: Request, { params }: { params: { comment_id: string } }) {
    try {
      const { comment_id } = await params;
  
      if (!comment_id) {
        return NextResponse.json({ error: "Missing comment ID" }, { status: 400 });
      }
  
      await pool.query("DELETE FROM comments WHERE comment_id = ?", [comment_id]);
      return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
    } catch (error) {
      console.error("Delete error:", error);
      return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
    }
  }
  