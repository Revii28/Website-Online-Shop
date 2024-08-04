"use client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ProductData } from "@/interfaces/product";
import Loading from "../loading";
export const dynamic = 'force-dynamic'

async function getData(slug: string): Promise<ProductData> {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function addToWishlist(productId: string) {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to add to wishlist");
  }

  return response.json();
}

export default function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const [data, setData] = useState<ProductData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const productData = await getData(params.slug);
        setData(productData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchProductData();
  }, [params.slug]);

  useEffect(() => {
    if (data) {
      document.title = data.name;
    }
  }, [data]);

  const handleAddWishlist = async () => {
    if (!data) return;

    try {
      await addToWishlist(data._id);
    console.log('success')
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
console.log(error)
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <div>Error: Data not found.</div>
  }
  return (
    <>
      <Helmet>
        <title>{data?.name}</title>
        <meta name="description" content={data?.description} />
        <meta property="og:title" content={data?.name} />
        <meta property="og:description" content={data?.description} />
        <meta property="og:image" content={data?.thumbnail} />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_BASE_URL + `/products/${params.slug}`}
        />
      </Helmet>
      <div className="bg-gradient-to-r from-cyan-400 via-violet-400 to-blue-400">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-8">
              <img
                src={data.thumbnail}
                alt={data.name}
                className="w-full h-auto rounded-lg shadow-md mb-4"
                id="mainImage"
              />
              <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                {data.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    onClick={() =>
                      ((
                        document.getElementById("mainImage") as HTMLImageElement
                      ).src = image)
                    }
                  />
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2">{data.name}</h2>
              <p className="text-gray-600 mb-4">SKU: {data._id}</p>
              <div className="mb-4">
                <span className="text-2xl font-bold mr-2">Rp{data.price}</span>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-6 h-6 ${
                      index < 4 ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
              </div>
              <p className="text-gray-700 mb-6">{data.description}</p>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Tags:</h3>
                <div className="flex space-x-2">
                  {data.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min={1}
                  defaultValue={1}
                  className="w-12 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={handleAddWishlist}
                  className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
