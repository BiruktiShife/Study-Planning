import { NextResponse } from "next/server";
import StudyPlan from "@/models/StudyPlan";
import connectToDatabase from "@/lib/mongodb";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    console.log(`Deleting study plan with ID: ${id}...`);
    await connectToDatabase();

    const deletedPlan = await StudyPlan.findByIdAndDelete(id);

    if (!deletedPlan) {
      return NextResponse.json(
        { error: "Study plan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Study plan deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting study plan:", error);
    return NextResponse.json(
      { error: "Failed to delete study plan" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Extract ID from URL

    console.log(`Updating study plan with ID: ${id}...`);
    const updates = await request.json();

    console.log("Connecting to database...");
    await connectToDatabase();

    console.log("Finding and updating study plan...");
    const updatedPlan = await StudyPlan.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedPlan) {
      return NextResponse.json(
        { error: "Study plan not found" },
        { status: 404 }
      );
    }

    console.log("Study plan updated successfully:", updatedPlan);
    return NextResponse.json(updatedPlan, { status: 200 });
  } catch (error) {
    console.error("Error updating study plan:", error);
    return NextResponse.json(
      { error: "Failed to update study plan" },
      { status: 500 }
    );
  }
}
