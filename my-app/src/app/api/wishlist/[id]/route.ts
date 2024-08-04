import { NextRequest, NextResponse } from "next/server";
import Wishlist from "@/db/models/Wishlist";
import { headers } from "next/headers";

export async function DELETE(request: NextRequest) {
  try {
    const headersList = headers();
    const userId = headersList.get("x-user-id");
    const body = await request.json();
    const { productId } = body;

    if (!userId || !productId) {
      return NextResponse.json(
        { message: "User ID and Product ID are required" },
        { status: 400 }
      );
    }
    await Wishlist.delete(userId, productId);
    return NextResponse.json(
      { message: "Item deleted from wishlist" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
