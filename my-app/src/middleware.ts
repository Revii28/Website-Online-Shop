"use server";
import * as jose from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export const dynamic = 'force-dynamic'
export async function middleware(request: NextRequest) {
  try {
    const token = cookies().get("accessToken");

    // console.log(token, `<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
    if (!token) {
      throw new Error("Unauthenticated");
    }

    const jwtSecret = new TextEncoder().encode(
      process.env.JWT_SICRET as string
    );
    const { payload } = await jose.jwtVerify<{ _id: string; email: string }>(
      token.value,
      jwtSecret
    );
    // console.log(payload,` add wish list payload`)

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload._id);
    requestHeaders.set("x-user-email", payload.email);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // console.log( result)
  } catch (err) {
    // console.error(err);
    if (err instanceof Error) {
      return NextResponse.json(
        {
          message: err.message,
        },
        {
          status: 401,
        }
      );
    } else if (err instanceof jose.errors.JWTInvalid) {
      return NextResponse.json(
        {
          message: "Unauthenticated",
        },
        {
          status: 401,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        {
          status: 500,
        }
      );
    }

    //   return NextResponse.redirect(new URL("/", request.url));
  }
}
export const config = {
  matcher: ["/api/wishlist/:path*"],
};
