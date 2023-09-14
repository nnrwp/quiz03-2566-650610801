import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  return NextResponse.json({
    ok: true,
    rooms: DB.rooms,
    // totalRooms: ,
  });
};

export const POST = async (request) => {
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

  const body = await request.json();
  const { roomName } = body;
  const foundRoom = DB.rooms.find((r) => r.roomName === roomName);
  if (!foundRoom)
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${roomName} already exists`,
      },
      { status: 400 }
    );

  const roomId = nanoid();

  const room = DB.rooms.push({
    roomId,
    roomName: payload.roomName,
  });
  //call writeDB after modifying Database
  writeDB();
  if (payload.role !== "ADMIN" || payload.role !== "SUPER_ADMIN");
  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${room} has been created`,
  });
};
