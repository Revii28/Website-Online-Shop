"use client";
import RemoveWishlist from "@/components/RemoveWishlist";
import React, { useEffect, useState, useMemo } from "react";
export const dynamic = "force-dynamic"
interface Product {
  _id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
}

interface WishlistItem {
  product: Product;
  createdAt: string;
}

const WishlistPage: React.FunctionComponent = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [userId] = useState("");

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist", {
          headers: { "x-user-id": userId },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }

        const data = await response.json();
        setWishlist(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchWishlist();
  }, [userId]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const subtotal = useMemo(
    () => wishlist.reduce((total, item) => total + item.product.price, 0),
    [wishlist]
  );

  const taxes = useMemo(() => subtotal * 0.1, [subtotal]);
  const shipping = 0;
  const total = useMemo(() => subtotal + taxes + shipping, [subtotal, taxes, shipping]);

  const handleRemove = async (userId: string, productId: string) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": userId,
          },
          body: JSON.stringify({ productId }),
          cache: "no-store",
        }
      );

      if (!response.ok) throw new Error("Failed to remove item from wishlist");
      setWishlist((prev) =>
        prev.filter((item) => item.product._id !== productId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-screen py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-black mb-6">My Wishlist</h1>
          {wishlist.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold text-gray-800">Product</th>
                    <th className="text-left font-semibold text-gray-800">Price</th>
                    <th className="text-left font-semibold text-gray-800">Added At</th>
                    <th className="text-left font-semibold text-gray-800">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlist.map((item) => (
                    <tr key={item.product._id}>
                      <td className="py-4">
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 mr-4 rounded-md border"
                            src={
                              item.product.thumbnail ||
                              "https://via.placeholder.com/150"
                            }
                            alt={item.product.name}
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-800">
                              {item.product.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-gray-800">
                        {formatCurrency(item.product.price)}
                      </td>
                      <td className="py-4 text-gray-800">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        <RemoveWishlist
                          userId={userId}
                          productId={item.product._id}
                          onRemove={handleRemove}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Subtotal</span>
              <span className="text-gray-700">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Taxes</span>
              <span className="text-gray-700">{formatCurrency(taxes)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Shipping</span>
              <span className="text-gray-700">{formatCurrency(shipping)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-800">Total</span>
              <span className="font-semibold text-gray-800">
                {formatCurrency(total)}
              </span>
            </div>
            <button className="bg-blue-600 text-black py-2 px-4 rounded-lg mt-4 w-full hover:bg-blue-700 transition">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
