"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logout from "./LogoutButton";
import RemoveWishlist from "./RemoveWishlist";
import { ProductData } from "@/interfaces/product";
export const dynamic = 'force-dynamic'
interface WishlistItem {
  product: ProductData;
}

export default function Navbar() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [userId, setUserId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [allProducts, setAllProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const wishlistResponse = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist",
          {
            headers: { "x-user-id": userId },
            cache: "no-store",
          }
        );
        if (!wishlistResponse.ok) throw new Error("Failed to fetch wishlist");
        const wishlistData = await wishlistResponse.json();
        setWishlist(wishlistData);

        const productsResponse = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL + `/api/products?page=1&limit=100`
        );
        if (!productsResponse.ok) throw new Error("Failed to fetch products");
        const productsData = await productsResponse.json();
        setAllProducts(productsData);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i");
      const filtered = allProducts.filter(
        (product) => regex.test(product.name) || regex.test(product.description)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, allProducts]);

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  const wishlistTotalPrice = wishlist.reduce(
    (total, item) => total + item.product.price,
    0
  );

  return (
    <div className="navbar bg-gradient-to-r from-red-400 via-green-400 to-blue-400 z-40">
      <div className="flex-1">
        <p className="btn btn-ghost text-2xl font-bold hover:text-accent transition duration-300">
          R Store
        </p>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-0 space-x-4">
          <li>
            <Link href="/" className="hover:text-black transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="hover:text-black transition duration-300">
              Products
            </Link>
          </li>
          <li>
            <Link href="/addProduct" className="hover:text-black transition duration-300">
              Add Product
            </Link>
          </li>
        </ul>

        <div className="dropdown dropdown-end ml-4">
          <a
            tabIndex={0}
            className="btn btn-ghost btn-circle hover:bg-neutral-focus transition duration-300"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </a>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-white z-50 mt-3 w-60 shadow-lg"
          >
            <div className="form-control p-2">
              <input
                type="text"
                placeholder="Search here"
                className="input input-bordered input-info w-full bg-white text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {searchTerm && filteredProducts.length > 0 && (
              <div className="p-2">
                <ul>
                  {filteredProducts.map((product) => (
                    <li key={product._id} className="flex items-center py-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex items-center w-full"
                      >
                        <img
                          className="w-12 h-12 object-cover rounded cursor-pointer"
                          src={
                            product.thumbnail ||
                            "https://via.placeholder.com/150"
                          }
                          alt={product.name}
                        />
                        <div className="ml-2 flex-1">
                          <h3 className="text-gray-900 font-semibold">
                            {product.name}
                          </h3>
                          <p className="text-gray-700 text-sm">
                            {formatCurrency(product.price)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="dropdown dropdown-end ml-4">
          <a
            tabIndex={0}
            className="btn btn-ghost btn-circle hover:bg-neutral-focus transition duration-300"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {wishlist.length}
              </span>
            </div>
          </a>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-50 mt-3 w-80 shadow-lg"
          >
            <div className="card-body p-4">
              <div className="bg-white rounded-lg overflow-hidden border border-gray-400">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-800">Wishlist</h2>
                </div>
                <div className="flex flex-col divide-y divide-gray-200">
                  {wishlist.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex items-center py-4 px-2"
                    >
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="flex items-center w-full"
                      >
                        <img
                          className="w-16 h-16 object-cover rounded cursor-pointer"
                          src={
                            item.product.thumbnail ||
                            "https://via.placeholder.com/150"
                          }
                          alt={item.product.name}
                        />
                        <div className="ml-4 flex-1">
                          <h3 className="text-gray-900 font-semibold">
                            {item.product.name}
                          </h3>
                          <p className="text-gray-700 mt-1">
                            {formatCurrency(item.product.price)}
                          </p>
                        </div>
                      </Link>
                      <RemoveWishlist
                        userId={userId}
                        productId={item.product._id}
                        onRemove={handleRemove}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between px-4 py-3 bg-gray-100">
                  <h3 className="text-gray-900 font-semibold">
                    Total: {formatCurrency(wishlistTotalPrice)}
                  </h3>
                  <Link
                    href="/wishlist"
                    className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                  >
                    View Wishlist
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dropdown dropdown-end ml-4">
          <button
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar hover:bg-neutral-focus transition duration-300"
          >
            <div className="w-12 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg"
          >
            <li>
              <a className="flex items-center justify-between hover:bg-neutral-focus transition duration-300 p-2 rounded">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a className="hover:bg-neutral-focus transition duration-300 p-2 rounded">
                Settings
              </a>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
