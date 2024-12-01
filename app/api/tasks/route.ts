import connectToDatabase from "@/lib/mongodb";
import Task from "@/models/Task";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { title, dueDate, completed } = await request.json();

    const newTask = new Task({
      title,
      dueDate,
      completed,
    });

    const savedTask = await newTask.save();
    return new Response(JSON.stringify(savedTask), { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return new Response(JSON.stringify({ error: "Failed to create task" }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const tasks = await Task.find({});
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch tasks" }), {
      status: 500,
    });
  }
}
