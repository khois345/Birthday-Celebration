// app/api/birthday-session/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import clientPromise from "@/lib/mongodb";

const DB_NAME = "birthday-app";
const COLLECTION_NAME = "birthday_sessions";
const DEFAULT_REGARD = "Wish you a wonderful birthday!";

function getExpiryDate() {
  const expiresAt = new Date();
  const days = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5 days
  expiresAt.setDate(expiresAt.getDate() + days);
  return expiresAt;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const user = await db.collection(COLLECTION_NAME).findOne({ sessionId });

  if (!user || user.expiresAt <= new Date()) {
    if (user) {
      await db.collection(COLLECTION_NAME).deleteOne({ sessionId });
    }

    return NextResponse.json({ user: null });
  }

  return NextResponse.json({
    user: {
      name: user.name,
      age: user.age,
      regard: user.regard,
      sessionId: user.sessionId,
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const name = String(body.name || "").trim();
  const age = Number(body.age);
  const regard = String(body.regard || DEFAULT_REGARD).trim();

  if (!name) {
    return NextResponse.json(
      { error: "Name is required" },
      { status: 400 }
    );
  }

  if (!Number.isInteger(age) || age < 1 || age > 120) {
    return NextResponse.json(
      { error: "Age must be between 1 and 120" },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();

  let sessionId = cookieStore.get("birthday_session")?.value;

  if (!sessionId) {
    sessionId = randomUUID();
  }

  const expiresAt = getExpiryDate();

  const client = await clientPromise;
  const db = client.db(DB_NAME);

  await db.collection(COLLECTION_NAME).updateOne(
    { sessionId },
    {
      $set: {
        sessionId,
        name,
        age,
        regard,
        expiresAt,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true }
  );

  const response = NextResponse.json({
    user: {
      name,
      age,
      regard,
      sessionId,
    },
  });

  response.cookies.set("birthday_session", sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });

  return response;
}