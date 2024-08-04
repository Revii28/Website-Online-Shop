"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ProductData } from "@/interfaces/product";

export const loginAction = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  // console.log(response)
  if (response.ok) {
    const data = (await response.json()) as {
      accessToken: string;
    };
    // console.log(data)
    const cookiesStore = cookies();
    cookiesStore.set("accessToken", data.accessToken);

    redirect("/products");
    // console.log(data)
  } 
};
export const Keluar = async () => {
  // console.log("tesaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  cookies().delete("accessToken");
  redirect("/login");
};

export async function getData(): Promise<ProductData[]> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/products", {
      headers: { Cookie: cookies().toString() },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    // console.log(res)
    return res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
