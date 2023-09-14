import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Rawipa Samhuay",
    studentId: "650610801",
  });
};
