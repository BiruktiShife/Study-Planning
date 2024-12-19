"use client";
import React, { useEffect } from "react";
import ModeToggle from "@/components/toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const Navigation = () => {
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "unauthenticated" &&
      pathname !== "/login" &&
      pathname !== "/" &&
      pathname !== "/register"
    ) {
      router.push("/login");
    }
  }, [status, pathname, router]);

  const showNavigationLinks =
    pathname !== "/login" && pathname !== "/register" && pathname !== "/";

  return (
    <div className="flex justify-between items-center p-6">
      <div className="flex items-center gap-4">
        <ModeToggle />
      </div>

      <div className="flex items-center gap-6">
        {showNavigationLinks && (
          <>
            <Link
              href="/Home"
              className="rounded-lg px-3 flex justify-center items-center hover:text-gray-400 text-xl font-bold"
            >
              Home
            </Link>
            <Link
              href="/StudyPlanList"
              className="rounded-lg px-3 flex justify-center items-center hover:text-gray-400 text-xl font-bold"
            >
              Plan List
            </Link>
          </>
        )}
        {status === "authenticated" ? (
          <Button onClick={() => signOut()}>Logout</Button>
        ) : (
          showNavigationLinks && (
            <Button>
              <Link href="/login">Login</Link>
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default Navigation;
