"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/Home");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      email,
      password,
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            {success ? success : "Welcome Back"}
          </CardTitle>
          <Link
            href="/register"
            className="flex text-lg justify-center items-center text-blue-400"
          >
            Do not have an account? Sign Up
          </Link>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
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
            <Button
              variant="outline"
              className="w-full  border-gray-700 text-lg"
              type="submit"
            >
              Login
            </Button>
            {error && error}
            <Button
              variant="outline"
              className="w-full text-lg border-gray-700"
              type="submit"
              onClick={() => signIn("google")}
            >
              <GoogleIcon
                className="h-4 w-4 mr-2 text-lg"
                style={{ fontSize: 20 }}
              />
              Sign in with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
