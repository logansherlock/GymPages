import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ResultSetHeader } from "mysql2";

export async function POST(req: NextRequest) {
  try {
    const { email, firstname, lastname, username, pass_hash: password } = await req.json();

    if (!email || !firstname || !lastname || !username || !password) {
      return NextResponse.json(
        { message: "all fields required" },
        { status: 400 }
      );
    }

    const checkEmailQuery = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
    const [checkEmailResult] = await db.query<any>(checkEmailQuery, [email])
    if (checkEmailResult[0].count > 0) {
      return NextResponse.json({message: `email already taken`},{status: 409})
    }

    const checkUsernameQuery = "SELECT COUNT(*) AS count FROM users WHERE username = ?";
    const [checkUsernameResult] = await db.query<any>(checkUsernameQuery, [username])
    if (checkUsernameResult[0].count > 0) {
      return NextResponse.json({message: "username already taken"},{status: 409})
    }

    const query =
      "INSERT INTO users (email, firstname, lastname, username, pass_hash) VALUES (?, ?, ?, ?, ? )";
    const hashedPassword = bcrypt.hashSync(password, 10);
    const values = [email, firstname, lastname, username, hashedPassword];

    const [result] = await db.query<ResultSetHeader>(query, values);

    return NextResponse.json(
      { message: "successfully added user", id: result.insertId, email: email, pass_hash: password },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "error adding user", error },
      { status: 500 }
    );
  }
}