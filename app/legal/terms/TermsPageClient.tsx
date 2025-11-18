"use client";

import React from "react";
import { PageHero } from "@/app/_components/shared";
import { LegalContent, LegalSection, VersionHistory } from "../_components";
import Squares from "@/app/_components/Squares";

const termsVersions = [
  {
    version: "3.0",
    date: new Date("2024-02-01"),
    changes: [
      "افزودن بخش مسئولیت‌های کاربر در استفاده از هوش مصنوعی",
      "به‌روزرسانی شرایط لغو اشتراک و بازپرداخت",
      "اضافه شدن بخش مالکیت معنوی",
    ],
    downloadUrl: "/legal/terms-v3.0.pdf",
  },
  {
    version: "2.5",
    date: new Date("2023-10-15"),
    changes: [
      "به‌روزرسانی شرایط استفاده از API",
      "اضافه شدن محدودیت‌های استفاده منصفانه",
    ],
    downloadUrl: "/legal/terms-v2.5.pdf",
  },
  {
    version: "2.0",
    date: new Date("2023-05-20"),
    changes: [
      "بازنگری کامل شرایط خدمات",
      "افزودن بخش حل اختلاف",
    ],
    downloadUrl: "/legal/terms-v2.0.pdf",
  },
  {
    version: "1.0",
    date: new Date("2023-01-10"),
    changes: ["نسخه اولیه شرایط استفاده"],
    downloadUrl: "/legal/terms-v1.0.pdf",
  },
];

