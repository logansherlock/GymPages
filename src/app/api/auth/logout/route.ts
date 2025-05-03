import { NextResponse } from "next/server";

export async function POST() {
  const isProduction = process.env.NODE_ENV === "production";

  const response = NextResponse.json({ message: "logged out" });

  response.headers.set(
    "Set-Cookie",
    `token=; Path=/; HttpOnly; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${
      isProduction ? "Secure; SameSite=None; Domain=.gympages.info;" : ""
    }`
  );

  return response;
}