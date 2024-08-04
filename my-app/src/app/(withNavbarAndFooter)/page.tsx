import { getData } from "@/actions/auth";
import Link from "next/link";
import React from "react";
export const dynamic = 'force-dynamic'
export default async function Home() {
  const data = await getData();

  return (
    <div className="bg-gradient-to-r from-red-400 via-green-400 to-blue-400 z-40 min-h-screen">
      <div className="relative bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <span className="w-24 h-2 bg-gray-800 dark:bg-white mb-6"></span>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold leading-tight dark:text-white text-gray-900">
              Be on{" "}
              <span className="text-4xl sm:text-6xl lg:text-7xl">Time</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-200 max-w-lg">
              Dimension of reality that makes change possible and
              understandable. An indefinite and homogeneous environment in which
              natural events and human existence take place.
            </p>
            <div className="mt-8">
              <Link
                href="/products"
                className="uppercase py-3 px-6 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md hover:bg-pink-400 transition duration-300"
              >
                Get started
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <div className="carousel">
              <div className="carousel-inner-left">
                {data.map((item) => (
                  <div
                    key={item._id}
                    className="carousel-item bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.description}
                      </p>
                      <p className="mt-2 text-gray-900 dark:text-gray-100">
                        Price:{" "}
                        {typeof item.price === "string"
                          ? `Rp ${item.price}`
                          : `Rp ${item.price.toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
