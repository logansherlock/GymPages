import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader } from "mysql2";

export async function POST(req: NextRequest) {
  try {
    const { email, firstname, lastname, username, pass_hash } = await req.json();

    if (!email || !firstname || !lastname || !username || !pass_hash) {
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
    const values = [email, firstname, lastname, username, pass_hash];

    const [result] = await db.query<ResultSetHeader>(query, values);

    return NextResponse.json(
      { message: "successfully added user", id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "error adding user", error },
      { status: 500 }
    );
  }
}

// async function checker(column: string, value: string): Promise<boolean> {
//   const checkQuery = `SELECT COUNT(*) AS count FROM users WHERE ${column} = ?`;
//   const checkResults = await db.query<any>(checkQuery, [value])
//   return checkResults[0].count > 0;
// }

// if (await checker("email", email)) {
//   return NextResponse.json({message: "email already taken"}, { status: 409 })
// }
// else if (await checker("username", username)) {
//   return NextResponse.json({message: "username already taken"}, { status: 409 })
// }