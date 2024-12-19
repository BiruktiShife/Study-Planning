/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const Registration = () => {
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      res.status === 201 && router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-400">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="username"
              required
              className="p-2 outline-none rounded-lg border-gray-700 border-2"
            />
            <input
              type="email"
              placeholder="email"
              required
              className="p-2 outline-none rounded-lg border-gray-700 border-2"
            />
            <input
              type="password"
              placeholder="password"
              required
              className="p-2 outline-none rounded-lg border-gray-700 border-2"
            />
            <Button variant="outline" className="w-full" type="submit">
              Register
            </Button>
            {error && "something went wrong!"}
            <Link
              href="/login"
              className="flex justify-center text-blue-500 hover:text-gray-400"
            >
              Login with an existing account
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;
