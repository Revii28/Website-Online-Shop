import { NextRequest, NextResponse } from "next/server";
import ModelProduct from "@/db/models/Products";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;

    const page = parseInt(params.get("page") || "1", 10);
    const limit = parseInt(params.get("limit") || "4", 10);
    const search = params.get("search") || "";

    const data = await ModelProduct.findAll(page, limit, search);
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await ModelProduct.Add(body);
    return NextResponse.json(
      {
        message: "Success Add Product",
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.error(err);
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

export async function PUT() {
  return NextResponse.json(
    {
      message: "Success Replace",
    },
    {
      status: 201,
    }
  );
}

export async function PATCH() {
  return NextResponse.json(
    {
      message: "Success Edit",
    },
    {
      status: 201,
    }
  );
}
