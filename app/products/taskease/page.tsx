import { Metadata } from "next";
import { generatePageMetadata, generateProductSchema } from "@/lib/seo/metadata";
import StructuredData from "@/app/_components/shared/StructuredData";
import TaskEasePageClient from "./TaskEasePageClient";

export const metadata: Metadata = generatePageMetadata({
  title: "TaskEase - AI Project Management",
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
    "تسک‌ایز",
    "مدیریت پروژه",
  ],
  ogImage: "/og-taskease.jpg",
  canonical: "https://karanova.io/products/taskease",
  language: "en",
});

export default function TaskEasePage() {
  const productSchema = generateProductSchema({
    name: "TaskEase - AI Project Management",
    description:
      "AI-integrated project management with automated sprints, intelligent resource allocation, and accurate delivery predictions",
    url: "https://karanova.io/products/taskease",
    image: "https://karanova.io/og-taskease.jpg",
    category: "BusinessApplication",
  });

  return (
    <>
      <StructuredData data={productSchema} />
      <TaskEasePageClient />
    </>
  );
}
