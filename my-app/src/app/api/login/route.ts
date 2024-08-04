import UserModel from "@/db/models/User";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await UserModel.login(body);
    // console.log(result);
    return NextResponse.json(result, {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: err.errors[0].message,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
