"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type StudyPlan = {
  _id: string;
  subject: string;
  topics: string[];
  availableHours: number;
  schedule: string[];
  completed: boolean;
};

export default function ProgressTrack() {
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStudyPlans() {
      try {
        const response = await fetch("/api/studyplan", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch study plans");
        }

        const data = await response.json();
        setStudyPlans(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudyPlans();
  }, []);

  // Calculate Overall Progress
  const completedPlans = studyPlans.filter((plan) => plan.completed).length;
  const totalPlans = studyPlans.length;
  const progress = totalPlans
    ? Math.round((completedPlans / totalPlans) * 100)
    : 0;

  // Calculate Productive Hours
  const productiveHours = studyPlans.reduce((acc, plan) => {
    plan.schedule.forEach((hour, idx) => {
      acc[idx] = (acc[idx] || 0) + parseFloat(hour);
    });
    return acc;
  }, [] as number[]);

  const graphData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Productive Hours",
        data: productiveHours,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  if (isLoading) {
    return <p>Loading study plans...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-6 border rounded-lg space-y-6 bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold">Progress Tracker</h2>

      <div>
        <h3 className="text-lg font-semibold">Overall Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {progress}% Completed ({completedPlans}/{totalPlans})
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Productive Hours</h3>
        {productiveHours.length > 0 ? (
          <Bar
            data={graphData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                },
              },
            }}
          />
        ) : (
          <p className="text-gray-500">No productive hours recorded yet.</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold">Unfinished Plans</h3>
        {studyPlans.some((plan) => !plan.completed) ? (
          <ul className="list-disc pl-6 space-y-2">
            {studyPlans
              .filter((plan) => !plan.completed)
              .map((plan) => (
                <li key={plan._id} className="text-gray-700 dark:text-gray-300">
                  {plan.subject}
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-500">All plans are completed! 🎉</p>
        )}
      </div>
    </div>
  );
}
