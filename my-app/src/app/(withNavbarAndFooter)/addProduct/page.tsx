"use client"
import { redirect } from 'next/navigation';
import { useState } from 'react';
export const dynamic = 'force-dynamic'


export default function AddProduct() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function createProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const rawFormData = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      tags: (formData.get("tags") as string)?.split(',') || [],
      thumbnail: formData.get("thumbnail") as string,
      images: (formData.get("images") as string)?.split(',') || [],
    };

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/products", {
        method: "POST",
        body: JSON.stringify(rawFormData),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (response.ok) {
   redirect("/products");
      } else {
        const responseBody = await response.json();
        setError(responseBody.message);
      }
    } catch (error) {
      console.log(error)
      setError("Somethin worng!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-10 bg-gradient-to-r from-red-400 via-green-400 to-blue-400 z-40">
      <h1 className="mb-8 font-extrabold text-4xl">Input Product</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={createProduct}>
          <div className="mb-4">
            <label className="text-black block font-semibold text-lg" htmlFor="name">
              Name
            </label>
            <input
              className="text-black w-full shadow-inner bg-gray-100 rounded-lg placeholder-gray-500 text-lg p-4 border border-gray-300 mt-1"
              id="name"
              type="text"
              name="name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-black block font-semibold text-lg" htmlFor="slug">
              Slug
            </label>
            <input
              className="text-black w-full shadow-inner bg-gray-100 rounded-lg placeholder-gray-500 text-lg p-4 border border-gray-300 mt-1"
              id="slug"
              type="text"
              name="slug"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-black block font-semibold text-lg" htmlFor="description">
              Description
            </label>
            <textarea
              className="text-black w-full shadow-inner bg-gray-100 rounded-lg placeholder-gray-500 text-lg p-4 border border-gray-300 mt-1"
              id="description"
              name="description"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-black block font-semibold text-lg" htmlFor="price">
              Price
            </label>
            <input
              className="text-black w-full shadow-inner bg-gray-100 rounded-lg placeholder-gray-500 text-lg p-4 border border-gray-300 mt-1"
              id="price"
              type="number"
              name="price"
              step="0.01"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-black block font-semibold text-lg" htmlFor="tags">
              Tags
            </label>
            <input
              className="text-black w-full shadow-inner bg-gray-100 rounded-lg placeholder-gray-500 text-lg p-4 border border-gray-300 mt-1"
              id="tags"
              type="text"
              name="tags"
            />
          </div>
          <div className="mb-4">
            <label className="text-black block font-semibold text-lg" htmlFor="thumbnail">
              Thumbnail
            </label>
            <input
              className="text-black w-full shadow-inner bg-gray-100 rounded-lg placeholder-gray-500 text-lg p-4 border border-gray-300 mt-1"
              id="thumbnail"
              type="url"
              name="thumbnail"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-black block font-semibold text-lg" htmlFor="images">
              Images 
            </label>
            <input
              className="text-black w-full shadow-inner bg-gray-100 rounded-lg placeholder-gray-500 text-lg p-4 border border-gray-300 mt-1"
              id="images"
              type="text"
              name="images"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex items-center justify-between mt-8">
            <button
              type="submit"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Add Product
            </button>
          </div>
        </form>
        <aside className="bg-gradient-to-r from-red-400 via-green-400 to-blue-400 z-40 p-8 rounded">
          <h2 className="font-bold text-2xl text-black">Instructions</h2>
          <ul className="list-disc mt-4 pl-5 text-black">
            <li>
              All users must provide a valid email address and password to
              create an account.
            </li>
            <li>
              Users must not use offensive, vulgar, or otherwise inappropriate
              language in their username or profile information.
            </li>
            <li>
              Users must not create multiple accounts for the same person.
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
