"use client";

import React from "react";
import { PageHero } from "@/app/_components/shared";
import { LegalContent, LegalSection } from "../_components";
import Squares from "@/app/_components/Squares";
import {
  Building2,
  FileCheck,
  Shield,
  Award,
  Download,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ComplianceDocument {
  title: string;
  description: string;
  downloadUrl: string;
  icon: React.ReactNode;
}

interface RegulatoryBody {
  name: string;
  nameEn: string;
  url: string;
  description: string;
}

const complianceDocuments: ComplianceDocument[] = [
  {
    title: "گواهی ثبت شرکت",
    description: "گواهی ثبت رسمی شرکت کارانوا نزد اداره ثبت شرکت‌ها",
    downloadUrl: "/legal/docs/company-registration.pdf",
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    title: "مجوز فعالیت نرم‌افزاری",
    description: "مجوز فعالیت در حوزه نرم‌افزار و فناوری اطلاعات",
    downloadUrl: "/legal/docs/software-license.pdf",
    icon: <FileCheck className="w-6 h-6" />,
  },
  {
    title: "گواهی ISO 27001",
    description: "گواهینامه مدیریت امنیت اطلاعات",
    downloadUrl: "/legal/docs/iso-27001.pdf",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: "گواهی ISO 9001",
    description: "گواهینامه سیستم مدیریت کیفیت",
    downloadUrl: "/legal/docs/iso-9001.pdf",
    icon: <Award className="w-6 h-6" />,
  },
];

const regulatoryBodies: RegulatoryBody[] = [
  {
    name: "سازمان ثبت شرکت‌ها",
    nameEn: "Companies Registration Organization",
    url: "https://www.ssaa.ir",
    description: "مرجع رسمی ثبت و راهبری شرکت‌ها در ایران",
  },
  {
    name: "وزارت ارتباطات و فناوری اطلاعات",
    nameEn: "Ministry of ICT",
    url: "https://www.ict.gov.ir",
    description: "متولی سیاست‌گذاری و نظارت بر فناوری اطلاعات",
  },
  {
    name: "مرکز توسعه تجارت الکترونیکی",
    nameEn: "E-Commerce Development Center",
    url: "https://www.ecdc.ir",
    description: "مرجع صدور نماد اعتماد الکترونیکی",
  },
  {
    name: "سازمان نظام صنفی رایانه‌ای",
    nameEn: "Computer Guild Organization",
    url: "https://www.nezam.ir",
    description: "سازمان نظارت بر فعالیت‌های نرم‌افزاری",
  },
];

export default function CompliancePageClient() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      {/* Animated Background */}
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal"
        borderColor="rgba(20, 184, 166, 0.15)"
        hoverFillColor="rgba(20, 184, 166, 0.05)"
      />

      {/* Hero Section */}
      <PageHero
        title="انطباق قانونی"
        subtitle="شفافیت و پایبندی به قوانین و مقررات"
        backgroundVariant="gradient"
        breadcrumbs={[
          { label: "خانه", href: "/" },
          { label: "قوانین", href: "/legal" },
          { label: "انطباق قانونی", href: "/legal/compliance" },
        ]}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LegalContent>
          {/* Introduction */}
          <div className="mb-8">
            <p className="text-lg text-slate-300 leading-relaxed">
              کارانوا متعهد به رعایت تمامی قوانین و مقررات مربوط به فعالیت‌های
              تجاری و فناوری اطلاعات در ایران است. این صفحه اطلاعات جامعی درباره
              وضعیت قانونی، مجوزها و گواهینامه‌های شرکت ارائه می‌دهد.
            </p>
          </div>

          {/* Company Registration Section */}
          <LegalSection
            id="company-info"
            title="۱. اطلاعات ثبت شرکت"
            defaultOpen={true}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={cn(
                  "backdrop-blur-md bg-slate-900/30",
                  "border border-slate-800/50 rounded-lg p-6"
                )}
              >
                <h3 className="text-lg font-semibold text-slate-200 mb-4">
                  اطلاعات شرکت
                </h3>
                <div className="space-y-3 text-slate-300">
                  <div>
                    <span className="text-slate-400">نام شرکت:</span>
                    <p className="font-medium">شرکت فناوری کارانوا</p>
                  </div>
                  <div>
                    <span className="text-slate-400">نوع شرکت:</span>
                    <p className="font-medium">سهامی خاص</p>
                  </div>
                  <div>
                    <span className="text-slate-400">شماره ثبت:</span>
                    <p className="font-medium">۱۲۳۴۵۶</p>
                  </div>
                  <div>
                    <span className="text-slate-400">شناسه ملی:</span>
                    <p className="font-medium">۱۴۰۰۸۷۶۵۴۳۲۱</p>
                  </div>
                  <div>
                    <span className="text-slate-400">تاریخ ثبت:</span>
                    <p className="font-medium">۱۴۰۱/۰۱/۱۵</p>
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  "backdrop-blur-md bg-slate-900/30",
                  "border border-slate-800/50 rounded-lg p-6"
                )}
              >
                <h3 className="text-lg font-semibold text-slate-200 mb-4">
                  آدرس و تماس
                </h3>
                <div className="space-y-3 text-slate-300">
                  <div>
                    <span className="text-slate-400">آدرس:</span>
                    <p className="font-medium">
                      تهران، خیابان ولیعصر، پلاک ۱۲۳۴، طبقه ۵
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400">کد پستی:</span>
                    <p className="font-medium">۱۲۳۴۵۶۷۸۹۰</p>
                  </div>
                  <div>
                    <span className="text-slate-400">تلفن:</span>
                    <p className="font-medium">۰۲۱-۱۲۳۴۵۶۷۸</p>
                  </div>
                  <div>
                    <span className="text-slate-400">ایمیل:</span>
                    <p className="font-medium">
                      <a
                        href="mailto:info@karanova.io"
                        className="text-teal-400"
                      >
                        info@karanova.io
                      </a>
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400">وب‌سایت:</span>
                    <p className="font-medium">
                      <a href="https://karanova.io" className="text-teal-400">
                        karanova.io
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </LegalSection>

          {/* Licenses and Certifications Section */}
          <LegalSection
            id="licenses"
            title="۲. مجوزها و گواهینامه‌ها"
            defaultOpen={true}
          >
            <p className="mb-6 text-slate-300">
              کارانوا دارای مجوزها و گواهینامه‌های معتبر زیر است:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {complianceDocuments.map((doc, index) => (
                <div
                  key={index}
                  className={cn(
                    "backdrop-blur-md bg-slate-900/30",
                    "border border-slate-800/50 rounded-lg p-6",
                    "hover:border-teal-500/30 transition-colors"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                      {doc.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-200 mb-2">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-slate-400 mb-4">
                        {doc.description}
                      </p>
                      <a
                        href={doc.downloadUrl}
                        download
                        className={cn(
                          "inline-flex items-center gap-2",
                          "text-sm text-teal-400 hover:text-teal-300",
                          "transition-colors"
                        )}
                      >
                        <Download className="w-4 h-4" />
                        دانلود PDF
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-teal-500/10 border border-teal-500/30 rounded-lg">
              <p className="text-sm text-slate-300">
                <strong className="text-teal-400">توجه:</strong> تمامی مجوزها و
                گواهینامه‌ها معتبر و به‌روز هستند. برای تأیید اعتبار، می‌توانید با
                مراجع ذکر شده در بخش «مراجع نظارتی» تماس بگیرید.
              </p>
            </div>
          </LegalSection>

          {/* Regulatory Bodies Section */}
          <LegalSection
            id="regulatory"
            title="۳. مراجع نظارتی"
            defaultOpen={true}
          >
            <p className="mb-6 text-slate-300">
              فعالیت‌های کارانوا تحت نظارت مراجع زیر قرار دارد:
            </p>

            <div className="space-y-4">
              {regulatoryBodies.map((body, index) => (
                <div
                  key={index}
                  className={cn(
                    "backdrop-blur-md bg-slate-900/30",
                    "border border-slate-800/50 rounded-lg p-6",
                    "hover:border-slate-700/50 transition-colors"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-200 mb-1">
                        {body.name}
                      </h3>
                      <p className="text-sm text-slate-400 mb-3">
                        {body.nameEn}
                      </p>
                      <p className="text-slate-300 mb-3">{body.description}</p>
                      <a
                        href={body.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center gap-2",
                          "text-sm text-teal-400 hover:text-teal-300",
                          "transition-colors"
                        )}
                      >
                        مشاهده وب‌سایت
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </LegalSection>

          {/* Compliance Standards Section */}
          <LegalSection
            id="standards"
            title="۴. استانداردها و چارچوب‌های رعایت شده"
            defaultOpen={true}
          >
            <p className="mb-6 text-slate-300">
              کارانوا به استانداردها و چارچوب‌های زیر پایبند است:
            </p>

            <div className="space-y-4">
              <div
                className={cn(
                  "backdrop-blur-md bg-slate-900/30",
                  "border border-slate-800/50 rounded-lg p-6"
                )}
              >
                <h3 className="text-lg font-semibold text-slate-200 mb-3">
                  امنیت اطلاعات
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• ISO/IEC 27001:2013 - مدیریت امنیت اطلاعات</li>
                  <li>• ISO/IEC 27017 - امنیت خدمات ابری</li>
                  <li>• ISO/IEC 27018 - حفاظت از اطلاعات شخصی در ابر</li>
                </ul>
              </div>

              <div
                className={cn(
                  "backdrop-blur-md bg-slate-900/30",
                  "border border-slate-800/50 rounded-lg p-6"
                )}
              >
                <h3 className="text-lg font-semibold text-slate-200 mb-3">
                  کیفیت و مدیریت
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• ISO 9001:2015 - سیستم مدیریت کیفیت</li>
                  <li>• ISO/IEC 20000 - مدیریت خدمات فناوری اطلاعات</li>
                </ul>
              </div>

              <div
                className={cn(
                  "backdrop-blur-md bg-slate-900/30",
                  "border border-slate-800/50 rounded-lg p-6"
                )}
              >
                <h3 className="text-lg font-semibold text-slate-200 mb-3">
                  حریم خصوصی و حفاظت از داده
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• قانون حمایت از حقوق مصرف‌کنندگان الکترونیکی</li>
                  <li>• قانون تجارت الکترونیکی</li>
                  <li>• آیین‌نامه حفاظت از داده‌های شخصی</li>
                </ul>
              </div>
            </div>
          </LegalSection>

          {/* Audits and Reports Section */}
          <LegalSection
            id="audits"
            title="۵. ممیزی‌ها و گزارش‌ها"
            defaultOpen={false}
          >
            <p className="mb-6 text-slate-300">
              کارانوا به صورت منظم تحت ممیزی‌های داخلی و خارجی قرار می‌گیرد:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-200 mb-3">
                  ممیزی‌های امنیتی
                </h3>
                <p className="text-slate-300 mb-2">
                  ممیزی‌های امنیتی سالانه توسط شرکت‌های مستقل انجام می‌شود.
                  آخرین ممیزی در بهمن ۱۴۰۲ انجام شده است.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-200 mb-3">
                  گزارش شفافیت
                </h3>
                <p className="text-slate-300 mb-2">
                  گزارش شفافیت سالانه شامل اطلاعات درباره درخواست‌های قانونی برای
                  دسترسی به داده‌ها منتشر می‌شود.
                </p>
                <a
                  href="/legal/transparency-report-2023.pdf"
                  download
                  className={cn(
                    "inline-flex items-center gap-2 mt-2",
                    "text-sm text-teal-400 hover:text-teal-300",
                    "transition-colors"
                  )}
                >
                  <Download className="w-4 h-4" />
                  دانلود گزارش شفافیت ۱۴۰۲
                </a>
              </div>
            </div>
          </LegalSection>

          {/* Contact Section */}
          <LegalSection
            id="contact"
            title="۶. تماس با بخش انطباق قانونی"
            defaultOpen={false}
          >
            <p className="mb-4 text-slate-300">
              برای سؤالات درباره انطباق قانونی، تأیید مجوزها یا گزارش مشکلات
              قانونی:
            </p>
            <div className="space-y-2 text-slate-300">
              <p>
                <strong className="text-slate-200">ایمیل:</strong>{" "}
                <a
                  href="mailto:compliance@karanova.io"
                  className="text-teal-400"
                >
                  compliance@karanova.io
                </a>
              </p>
              <p>
                <strong className="text-slate-200">تلفن:</strong> ۰۲۱-۱۲۳۴۵۶۷۸
                (داخلی ۳۰۰)
              </p>
              <p>
                <strong className="text-slate-200">آدرس:</strong> تهران، خیابان
                ولیعصر، پلاک ۱۲۳۴، طبقه ۵، واحد امور حقوقی
              </p>
            </div>
          </LegalSection>
        </LegalContent>
      </div>
    </div>
  );
}
