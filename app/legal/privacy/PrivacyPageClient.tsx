"use client";

import React from "react";
import { PageHero } from "@/app/_components/shared";
import { LegalContent, LegalSection, VersionHistory } from "../_components";
import Squares from "@/app/_components/Squares";

const privacyVersions = [
  {
    version: "2.0",
    date: new Date("2024-01-15"),
    changes: [
      "افزودن بخش حقوق کاربران در مورد داده‌های شخصی",
      "به‌روزرسانی سیاست‌های ذخیره‌سازی داده",
      "اضافه شدن جزئیات بیشتر درباره استفاده از کوکی‌ها",
    ],
    downloadUrl: "/legal/privacy-v2.0.pdf",
  },
  {
    version: "1.5",
    date: new Date("2023-08-20"),
    changes: [
      "به‌روزرسانی سیاست اشتراک‌گذاری داده با شرکای تجاری",
      "اضافه شدن بخش امنیت داده",
    ],
    downloadUrl: "/legal/privacy-v1.5.pdf",
  },
  {
    version: "1.0",
    date: new Date("2023-01-10"),
    changes: ["نسخه اولیه سیاست حفظ حریم خصوصی"],
    downloadUrl: "/legal/privacy-v1.0.pdf",
  },
];

export default function PrivacyPageClient() {
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
        title="سیاست حفظ حریم خصوصی"
        subtitle="ما به حفظ حریم خصوصی و امنیت اطلاعات شما متعهد هستیم"
        backgroundVariant="gradient"
        breadcrumbs={[
          { label: "خانه", href: "/" },
          { label: "قوانین", href: "/legal" },
          { label: "حریم خصوصی", href: "/legal/privacy" },
        ]}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LegalContent
          lastUpdated={new Date("2024-01-15")}
          version="2.0"
        >
          {/* Introduction */}
          <div className="mb-8">
            <p className="text-lg text-slate-300 leading-relaxed">
              این سیاست حفظ حریم خصوصی نحوه جمع‌آوری، استفاده، ذخیره‌سازی و حفاظت
              از اطلاعات شخصی شما توسط شرکت کارانوا را توضیح می‌دهد. با استفاده از
              خدمات ما، شما با شرایط این سیاست موافقت می‌کنید.
            </p>
          </div>

          {/* Data Collection Section */}
          <LegalSection
            id="data-collection"
            title="۱. جمع‌آوری اطلاعات"
            defaultOpen={true}
          >
            <h3 className="text-lg font-semibold text-slate-200 mb-3">
              ۱.۱ اطلاعات شخصی
            </h3>
            <p className="mb-4">
              ما انواع مختلفی از اطلاعات شخصی را جمع‌آوری می‌کنیم که شامل موارد
              زیر است:
            </p>
            <ul className="space-y-2 mb-4">
              <li>• نام و نام خانوادگی</li>
              <li>• آدرس ایمیل</li>
              <li>• شماره تلفن</li>
              <li>• اطلاعات شرکت (نام، آدرس، شناسه ملی)</li>
              <li>• اطلاعات پرداخت (از طریق درگاه‌های امن)</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-200 mb-3 mt-6">
              ۱.۲ اطلاعات استفاده
            </h3>
            <p className="mb-4">
              ما به صورت خودکار اطلاعاتی درباره نحوه استفاده شما از خدمات جمع‌آوری
              می‌کنیم:
            </p>
            <ul className="space-y-2 mb-4">
              <li>• آدرس IP و اطلاعات دستگاه</li>
              <li>• نوع مرورگر و سیستم عامل</li>
              <li>• صفحات بازدید شده و زمان استفاده</li>
              <li>• الگوهای کلیک و تعاملات</li>
              <li>• کوکی‌ها و فناوری‌های ردیابی مشابه</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-200 mb-3 mt-6">
              ۱.۳ اطلاعات از منابع شخص ثالث
            </h3>
            <p>
              در صورت استفاده از سرویس‌های شخص ثالث برای ورود (مانند Google یا
              LinkedIn)، ممکن است اطلاعاتی از آن سرویس‌ها دریافت کنیم.
            </p>
          </LegalSection>

          {/* Data Usage Section */}
          <LegalSection
            id="data-usage"
            title="۲. استفاده از اطلاعات"
            defaultOpen={true}
          >
            <p className="mb-4">
              ما از اطلاعات جمع‌آوری شده برای اهداف زیر استفاده می‌کنیم:
            </p>
            <ul className="space-y-3">
              <li>
                <strong className="text-slate-200">ارائه خدمات:</strong> برای
                فراهم کردن، نگهداری و بهبود خدمات کارانوا
              </li>
              <li>
                <strong className="text-slate-200">پشتیبانی مشتری:</strong> برای
                پاسخگویی به درخواست‌ها و ارائه پشتیبانی فنی
              </li>
              <li>
                <strong className="text-slate-200">شخصی‌سازی:</strong> برای
                سفارشی‌سازی تجربه کاربری و ارائه محتوای مرتبط
              </li>
              <li>
                <strong className="text-slate-200">ارتباطات:</strong> برای ارسال
                اطلاعیه‌های مهم، به‌روزرسانی‌ها و اطلاعات بازاریابی (با رضایت شما)
              </li>
              <li>
                <strong className="text-slate-200">امنیت:</strong> برای شناسایی و
                جلوگیری از تقلب، سوء استفاده و فعالیت‌های غیرمجاز
              </li>
              <li>
                <strong className="text-slate-200">تحلیل و بهبود:</strong> برای
                تجزیه و تحلیل الگوهای استفاده و بهبود عملکرد سیستم
              </li>
              <li>
                <strong className="text-slate-200">الزامات قانونی:</strong> برای
                رعایت قوانین و مقررات قابل اجرا
              </li>
            </ul>
          </LegalSection>

          {/* Data Storage Section */}
          <LegalSection
            id="data-storage"
            title="۳. ذخیره‌سازی و نگهداری اطلاعات"
            defaultOpen={true}
          >
            <h3 className="text-lg font-semibold text-slate-200 mb-3">
              ۳.۱ مکان ذخیره‌سازی
            </h3>
            <p className="mb-4">
              اطلاعات شما در سرورهای امن واقع در ایران ذخیره می‌شود. ما از
              استانداردهای صنعتی برای حفاظت از داده‌ها استفاده می‌کنیم.
            </p>

            <h3 className="text-lg font-semibold text-slate-200 mb-3 mt-6">
              ۳.۲ مدت نگهداری
            </h3>
            <p className="mb-4">
              ما اطلاعات شخصی شما را تا زمانی که برای اهداف ذکر شده در این سیاست
              ضروری باشد، نگهداری می‌کنیم:
            </p>
            <ul className="space-y-2">
              <li>• اطلاعات حساب کاربری: تا زمان حذف حساب توسط کاربر</li>
              <li>• داده‌های تراکنش: حداقل ۷ سال (طبق قوانین مالیاتی)</li>
              <li>• لاگ‌های سیستم: حداکثر ۱۲ ماه</li>
              <li>• داده‌های بازاریابی: تا زمان لغو اشتراک</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-200 mb-3 mt-6">
              ۳.۳ امنیت داده
            </h3>
            <p className="mb-4">
              ما از اقدامات امنیتی فنی و سازمانی مناسب برای محافظت از اطلاعات شما
              استفاده می‌کنیم:
            </p>
            <ul className="space-y-2">
              <li>• رمزگذاری داده‌ها در حین انتقال (SSL/TLS)</li>
              <li>• رمزگذاری داده‌ها در حالت ذخیره‌سازی</li>
              <li>• کنترل دسترسی محدود به داده‌های حساس</li>
              <li>• نظارت مستمر بر امنیت سیستم</li>
              <li>• پشتیبان‌گیری منظم از داده‌ها</li>
            </ul>
          </LegalSection>

          {/* User Rights Section */}
          <LegalSection
            id="user-rights"
            title="۴. حقوق کاربران"
            defaultOpen={true}
          >
            <p className="mb-4">
              شما نسبت به اطلاعات شخصی خود دارای حقوق زیر هستید:
            </p>
            <ul className="space-y-3">
              <li>
                <strong className="text-slate-200">حق دسترسی:</strong> می‌توانید
                درخواست کنید که کپی‌ای از اطلاعات شخصی خود را دریافت کنید
              </li>
              <li>
                <strong className="text-slate-200">حق اصلاح:</strong> می‌توانید
                اطلاعات نادرست یا ناقص خود را تصحیح کنید
              </li>
              <li>
                <strong className="text-slate-200">حق حذف:</strong> می‌توانید
                درخواست حذف اطلاعات شخصی خود را بدهید (با رعایت الزامات قانونی)
              </li>
              <li>
                <strong className="text-slate-200">حق محدودیت پردازش:</strong>{" "}
                می‌توانید درخواست محدود کردن پردازش اطلاعات خود را بدهید
              </li>
              <li>
                <strong className="text-slate-200">حق قابلیت انتقال:</strong>{" "}
                می‌توانید درخواست انتقال اطلاعات خود به سرویس دیگری را بدهید
              </li>
              <li>
                <strong className="text-slate-200">حق اعتراض:</strong> می‌توانید
                به پردازش اطلاعات خود برای اهداف خاص اعتراض کنید
              </li>
              <li>
                <strong className="text-slate-200">حق لغو رضایت:</strong> می‌توانید
                رضایت خود را برای پردازش اطلاعات در هر زمان لغو کنید
              </li>
            </ul>
            <p className="mt-4">
              برای اعمال این حقوق، لطفاً با ما از طریق{" "}
              <a href="mailto:privacy@karanova.io" className="text-teal-400">
                privacy@karanova.io
              </a>{" "}
              تماس بگیرید.
            </p>
          </LegalSection>

          {/* Data Sharing Section */}
          <LegalSection
            id="data-sharing"
            title="۵. اشتراک‌گذاری اطلاعات"
            defaultOpen={false}
          >
            <p className="mb-4">
              ما اطلاعات شخصی شما را به فروش نمی‌رسانیم. با این حال، ممکن است در
              موارد زیر اطلاعات را با اشخاص ثالث به اشتراک بگذاریم:
            </p>
            <ul className="space-y-3">
              <li>
                <strong className="text-slate-200">ارائه‌دهندگان خدمات:</strong> با
                شرکت‌هایی که خدمات پشتیبانی ارائه می‌دهند (میزبانی، پردازش پرداخت،
                تحلیل داده)
              </li>
              <li>
                <strong className="text-slate-200">شرکای تجاری:</strong> با رضایت
                صریح شما برای ارائه خدمات یکپارچه
              </li>
              <li>
                <strong className="text-slate-200">الزامات قانونی:</strong> زمانی که
                قانوناً ملزم به افشای اطلاعات باشیم
              </li>
              <li>
                <strong className="text-slate-200">حفاظت از حقوق:</strong> برای
                حفاظت از حقوق، دارایی یا امنیت کارانوا و کاربران
              </li>
              <li>
                <strong className="text-slate-200">انتقال کسب‌وکار:</strong> در صورت
                ادغام، خرید یا فروش دارایی‌ها
              </li>
            </ul>
          </LegalSection>

          {/* Cookies Section */}
          <LegalSection
            id="cookies"
            title="۶. کوکی‌ها و فناوری‌های ردیابی"
            defaultOpen={false}
          >
            <p className="mb-4">
              ما از کوکی‌ها و فناوری‌های مشابه برای بهبود تجربه کاربری استفاده
              می‌کنیم:
            </p>
            <ul className="space-y-3 mb-4">
              <li>
                <strong className="text-slate-200">کوکی‌های ضروری:</strong> برای
                عملکرد اساسی سایت
              </li>
              <li>
                <strong className="text-slate-200">کوکی‌های عملکردی:</strong> برای
                به خاطر سپردن تنظیمات شما
              </li>
              <li>
                <strong className="text-slate-200">کوکی‌های تحلیلی:</strong> برای
                درک نحوه استفاده از سایت
              </li>
              <li>
                <strong className="text-slate-200">کوکی‌های بازاریابی:</strong> برای
                ارائه تبلیغات مرتبط
              </li>
            </ul>
            <p>
              شما می‌توانید کوکی‌ها را از طریق تنظیمات مرورگر خود مدیریت کنید. توجه
              داشته باشید که غیرفعال کردن کوکی‌ها ممکن است بر عملکرد برخی از
              ویژگی‌ها تأثیر بگذارد.
            </p>
          </LegalSection>

          {/* Children Privacy Section */}
          <LegalSection
            id="children-privacy"
            title="۷. حریم خصوصی کودکان"
            defaultOpen={false}
          >
            <p>
              خدمات ما برای افراد زیر ۱۸ سال طراحی نشده است. ما آگاهانه اطلاعات
              شخصی از کودکان جمع‌آوری نمی‌کنیم. اگر متوجه شویم که اطلاعات کودکی را
              جمع‌آوری کرده‌ایم، فوراً آن را حذف خواهیم کرد.
            </p>
          </LegalSection>

          {/* Changes to Policy Section */}
          <LegalSection
            id="policy-changes"
            title="۸. تغییرات در سیاست حریم خصوصی"
            defaultOpen={false}
          >
            <p className="mb-4">
              ما ممکن است این سیاست حریم خصوصی را به‌روزرسانی کنیم. تغییرات مهم از
              طریق ایمیل یا اعلان در سایت به اطلاع شما خواهد رسید. استفاده مستمر
              شما از خدمات پس از تغییرات، به معنای پذیرش سیاست جدید است.
            </p>
          </LegalSection>

          {/* Contact Section */}
          <LegalSection
            id="contact"
            title="۹. تماس با ما"
            defaultOpen={false}
          >
            <p className="mb-4">
              اگر سؤال یا نگرانی درباره این سیاست حریم خصوصی دارید، لطفاً با ما
              تماس بگیرید:
            </p>
            <div className="space-y-2 text-slate-300">
              <p>
                <strong className="text-slate-200">ایمیل:</strong>{" "}
                <a href="mailto:privacy@karanova.io" className="text-teal-400">
                  privacy@karanova.io
                </a>
              </p>
              <p>
                <strong className="text-slate-200">تلفن:</strong> ۰۲۱-۱۲۳۴۵۶۷۸
              </p>
              <p>
                <strong className="text-slate-200">آدرس:</strong> تهران، خیابان
                ولیعصر، پلاک ۱۲۳۴
              </p>
            </div>
          </LegalSection>
        </LegalContent>

        {/* Version History */}
        <div className="mt-8">
          <VersionHistory versions={privacyVersions} />
        </div>
      </div>
    </div>
  );
}
