"use client";

import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="space-y- flex items-center justify-between h-[30rem] dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative">
      <div className="">
        <Image
          src="/studying.png"
          alt="Descriptive text"
          width={300}
          height={300}
          className="rounded-lg animate-float ml-40"
          priority
        />
      </div>
      <div className="w-1/2">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Welcome to the Dashboard
        </h1>
        <p className="my-4 text-gray-600 dark:text-gray-200">
          This is your space to manage and track your tasks effectively. Feel
          free to explore the features and get started on your journey to
          productivity.
        </p>
        <Link
          href="/login"
          className="rounded-lg px-4 py-2 mt-3 text-black text-center font-bold hover:bg-blue-300 bg-white"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
