"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
export const dynamic = 'force-dynamic'
export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  const changeHanddler = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { name, value } = target;
    const newInput = {
      ...user,
      [name]: value,
    };
    setUser(newInput);
  };
  // console.log(setUser)

  const submitHanddler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fatch = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (fatch.ok) {
      redirect("/login");
    } else {
      console.error("Login failed");
    }
  };

  return (
    <div>
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-500 via-green-500 to-blue-500">
        <div className="w-full max-w-md bg-gradient-to-r from-red-450 via-green-450 to-blue-450 rounded-lg shadow-md dark:bg-gray-800">
          <div className="p-6 space-y-4 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHanddler}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Your full name
                </label>
                <input
                  onChange={changeHanddler}
                  value={user.name}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nelson Mandela Sibere Bere"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium  dark:text-white"
                >
                  Email
                </label>
                <input
                  onChange={changeHanddler}
                  value={user.email}
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="blablaba@mail.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={changeHanddler}
                  value={user.password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Your Image Url
                </label>
                <input
                  onChange={changeHanddler}
                  value={user.image}
                  type="text"
                  name="image"
                  id="image"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="http//:blablablabla.jpg/"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-white dark:text-gray-400">
                Sudah memiliki account?{" "}
                <Link
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  href="/login"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
