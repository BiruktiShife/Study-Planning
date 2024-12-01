import { Progress } from "@/components/ui/progress";

type Goal = {
  id: string;
  title: string;
  progress: number; // percentage (0-100)
};

const mockGoals: Goal[] = [
  { id: "1", title: "Learn TypeScript basics", progress: 55 },
  { id: "2", title: "Complete UI design", progress: 80 },
];

export function ProgressTracker() {
  const totalProgress =
    mockGoals.reduce((sum, goal) => sum + goal.progress, 0) / mockGoals.length;

  return (
    <div className="rounded-lg border p-4 shadow">
      <h2 className="text-xl font-semibold mb-4">Overall Progress</h2>
      <Progress value={totalProgress} className="mt-4 w-full" />
      <p className="text-center mt-2 text-gray-500">
        {totalProgress.toFixed(2)}% completed
      </p>
    </div>
  );
}
