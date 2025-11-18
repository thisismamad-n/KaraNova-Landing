import { Metadata } from "next";
import CompliancePageClient from "./CompliancePageClient";

export const metadata: Metadata = {
  title: "انطباق قانونی | کارانوا",
  description:
    "اطلاعات انطباق قانونی کارانوا - مجوزها، گواهینامه‌ها و اطلاعات ثبت شرکت",
  keywords: [
    "انطباق قانونی",
    "مجوزها",
    "گواهینامه",
    "کارانوا",
    "ثبت شرکت",
  ],
  openGraph: {
    title: "انطباق قانونی | کارانوا",
    description:
      "اطلاعات انطباق قانونی کارانوا - مجوزها، گواهینامه‌ها و اطلاعات ثبت شرکت",
    type: "website",
  },
};

export default function CompliancePage() {
  return <CompliancePageClient />;
}
