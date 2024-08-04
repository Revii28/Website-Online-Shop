import { NextRequest, NextResponse } from "next/server";

import ModelProduct from "@/db/models/Products";
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  // console.log(request.headers.get("x-user-id"));
  try {
    const data = await ModelProduct.findBySlug(params.slug);
    //   console.log(data)
    return NextResponse.json(data);
  } catch (err) {
    // console.log(er41r)
    return NextResponse.json(
      {
        message: "Internal Server ERROR",
      },
      {
        status: 500,
      }
    );
  }
}
