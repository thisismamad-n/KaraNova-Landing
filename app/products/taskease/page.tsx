import { Metadata } from "next";
import TaskEasePageClient from "./TaskEasePageClient";

export const metadata: Metadata = {
  title: "TaskEase - AI Project Management | Karanova",
  description:
    "AI-integrated project management with automated sprints, intelligent resource allocation, and accurate delivery predictions. Reduce project management time by 60%.",
  keywords: [
    "TaskEase",
    "AI Project Management",
    "Sprint Automation",
    "Resource Allocation",
    "Project Planning",
    "Team Collaboration",
    "Karanova",
  ],
  openGraph: {
    title: "TaskEase - AI Project Management",
    description:
      "AI-integrated project management with automated sprints and intelligent resource allocation",
    images: ["/og-taskease.jpg"],
  },
};

export default function TaskEasePage() {
  return <TaskEasePageClient />;
}
