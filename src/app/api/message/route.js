import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  readDB();
  const body = await request.json();
  const { roomId } = body;
  const foundRoom = DB.rooms.find((r) => r.roomId === roomId);
  if (!foundRoom)
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );
};

export const POST = async (request) => {
  readDB();

  const body = await request.json();
  const { roomId } = body;
  const foundRoom = DB.rooms.find((r) => r.roomId === roomId);
  if (!foundRoom)
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );

  const messageId = nanoid();

  writeDB();

  return NextResponse.json({
    ok: true,
    messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request) => {
  const payload = checkToken();

  if (!payload)
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );

  readDB();

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: "Message is not found",
  //   },
  //   { status: 404 }
  // );

  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
