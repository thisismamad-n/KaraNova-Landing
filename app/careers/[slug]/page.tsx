import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { mockJobs } from "@/app/careers/_data/jobs";
import JobDetailClient from "./JobDetailClient";

// Generate static params for all job slugs
export async function generateStaticParams() {
  return mockJobs.map((job) => ({
    slug: job.slug,
  }));
}

// Generate metadata for each job page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const job = mockJobs.find((j) => j.slug === params.slug);

  if (!job) {
    return generatePageMetadata({
      title: "Job Not Found",
      description: "The requested job posting could not be found.",
      language: "fa",
    });
  }

  return generatePageMetadata({
    title: `${job.title} - Karanova Careers`,
    description: job.description,
    keywords: [
      "Karanova",
      "Careers",
      "Jobs",
      job.title,
      job.department,
      job.location,
      job.type,
    ],
    canonical: `https://karanova.io/careers/${job.slug}`,
    language: "fa",
  });
}

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = mockJobs.find((j) => j.slug === params.slug);

  if (!job) {
    notFound();
  }

  return <JobDetailClient job={job} />;
}
