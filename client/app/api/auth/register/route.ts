"use server";
import api from "@/lib/axios";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await api.post("/user/register", {
      email: body.email,
      password: body.password,
    });

    if (!result.data.success) {
      throw new Error("User with this email already exist");
    }

    return NextResponse.json(result.data);
  } catch (error: any) {
    console.error("Registration Error:⭕", error.message);
    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          error?.response?.data?.message ||
          "Registration Failed",
      },
      { status: error?.response?.status || 500 }
    );
  }
}
