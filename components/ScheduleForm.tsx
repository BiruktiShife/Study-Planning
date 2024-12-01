"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ScheduleForm() {
  const [subject, setSubject] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState("");
  const [availableHours, setAvailableHours] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [schedule, setSchedule] = useState<string[]>([]);

  const handleAddTopic = () => {
    if (newTopic.trim()) {
      setTopics((prev) => [...prev, newTopic]);
      setNewTopic("");
    }
  };

  const handleGenerateSchedule = async () => {
    const totalTopics = topics.length;
    const hoursPerTopic = availableHours / totalTopics;

    const generatedSchedule = topics.map((topic, index) => {
      const day = Math.floor(index * hoursPerTopic + 1);
      return `Day ${day}: ${topic}`;
    });

    setSchedule(generatedSchedule);

    const response = await fetch("/api/studyplan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject,
        topics,
        availableHours,
        schedule: generatedSchedule,
      }),
    });

    if (!response.ok) {
      console.error("Failed to save study plan");
    }
  };

  return (
    <div className="space-y-6 p-6 rounded-lg border shadow">
      <h2 className="text-2xl font-bold">Create Your Study Schedule</h2>

      <div>
        <label className="block text-sm font-medium mb-2">Subject</label>
        <Input
          type="text"
          placeholder="Enter subject name"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Topics</label>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Enter a topic"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
          />
          <Button onClick={handleAddTopic}>Add</Button>
        </div>
        <ul className="mt-4 space-y-1">
          {topics.map((topic, index) => (
            <li key={index} className="text-sm text-gray-700">
              {index + 1}. {topic}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Available Hours
        </label>
        <Input
          type="number"
          placeholder="Enter total hours available"
          value={availableHours}
          onChange={(e) => setAvailableHours(Number(e.target.value))}
        />
      </div>

      <Button onClick={handleGenerateSchedule} className="w-full">
        Generate Schedule
      </Button>
    </div>
  );
}
