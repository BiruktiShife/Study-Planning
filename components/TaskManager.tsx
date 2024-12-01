"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  scheduleDate: string; // ISO Date format
};

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Math Homework",
      completed: false,
      priority: "High",
      scheduleDate: "2024-11-20",
    },
    {
      id: "2",
      title: "Science Project",
      completed: false,
      priority: "Medium",
      scheduleDate: "2024-11-21",
    },
    {
      id: "3",
      title: "Read Book",
      completed: false,
      priority: "Low",
      scheduleDate: "2024-11-22",
    },
  ]);

  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: String(tasks.length + 1),
          title: newTask,
          completed: false,
          priority: "Medium",
          scheduleDate: new Date().toISOString().split("T")[0],
        },
      ]);
      setNewTask("");
    }
  };

  const handleMarkComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

  return (
    <div className="p-6 space-y-6 border rounded-lg bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold">Task Manager</h2>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button onClick={handleAddTask}>Add Task</Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-4"
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-4 border rounded-lg flex justify-between items-center ${
                        task.completed ? "bg-green-300" : "bg-gray-100"
                      }`}
                    >
                      <div>
                        <h3 className="font-semibold text-black">
                          {task.title}
                        </h3>
                        <p className="text-sm text-black">
                          Priority: {task.priority} | Scheduled:{" "}
                          {task.scheduleDate}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkComplete(task.id)}
                        >
                          {task.completed ? "Undo" : "Complete"}
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
    </div>
  );
}
