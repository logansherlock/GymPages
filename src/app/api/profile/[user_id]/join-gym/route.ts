import db from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { user_id, gym_id } = await req.json();

    if (!user_id || !gym_id) {
      return NextResponse.json({ message: "Missing user_id or gym_id" }, { status: 400 });
    }

    await db.query("UPDATE users SET gym_member = ? WHERE user_id = ?", [gym_id, user_id]);

    const [users]: any = await db.query("SELECT * FROM users WHERE user_id = ?", [user_id]);
    const user = users[0];

    const JWT_SECRET = process.env.JWT_SECRET!;
    const newToken = jwt.sign(
      { user_id: user.user_id, username: user.username, membership: user.gym_member },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === "production";
    cookieStore.set("token", newToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
      domain: isProduction ? ".gympages.info" : undefined,
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({ message: "Joined gym and cookie updated" }, { status: 200 });
  } catch (error) {
    console.error("Error in join-gym route:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}