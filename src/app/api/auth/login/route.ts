import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Check for missing fields
    if (!email || !password) {
      return NextResponse.json({ message: "Missing email or password" }, { status: 400 });
    }

    // Query the user by email
    const [users]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = users[0];

    // If user does not exist
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    // Compare the entered password with the hashed password
    const passwordMatch = bcrypt.compareSync(password, user.pass_hash);
    if (!passwordMatch) {
      return NextResponse.json({ message: "invalid password" }, { status: 401 });
    }

    // Ensure JWT secret is present
    const JWT_SECRET = process.env.JWT_SECRET!;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is missing from the environment variables");
    }

    // Create the JWT token
    const token = jwt.sign({ user_id: user.user_id, username: user.username, membership: user.gym_member }, JWT_SECRET, { expiresIn: "1d" });

    // const cookieStore = await cookies();
    // cookieStore.set("token", token, {
    //     httpOnly: true,
    //     secure: false,
    //     sameSite: "lax",
    //     path: "/",
    //     domain: ".gympages.info",  
    //     maxAge: 60 * 60 * 24,  // 1 day
    //   });

      const cookieStore = await cookies();
      const isProduction = process.env.NODE_ENV === "production";
      cookieStore.set("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
        domain: isProduction ? ".gympages.info" : undefined,
        maxAge: 60 * 60 * 24,
      });

    return NextResponse.json({
      message: "login successful",
      user: {
        id: user.user_id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        membership: user.gym_member
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ message: "Error logging in", error: message }, { status: 500 });
  }
}