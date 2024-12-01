import mongoose, { Schema, Document } from "mongoose";

interface IStudyPlan extends Document {
  subject: string;
  topics: string[];
  availableHours: number;
  schedule: string[];
  completed: boolean;
}

const StudyPlanSchema = new Schema<IStudyPlan>(
  {
    subject: { type: String, required: true },
    topics: { type: [String], required: true },
    availableHours: { type: Number, required: true },
    schedule: { type: [String], required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.StudyPlan ||
  mongoose.model<IStudyPlan>("StudyPlan", StudyPlanSchema);
