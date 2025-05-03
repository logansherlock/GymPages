import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "logged out" });

  response.headers.set(
    "Set-Cookie",
    `token=; Path=/; HttpOnly; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${
      process.env.COOKIE_DOMAIN ? `Domain=${process.env.COOKIE_DOMAIN}; ` : ""
    }${process.env.NODE_ENV === "production" ? "Secure; SameSite=None;" : ""}`
  );

  return response;
}