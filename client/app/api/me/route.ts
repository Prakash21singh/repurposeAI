"use server";
import { NextResponse } from "next/server";
import { authOption } from "../auth/[...nextauth]/authOption";
import { getServerSession } from "next-auth";
import api from "@/lib/axios";

export async function GET() {
  const session = await getServerSession(authOption);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const result = await api.get(`/user/me`, {
    headers: {
      Authorization: `Bearer ${session?.user.id}`,
    },
  });

  return NextResponse.json({ user: result.data.data });
}
