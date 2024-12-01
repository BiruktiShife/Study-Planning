import React from "react";
import ModeToggle from "@/components/toggle";
import NotificationManager from "./NotificationManager";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className="flex justify-between items-center p-6">
      <div className="flex items-center gap-4">
        <ModeToggle />
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-6">
        <Link
          href="/"
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
        <NotificationManager />
      </div>
    </div>
  );
};

export default Navigation;
