import { NextRequest, NextResponse } from "next/server";
import Wishlist from "@/db/models/Wishlist";
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const headersList = headers()
    const body = await request.json();
    const userId = headersList.get('x-user-id')
    // console.log(userId,`<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< result rou`)
    const { productId } = body;
    // console.log(productId)
    if (!userId || !productId) {
      return NextResponse.json(
        { message: "User ID and Product ID tidak ada" },
        { status: 400 }
      );
    }
    await Wishlist.add({ userId, productId });
    return NextResponse.json(
      { message: "Item added to wishlist" },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

///////////////////////////////////////////////////////////////////////

export async function GET(request: NextRequest) {
  try {
    const headersList = headers();
    const userId = headersList.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const wishlists = await Wishlist.findAll(userId);

    return NextResponse.json(wishlists);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