export default function TermsPageClient() {
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
        title="شرایط استفاده"
        subtitle="لطفاً قبل از استفاده از خدمات کارانوا، این شرایط را با دقت مطالعه کنید"
        backgroundVariant="gradient"
        breadcrumbs={[
          { label: "خانه", href: "/" },
          { label: "قوانین", href: "/legal" },
          { label: "شرایط استفاده", href: "/legal/terms" },
        ]}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LegalContent
          lastUpdated={new Date("2024-02-01")}
          version="3.0"
        >
          {/* Introduction */}
          <div className="mb-8">
            <p className="text-lg text-slate-300 leading-relaxed mb-4">
              این شرایط استفاده («شرایط») قرارداد قانونی بین شما («کاربر» یا «شما»)
              و شرکت کارانوا («کارانوا»، «ما» یا «خدمات ما») را تشکیل می‌دهد. با
              دسترسی یا استفاده از پلتفرم کارانوا، شما موافقت می‌کنید که به این
              شرایط پایبند باشید.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              اگر با این شرایط موافق نیستید، لطفاً از خدمات ما استفاده نکنید.
            </p>
          </div>

          {/* Definitions Section */}
          <LegalSection
            id="definitions"
            title="۱. تعاریف"
            defaultOpen={true}
          >
            <p className="mb-4">
              در این سند، اصطلاحات زیر دارای معانی مشخص شده هستند:
            </p>
            <ul className="space-y-3">
              <li>
                <strong className="text-slate-200">«پلتفرم»:</strong> به معنای
                نرم‌افزار، برنامه‌ها، وب‌سایت و خدمات کارانوا شامل Inova، TaskEase
                و BIQ
              </li>
              <li>
                <strong className="text-slate-200">«کاربر»:</strong> هر شخص حقیقی یا
                حقوقی که از خدمات کارانوا استفاده می‌کند
              </li>
              <li>
                <strong className="text-slate-200">«محتوای کاربر»:</strong> هرگونه
                داده، اطلاعات، متن، نرم‌افزار، موسیقی، صدا، عکس، گرافیک، ویدیو،
                پیام یا سایر مطالبی که کاربر آپلود، ارسال یا نمایش می‌دهد
              </li>
              <li>
                <strong className="text-slate-200">«سازمان»:</strong> یک نهاد
                تجاری، شرکت یا گروهی که از خدمات کارانوا استفاده می‌کند
              </li>
              <li>
                <strong className="text-slate-200">«اشتراک»:</strong> دسترسی پولی
                به ویژگی‌های پیشرفته پلتفرم
              </li>
              <li>
                <strong className="text-slate-200">«API»:</strong> رابط برنامه‌نویسی
                کاربردی که امکان یکپارچه‌سازی با سیستم‌های شخص ثالث را فراهم
                می‌کند
              </li>
            </ul>
          </LegalSection>

          {/* Acceptance Section */}
          <LegalSection
            id="acceptance"
            title="۲. پذیرش شرایط"
            defaultOpen={true}
          >
            <p className="mb-4">
              با ایجاد حساب کاربری، دسترسی یا استفاده از خدمات کارانوا، شما تأیید
              می‌کنید که:
            </p>
            <ul className="space-y-2">
              <li>• حداقل ۱۸ سال سن دارید یا سن قانونی در کشور خود را دارید</li>
              <li>• این شرایط را خوانده و درک کرده‌اید</li>
              <li>• با تمام شرایط و ضوابط موافقت می‌کنید</li>
              <li>
                • اختیار قانونی برای ورود به این قرارداد را دارید (اگر به نمایندگی
                از سازمان عمل می‌کنید)
              </li>
              <li>• تمام اطلاعات ارائه شده دقیق و کامل است</li>
            </ul>
          </LegalSection>

          {/* Account Registration Section */}
          <LegalSection
            id="account"
            title="۳. ثبت‌نام و حساب کاربری"
            defaultOpen={true}
          >
            <h3 className="text-lg font-semibold text-slate-200 mb-3">
              ۳.۱ ایجاد حساب
            </h3>
            <p className="mb-4">
              برای استفاده از خدمات، باید یک حساب کاربری ایجاد کنید. شما موظف
              هستید:
            </p>
            <ul className="space-y-2 mb-4">
              <li>• اطلاعات دقیق، کامل و به‌روز ارائه دهید</li>
              <li>• محرمانه بودن رمز عبور خود را حفظ کنید</li>
              <li>• فوراً هرگونه استفاده غیرمجاز را به ما اطلاع دهید</li>
              <li>• مسئولیت تمام فعالیت‌های انجام شده از حساب خود را بپذیرید</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-200 mb-3 mt-6">
              ۳.۲ حساب‌های سازمانی
            </h3>
            <p className="mb-4">
              برای حساب‌های سازمانی، مدیر سازمان مسئول:
            </p>
            <ul className="space-y-2">
              <li>• مدیریت دسترسی کاربران</li>
              <li>• اطمینان از رعایت این شرایط توسط تمام اعضا</li>
              <li>• پرداخت هزینه‌های اشتراک</li>
              <li>• نظارت بر استفاده از خدمات</li>
            </ul>
          </LegalSection>

          {/* Service Usage Section */}
          <LegalSection
            id="usage"
            title="۴. استفاده از خدمات"
            defaultOpen={true}
          >
            <h3 className="text-lg font-semibold text-slate-200 mb-3">
              ۴.۱ مجوز استفاده
            </h3>
            <p className="mb-4">
              ما به شما مجوز محدود، غیرانحصاری، غیرقابل انتقال و قابل لغو برای
              دسترسی و استفاده از خدمات طبق این شرایط می‌دهیم.
            </p>

            <h3 className="text-lg font-semibold text-slate-200 mb-3 mt-6">
              ۴.۲ محدودیت‌های استفاده
            </h3>
            <p className="mb-4">شما موافقت می‌کنید که:</p>
            <ul className="space-y-2 mb-4">
              <li>• از خدمات فقط برای اهداف قانونی استفاده کنید</li>
              <li>• از هرگونه استفاده که حقوق دیگران را نقض می‌کند خودداری کنید</li>
              <li>• سعی در دسترسی غیرمجاز به سیستم‌ها نکنید</li>
              <li>• ویروس یا کد مخرب ارسال نکنید</li>
              <li>• از ربات‌ها یا ابزارهای خودکار بدون مجوز استفاده نکنید</li>
              <li>• محتوای غیرقانونی، تهدیدآمیز یا توهین‌آمیز ارسال نکنید</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-200 mb-3 mt-6">
              ۴.۳ استفاده منصفانه
            </h3>
            <p className="mb-4">
              ما سیاست استفاده منصفانه را اعمال می‌کنیم. استفاده بیش از حد که بر
              عملکرد سیستم تأثیر می‌گذارد ممکن است منجر به محدودیت یا تعلیق حساب
              شود.
            </p>
          </LegalSection>

          {/* Subscription and Payment Section */}
          <LegalSection
            id="subscription"
            title="۵. اشتراک و پرداخت"
            defaultOpen={true}
          >
            <h3 className="text-lg font-semibold text-slate-200 mb-3">
              ۵.۱ طرح‌های اشتراک
            </h3>
            <p className="mb-4">
              کارانوا طرح‌های اشتراک مختلفی ارائه می‌دهد. جزئیات هر طرح در صفحه
              قیمت‌گذاری ما موجود است.
            </p>

            <h3 className="text-lg font-semibold text-slate-200 mb-3 mt-6">
              ۵.۲ پرداخت
            </h3>
            <ul className="space-y-2 mb-4">
              <li>• پرداخت‌ها از طریق درگاه‌های امن پرداخت انجام می‌شود</li>
              <li>• هزینه‌ها به صورت ماهانه یا سالانه قابل پرداخت است</li>
              <li>• تمام قیمت‌ها شامل مالیات بر ارزش افزوده است</li>
              <li>• پرداخت‌ها به صورت خودکار تمدید می‌شوند مگر اینکه لغو شوند</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-200 mb-3 mt-6">
              ۵.۳ لغو و بازپرداخت
            </h3>
            <p className="mb-4">
              شما می‌توانید اشتراک خود را در هر زمان لغو کنید:
            </p>
            <ul className="space-y-2">
              <li>• لغو قبل از پایان دوره فعلی، از تمدید خودکار جلوگیری می‌کند</li>
              <li>• بازپرداخت فقط در ۱۴ روز اول اشتراک امکان‌پذیر است</li>
              <li>• بازپرداخت نسبی برای لغوهای میان‌دوره‌ای ارائه نمی‌شود</li>
              <li>• حساب‌های تعلیق شده به دلیل نقض شرایط، مشمول بازپرداخت نیستند</li>
            </ul>
          </LegalSection>

          {/* Intellectual Property Section */}
          <LegalSection
            id="intellectual-property"
            title="۶. مالکیت معنوی"
            defaultOpen={true}
          >
            <h3 className="text-lg font-semibold text-slate-200 mb-3">
              ۶.۱ مالکیت کارانوا
            </h3>
            <p className="mb-4">
              تمام حقوق مالکیت معنوی در پلتفرم، از جمله نرم‌افزار، طراحی، محتوا،
              علائم تجاری و لوگوها متعلق به کارانوا است.
            </p>

            <h3 className="text-lg font-semibold text-slate-200 mb-3 mt-6">
              ۶.۲ محتوای کاربر
            </h3>
            <p className="mb-4">
              شما مالکیت محتوای خود را حفظ می‌کنید. با آپلود محتوا، به ما مجوز
              محدود برای:
            </p>
            <ul className="space-y-2">
              <li>• ذخیره و پردازش محتوای شما برای ارائه خدمات</li>
              <li>• استفاده از محتوا برای بهبود الگوریتم‌های هوش مصنوعی (ناشناس)</li>
              <li>• نمایش محتوا به کاربران مجاز در سازمان شما</li>
            </ul>
          </LegalSection>

          {/* AI Usage Section */}
          <LegalSection
            id="ai-usage"
            title="۷. استفاده از هوش مصنوعی"
            defaultOpen={true}
          >
            <p className="mb-4">
              خدمات کارانوا شامل ویژگی‌های مبتنی بر هوش مصنوعی است. شما تأیید
              می‌کنید که:
            </p>
            <ul className="space-y-2">
              <li>
                • خروجی‌های هوش مصنوعی ممکن است کامل یا دقیق نباشند و نیاز به
                بررسی دارند
              </li>
              <li>• مسئولیت استفاده از خروجی‌های هوش مصنوعی بر عهده شماست</li>
              <li>
                • نباید از هوش مصنوعی برای تولید محتوای غیرقانونی یا مضر استفاده
                کنید
              </li>
              <li>• ما مسئولیتی در قبال تصمیمات گرفته شده بر اساس AI نداریم</li>
            </ul>
          </LegalSection>

          {/* Data and Privacy Section */}
          <LegalSection
            id="data-privacy"
            title="۸. داده و حریم خصوصی"
            defaultOpen={false}
          >
            <p className="mb-4">
              استفاده ما از اطلاعات شخصی شما تحت{" "}
              <a href="/legal/privacy" className="text-teal-400">
                سیاست حریم خصوصی
              </a>{" "}
              ما قرار دارد. با استفاده از خدمات، شما با جمع‌آوری و استفاده از
              اطلاعات طبق آن سیاست موافقت می‌کنید.
            </p>
          </LegalSection>

          {/* Warranties and Disclaimers Section */}
          <LegalSection
            id="warranties"
            title="۹. ضمانت‌ها و سلب مسئولیت"
            defaultOpen={false}
          >
            <h3 className="text-lg font-semibold text-slate-200 mb-3">
              ۹.۱ خدمات «همان‌طور که هست»
            </h3>
            <p className="mb-4">
              خدمات «همان‌طور که هست» و «همان‌طور که در دسترس است» ارائه می‌شود.
              ما هیچ ضمانتی درباره:
            </p>
            <ul className="space-y-2 mb-4">
              <li>• دقت، قابلیت اطمینان یا کامل بودن خدمات</li>
              <li>• عدم وقفه یا خطا در عملکرد</li>
              <li>• امنیت کامل داده‌ها</li>
              <li>• نتایج خاص از استفاده</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-200 mb-3 mt-6">
              ۹.۲ محدودیت مسئولیت
            </h3>
            <p className="mb-4">
              تا حد مجاز قانون، کارانوا مسئول هیچ‌یک از موارد زیر نیست:
            </p>
            <ul className="space-y-2">
              <li>• خسارات غیرمستقیم، تصادفی یا تبعی</li>
              <li>• از دست دادن سود، درآمد یا داده</li>
              <li>• وقفه کسب‌وکار</li>
              <li>• خسارات ناشی از استفاده یا عدم توانایی استفاده از خدمات</li>
            </ul>
          </LegalSection>

          {/* Termination Section */}
          <LegalSection
            id="termination"
            title="۱۰. خاتمه"
            defaultOpen={false}
          >
            <h3 className="text-lg font-semibold text-slate-200 mb-3">
              ۱۰.۱ خاتمه توسط کاربر
            </h3>
            <p className="mb-4">
              شما می‌توانید حساب خود را در هر زمان از طریق تنظیمات حساب حذف کنید.
            </p>

            <h3 className="text-lg font-semibold text-slate-200 mb-3 mt-6">
              ۱۰.۲ خاتمه توسط کارانوا
            </h3>
            <p className="mb-4">
              ما می‌توانیم دسترسی شما را در موارد زیر تعلیق یا خاتمه دهیم:
            </p>
            <ul className="space-y-2">
              <li>• نقض این شرایط</li>
              <li>• استفاده غیرقانونی یا سوء استفاده از خدمات</li>
              <li>• عدم پرداخت هزینه‌ها</li>
              <li>• درخواست مقامات قانونی</li>
              <li>• تهدید امنیت یا عملکرد سیستم</li>
            </ul>
          </LegalSection>

          {/* Dispute Resolution Section */}
          <LegalSection
            id="dispute"
            title="۱۱. حل اختلاف"
            defaultOpen={false}
          >
            <h3 className="text-lg font-semibold text-slate-200 mb-3">
              ۱۱.۱ قانون حاکم
            </h3>
            <p className="mb-4">
              این شرایط تحت قوانین جمهوری اسلامی ایران تفسیر و اجرا می‌شود.
            </p>

            <h3 className="text-lg font-semibold text-slate-200 mb-3 mt-6">
              ۱۱.۲ حل اختلاف
            </h3>
            <p className="mb-4">
              در صورت بروز اختلاف، طرفین ابتدا تلاش می‌کنند از طریق مذاکره به
              توافق برسند. اگر حل نشد، اختلاف به داوری یا محاکم صالح تهران ارجاع
              می‌شود.
            </p>
          </LegalSection>

          {/* General Provisions Section */}
          <LegalSection
            id="general"
            title="۱۲. مقررات عمومی"
            defaultOpen={false}
          >
            <ul className="space-y-3">
              <li>
                <strong className="text-slate-200">تغییرات:</strong> ما ممکن است
                این شرایط را به‌روزرسانی کنیم. تغییرات مهم از طریق ایمیل اطلاع داده
                می‌شود.
              </li>
              <li>
                <strong className="text-slate-200">انتقال:</strong> شما نمی‌توانید
                حقوق خود را بدون رضایت ما منتقل کنید.
              </li>
              <li>
                <strong className="text-slate-200">جدایی‌پذیری:</strong> اگر بخشی
                از این شرایط غیرقابل اجرا باشد، بقیه بخش‌ها معتبر باقی می‌مانند.
              </li>
              <li>
                <strong className="text-slate-200">صرف‌نظر:</strong> عدم اجرای
                حقوق ما به معنای صرف‌نظر از آن حقوق نیست.
              </li>
              <li>
                <strong className="text-slate-200">کل توافق:</strong> این شرایط کل
                توافق بین شما و کارانوا را تشکیل می‌دهد.
              </li>
            </ul>
          </LegalSection>

          {/* Contact Section */}
          <LegalSection
            id="contact"
            title="۱۳. تماس با ما"
            defaultOpen={false}
          >
            <p className="mb-4">
              برای سؤالات درباره این شرایط، لطفاً با ما تماس بگیرید:
            </p>
            <div className="space-y-2 text-slate-300">
              <p>
                <strong className="text-slate-200">ایمیل:</strong>{" "}
                <a href="mailto:legal@karanova.io" className="text-teal-400">
                  legal@karanova.io
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
          <VersionHistory versions={termsVersions} />
        </div>
      </div>
    </div>
  );
}
