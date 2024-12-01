import { NextResponse } from "next/server";
import StudyPlan from "@/models/StudyPlan";
import connectToDatabase from "@/lib/mongodb";

// POST: Create a new study plan
export async function POST(request: Request) {
  try {
    console.log("Parsing request body...");
    const { subject, topics, availableHours, schedule } = await request.json();

    console.log("Connecting to database...");
    await connectToDatabase();

    console.log("Creating new study plan...");
    const studyPlan = new StudyPlan({
      subject,
      topics,
      availableHours,
      schedule,
    });

    console.log("Saving study plan...");
    const savedPlan = await studyPlan.save();

    console.log("Study plan saved successfully:", savedPlan);
    return NextResponse.json(savedPlan, { status: 201 });
  } catch (error) {
    console.error("Error saving study plan:", error);
    return NextResponse.json(
      { error: "Failed to save study plan" },
      { status: 500 }
    );
  }
}

// GET: Fetch all study plans
export async function GET() {
  try {
    console.log("Connecting to database...");
    await connectToDatabase();

    console.log("Fetching all study plans...");
    const studyPlans = await StudyPlan.find({});
    return NextResponse.json(studyPlans, { status: 200 });
  } catch (error) {
    console.error("Error fetching study plans:", error);
    return NextResponse.json(
      { error: "Failed to fetch study plans" },
      { status: 500 }
    );
  }
}

// PUT: Update a study plan by ID
// export async function PUT(request: Request) {
//   try {
//     const url = new URL(request.url);
//     const id = url.pathname.split("/").pop(); // Extract ID from URL

//     console.log(`Updating study plan with ID: ${id}...`);
//     const updates = await request.json();

//     console.log("Connecting to database...");
//     await connectToDatabase();

//     console.log("Finding and updating study plan...");
//     const updatedPlan = await StudyPlan.findByIdAndUpdate(id, updates, {
//       new: true,
//     });

//     if (!updatedPlan) {
//       return NextResponse.json(
//         { error: "Study plan not found" },
//         { status: 404 }
//       );
//     }

//     console.log("Study plan updated successfully:", updatedPlan);
//     return NextResponse.json(updatedPlan, { status: 200 });
//   } catch (error) {
//     console.error("Error updating study plan:", error);
//     return NextResponse.json(
//       { error: "Failed to update study plan" },
//       { status: 500 }
//     );
//   }
// }

// // DELETE: Delete a study plan by ID
// export async function DELETE(request: Request) {
//   try {
//     const url = new URL(request.url);
//     const id = url.pathname.split("/").pop(); // Extract ID from URL

//     console.log(`Deleting study plan with ID: ${id}...`);
//     await connectToDatabase();

//     console.log("Finding and deleting study plan...");
//     const deletedPlan = await StudyPlan.findByIdAndDelete(id);

//     if (!deletedPlan) {
//       return NextResponse.json(
//         { error: "Study plan not found" },
//         { status: 404 }
//       );
//     }

//     console.log("Study plan deleted successfully:", deletedPlan);
//     return NextResponse.json(
//       { message: "Study plan deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting study plan:", error);
//     return NextResponse.json(
//       { error: "Failed to delete study plan" },
//       { status: 500 }
//     );
//   }
// }
