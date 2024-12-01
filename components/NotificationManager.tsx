"use client";

import * as Toast from "@radix-ui/react-toast";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type Task = {
  _id: string;
  title: string;
  dueDate: string;
  completed: boolean;
};

export default function NotificationManager() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const testToast = () => {
    console.log("Testing toast functionality");
    setNotificationMessage("This is a test notification!");
    setShowToast(true);
  };

  useEffect(() => {
    async function fetchTasks() {
      try {
        console.log("Fetching tasks...");
        const response = await fetch("/api/tasks", { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        console.log("Fetched tasks:", data);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();

    const interval = setInterval(async () => {
      try {
        console.log("Checking for overdue or upcoming tasks...");
        const response = await fetch("/api/tasks", { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to fetch tasks in interval");
        }
        const data = await response.json();
        console.log("Fetched tasks during interval:", data);
        setTasks(data);

        const now = new Date();
        const overdueTask = data.find(
          (task: Task) => !task.completed && new Date(task.dueDate) <= now
        );

        if (overdueTask) {
          console.log("Overdue task identified:", overdueTask);
          setNotificationMessage(
            `Task Overdue: ${overdueTask.title} (Due: ${new Date(
              overdueTask.dueDate
            ).toLocaleString()})`
          );
          setShowToast(true);
        } else {
          console.log("No overdue tasks found");
        }
      } catch (error) {
        console.error("Error in interval task fetch:", error);
      }
    }, 60000); // Every 60 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Toast.Provider swipeDirection="right">
      <Button onClick={testToast}>Reminder</Button>
      <Toast.Root
        open={showToast}
        onOpenChange={setShowToast}
        className="bg-gray-800 text-white p-4 rounded-lg shadow-md"
      >
        <Toast.Title className="font-bold">Reminder</Toast.Title>
        <Toast.Description className="mt-1">
          {notificationMessage}
        </Toast.Description>
        <Toast.Action asChild altText="Close">
          <button className="text-sm text-blue-400 underline">Close</button>
        </Toast.Action>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-0 right-0 p-4 w-[320px]" />
    </Toast.Provider>
  );
}
