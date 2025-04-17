import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const JWT_SECRET = process.env.JWT_SECRET!;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ user: decoded });
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 403 }
    );
  }
}
