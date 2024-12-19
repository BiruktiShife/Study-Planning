/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type StudyPlan = {
  _id: string;
  subject: string;
  topics: string[];
  availableHours: number;
  schedule: string[];
  createdAt: string;
  completed: boolean;
};

export default function StudyPlanManager() {
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlan, setEditingPlan] = useState<StudyPlan | null>(null);
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
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudyPlans();
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedPlans = Array.from(studyPlans);
    const [movedPlan] = updatedPlans.splice(result.source.index, 1);
    updatedPlans.splice(result.destination.index, 0, movedPlan);

    setStudyPlans(updatedPlans);
  };

  const toggleCompleted = async (id: string) => {
    try {
      const plan = studyPlans.find((plan) => plan._id === id);
      if (!plan) return;

      const response = await fetch(`/api/studyplan/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !plan.completed }),
      });

      if (!response.ok) throw new Error("Failed to update completion status");

      const updatedPlan = await response.json();
      setStudyPlans((prev) =>
        prev.map((plan) =>
          plan._id === id ? { ...plan, completed: updatedPlan.completed } : plan
        )
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleEdit = (plan: StudyPlan) => {
    setEditingPlan(plan);
    setIsEditing(true);
  };

  const handleEditSave = async () => {
    if (!editingPlan) return;

    try {
      const response = await fetch(`/api/studyplan/${editingPlan._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPlan),
      });

      if (!response.ok) throw new Error("Failed to save changes");

      const updatedPlan = await response.json();
      setStudyPlans((prev) =>
        prev.map((plan) => (plan._id === updatedPlan._id ? updatedPlan : plan))
      );
      setIsEditing(false);
      setEditingPlan(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditingPlan(null);
  };
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/studyplan/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete plan");

      setStudyPlans((prev) => prev.filter((plan) => plan._id !== id));
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="mt-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-6 space-y-6 border rounded-lg bg-white dark:bg-black ">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="studyPlans">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {studyPlans.map((plan, index) => (
                <Draggable key={plan._id} draggableId={plan._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-4 border rounded-lg flex flex-col ${
                        plan.completed ? "bg-green-300" : "bg-gray-100"
                      }`}
                    >
                      <div>
                        <h3
                          className={`font-semibold ${
                            plan.completed
                              ? "line-through text-gray-500"
                              : "text-black"
                          }`}
                        >
                          {plan.subject}
                        </h3>
                        <p className="text-sm text-black">
                          Created At:{" "}
                          {new Date(plan.createdAt).toLocaleString()}
                        </p>
                        <p className="text-sm font-medium mt-2 text-black">
                          Topics:
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                          {plan.topics.map((topic, idx) => (
                            <li key={idx}>{topic}</li>
                          ))}
                        </ul>
                        <p className="text-sm font-medium mt-2 text-black">
                          Schedule:
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                          {plan.schedule.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-2 flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleCompleted(plan._id)}
                        >
                          {plan.completed ? "Undo" : "Complete"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(plan)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(plan._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Edit Modal */}
      {isEditing && editingPlan && (
        <Dialog open={isEditing} onOpenChange={handleEditCancel}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Study Plan</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="text"
                value={editingPlan.subject}
                onChange={(e) =>
                  setEditingPlan({ ...editingPlan, subject: e.target.value })
                }
                placeholder="Subject"
              />
              <Textarea
                value={editingPlan.topics.join(", ")}
                onChange={(e) =>
                  setEditingPlan({
                    ...editingPlan,
                    topics: e.target.value
                      .split(",")
                      .map((topic) => topic.trim()),
                  })
                }
                placeholder="Topics (comma-separated)"
              />
              <Textarea
                value={editingPlan.schedule.join(", ")}
                onChange={(e) =>
                  setEditingPlan({
                    ...editingPlan,
                    schedule: e.target.value
                      .split(",")
                      .map((schedule) => schedule.trim()),
                  })
                }
                placeholder="Schedule (comma-separated)"
              />
              <div className="flex space-x-2">
                <Button onClick={handleEditSave}>Save</Button>
                <Button variant="outline" onClick={handleEditCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
