import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/sendEmailNotification";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, taskTitle, dueDate } = req.body;

  const message = `Reminder: Your task "${taskTitle}" is due on ${new Date(
    dueDate
  ).toLocaleString()}.`;
  try {
    await sendEmail(email, "Task Reminder", message);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
}
