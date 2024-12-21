"use client";
import React, { useState, useEffect } from "react";
import ModeToggle from "@/components/toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navigation = () => {
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

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
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link
            href="/"
            className="text-2xl font-bold hover:text-gray-300 transition-colors"
          >
            StudyPlan
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            aria-label="Toggle Menu"
            className="text-white focus:outline-none hover:text-gray-400 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <XMarkIcon className="h-8 w-8" />
            ) : (
              <Bars3Icon className="h-8 w-8" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row items-center gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0 transition-all duration-300`}
        >
          {showNavigationLinks && (
            <>
              <Link
                href="/Home"
                className="block md:inline-block rounded-lg px-3 py-2 text-lg font-medium hover:bg-gray-700 md:hover:bg-transparent hover:text-gray-400 transition-all"
              >
                Home
              </Link>
              <Link
                href="/StudyPlanList"
                className="block md:inline-block rounded-lg px-3 py-2 text-lg font-medium hover:bg-gray-700 md:hover:bg-transparent hover:text-gray-400 transition-all"
              >
                Plan List
              </Link>
            </>
          )}
          {status === "authenticated" ? (
            <Button className="mt-2 md:mt-0" onClick={() => signOut()}>
              Logout
            </Button>
          ) : (
            showNavigationLinks && (
              <Button className="mt-2 md:mt-0">
                <Link href="/login">Login</Link>
              </Button>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
