export interface DocArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  content: string;
  order: number;
  lastUpdated: Date;
  relatedArticles: string[];
  searchKeywords: string[];
}

export interface DocCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  icon?: string;
}

// Documentation categories
export const docCategories: DocCategory[] = [
  {
    id: "getting-started",
    name: "شروع کار",
    slug: "getting-started",
    description: "اصول اولیه پلتفرم کارانوا را یاد بگیرید",
    order: 1,
    icon: "🚀",
  },
  {
    id: "inova",
    name: "اینووا AI",
    slug: "inova",
    description: "مستندات هوش تجاری مصنوعی",
    order: 2,
    icon: "🤖",
  },
  {
    id: "taskease",
    name: "تسک‌ایز",
    slug: "taskease",
    description: "راهنماهای مدیریت پروژه",
    order: 3,
    icon: "📋",
  },
  {
    id: "biq",
    name: "داشبورد BIQ",
    slug: "biq",
    description: "تحلیل کسب‌وکار و شاخص‌های کلیدی",
    order: 4,
    icon: "📊",
  },
  {
    id: "integrations",
    name: "یکپارچه‌سازی‌ها",
    slug: "integrations",
    description: "اتصال به سرویس‌های شخص ثالث",
    order: 5,
    icon: "🔌",
  },
  {
    id: "advanced",
    name: "موضوعات پیشرفته",
    slug: "advanced",
    description: "ویژگی‌های پیشرفته و سفارشی‌سازی",
    order: 6,
    icon: "⚙️",
  },
];

// Sample documentation articles
export const docArticles: DocArticle[] = [
  {
    id: "intro",
    slug: "introduction",
    title: "معرفی کارانوا",
    category: "getting-started",
    content: `# معرفی کارانوا

به کارانوا خوش آمدید، پلتفرم مدیریت کسب‌وکار مبتنی بر هوش مصنوعی که برای تحول روش اداره کسب‌وکار شما طراحی شده است.

## کارانوا چیست؟

کارانوا یک پلتفرم جامع است که سه ماژول قدرتمند را ترکیب می‌کند:

- **اینووا**: هوش تجاری مصنوعی با عوامل تخصصی
- **تسک‌ایز**: مدیریت پروژه یکپارچه با هوش مصنوعی
- **BIQ**: داشبورد نظارت بر سلامت کسب‌وکار

## ویژگی‌های کلیدی

- کمک هوش مصنوعی ۲۴/۷
- همکاری در زمان واقعی
- تحلیل و گزارش‌دهی پیشرفته
- پشتیبانی چند زبانه (فارسی/انگلیسی)
- معماری ایمن و مقیاس‌پذیر

## شروع کار

برای شروع استفاده از کارانوا، این مراحل را دنبال کنید:

1. حساب کاربری خود را ایجاد کنید
2. سازمان خود را تنظیم کنید
3. اعضای تیم را دعوت کنید
4. اولین پروژه خود را شروع کنید

برای دستورالعمل‌های دقیق، [راهنمای شروع سریع](/resources/documentation/getting-started/quick-start) را ببینید.`,
    order: 1,
    lastUpdated: new Date("2024-01-15"),
    relatedArticles: ["quick-start", "account-setup"],
    searchKeywords: ["معرفی", "نمای کلی", "شروع کار", "اصول اولیه"],
  },
  {
    id: "quick-start",
    slug: "quick-start",
    title: "راهنمای شروع سریع",
    category: "getting-started",
    content: `# راهنمای شروع سریع

در چند دقیقه با کارانوا شروع کنید.

## مرحله ۱: ایجاد حساب کاربری

به [karanova.io](https://karanova.io) بروید و برای ایجاد حساب کاربری خود روی "شروع کنید" کلیک کنید.

## مرحله ۲: تنظیم سازمان خود

پس از ورود، از شما خواسته می‌شود سازمان خود را ایجاد کنید:

\`\`\`typescript
// مثال تنظیم سازمان
const organization = {
  name: "شرکت من",
  industry: "فناوری",
  size: "۱۰-۵۰ کارمند"
};
\`\`\`

## مرحله ۳: دعوت اعضای تیم

به تنظیمات > تیم بروید و همکاران خود را از طریق ایمیل دعوت کنید.

## مرحله ۴: ایجاد اولین پروژه

1. به ماژول تسک‌ایز بروید
2. روی "پروژه جدید" کلیک کنید
3. جزئیات پروژه را پر کنید
4. اعضای تیم را تخصیص دهید

## مراحل بعدی

- [ویژگی‌های اینووا AI](/resources/documentation/inova/overview) را کاوش کنید
- درباره [گردش‌های کاری تسک‌ایز](/resources/documentation/taskease/workflows) بیاموزید
- [داشبوردهای BIQ](/resources/documentation/biq/dashboards) را تنظیم کنید`,
    order: 2,
    lastUpdated: new Date("2024-01-20"),
    relatedArticles: ["intro", "account-setup", "inova-overview"],
    searchKeywords: ["شروع سریع", "آموزش", "تنظیم", "آغاز"],
  },
  {
    id: "account-setup",
    slug: "account-setup",
    title: "تنظیم حساب کاربری",
    category: "getting-started",
    content: `# تنظیم حساب کاربری

نحوه پیکربندی حساب کارانوا خود برای استفاده بهینه را بیاموزید.

## تنظیمات پروفایل

پروفایل خود را با موارد زیر سفارشی کنید:

- عکس پروفایل
- نام نمایشی
- اطلاعات تماس
- ترجیح زبان
- منطقه زمانی

## تنظیمات امنیتی

امنیت حساب خود را افزایش دهید:

- فعال‌سازی احراز هویت دو مرحله‌ای (2FA)
- تنظیم ایمیل پشتیبان
- بررسی جلسات فعال
- پیکربندی کلیدهای API

## ترجیحات اطلاع‌رسانی

کنترل نحوه دریافت به‌روزرسانی‌ها:

- اطلاع‌رسانی ایمیل
- اطلاع‌رسانی درون‌برنامه
- اطلاع‌رسانی پوش موبایل
- فرکانس اطلاع‌رسانی

## تنظیمات یکپارچه‌سازی

اتصال به سرویس‌های خارجی:

- یکپارچه‌سازی تقویم
- یکپارچه‌سازی ایمیل
- یکپارچه‌سازی Slack/Teams
- وب‌هوک‌های سفارشی`,
    order: 3,
    lastUpdated: new Date("2024-01-18"),
    relatedArticles: ["quick-start", "security-best-practices"],
    searchKeywords: ["حساب", "پروفایل", "تنظیمات", "پیکربندی"],
  },
  {
    id: "inova-overview",
    slug: "overview",
    title: "نمای کلی اینووا AI",
    category: "inova",
    content: `# نمای کلی اینووا AI

اینووا دستیار هوش تجاری مبتنی بر هوش مصنوعی شما است که دارای چهار عامل تخصصی است.

## چهار عامل هوش مصنوعی

### Vision AI
برنامه‌ریزی استراتژیک و تحلیل بازار

### Govern AI
انطباق و مدیریت ریسک

### Supply AI
بهینه‌سازی زنجیره تامین

### Creative AI
تولید محتوا و بازاریابی

## نحوه استفاده از اینووا

1. عامل هوش مصنوعی مناسب را انتخاب کنید
2. چالش کسب‌وکار خود را توضیح دهید
3. بینش‌های تولید شده توسط هوش مصنوعی را بررسی کنید
4. بر اساس توصیه‌ها اقدام کنید

## بهترین روش‌ها

- برای نتایج بهتر زمینه دقیقی ارائه دهید
- پیشنهادات هوش مصنوعی را بررسی و تایید کنید
- بینش‌های چندین عامل را ترکیب کنید
- نتایج را ردیابی کنید و تکرار کنید`,
    order: 1,
    lastUpdated: new Date("2024-01-22"),
    relatedArticles: ["vision-ai", "govern-ai", "supply-ai", "creative-ai"],
    searchKeywords: ["اینووا", "هوش مصنوعی", "هوش تجاری", "عوامل"],
  },
  {
    id: "taskease-workflows",
    slug: "workflows",
    title: "گردش‌های کاری تسک‌ایز",
    category: "taskease",
    content: `# گردش‌های کاری تسک‌ایز

مدیریت پروژه را با سیستم گردش کاری قدرتمند تسک‌ایز تسلط کنید.

## ایجاد گردش‌های کاری

گردش‌های کاری سفارشی برای پروژه‌های خود تعریف کنید:

\`\`\`typescript
const workflow = {
  name: "گردش کاری توسعه",
  stages: ["انتظار", "در حال انجام", "بررسی", "انجام شده"],
  automations: [
    {
      trigger: "تغییر وضعیت",
      action: "اطلاع تیم"
    }
  ]
};
\`\`\`

## الگوهای گردش کاری

از الگوهای از پیش ساخته شده انتخاب کنید:

- Agile/Scrum
- Kanban
- Waterfall
- سفارشی

## قوانین خودکارسازی

اقدامات خودکار را تنظیم کنید:

- انتقال وضعیت
- تخصیص وظایف
- اطلاع‌رسانی
- یادآوری مهلت

## ویژگی‌های همکاری

- به‌روزرسانی در زمان واقعی
- نظرات و اشاره‌ها
- پیوست‌های فایل
- خط زمانی فعالیت`,
    order: 1,
    lastUpdated: new Date("2024-01-25"),
    relatedArticles: ["taskease-overview", "project-templates"],
    searchKeywords: ["تسک‌ایز", "گردش کاری", "مدیریت پروژه", "خودکارسازی"],
  },
  {
    id: "biq-dashboards",
    slug: "dashboards",
    title: "داشبوردهای BIQ",
    category: "biq",
    content: `# داشبوردهای BIQ

سلامت کسب‌وکار خود را با داشبوردهای قابل سفارشی‌سازی نظارت کنید.

## انواع داشبورد

### داشبورد اجرایی
شاخص‌های کلیدی و معیارهای سطح بالا

### داشبورد مالی
درآمد، هزینه‌ها و سودآوری

### داشبورد عملیات
معیارهای کارایی و عملکرد

### داشبورد فروش
ردیابی خط لوله و تبدیل

## ایجاد داشبوردهای سفارشی

1. به ماژول BIQ بروید
2. روی "داشبورد جدید" کلیک کنید
3. ابزارک‌ها و نمودارها را اضافه کنید
4. منابع داده را پیکربندی کنید
5. بازه‌های تازه‌سازی را تنظیم کنید

## انواع ابزارک

- نمودارهای خطی
- نمودارهای میله‌ای
- نمودارهای دایره‌ای
- کارت‌های عددی
- جداول
- سنج‌ها

## اشتراک‌گذاری داشبوردها

- اشتراک‌گذاری با اعضای تیم
- صادرات به PDF
- برنامه‌ریزی گزارش‌های ایمیل
- تعبیه در ابزارهای خارجی`,
    order: 1,
    lastUpdated: new Date("2024-01-28"),
    relatedArticles: ["biq-overview", "kpi-tracking"],
    searchKeywords: ["بی‌آی‌کیو", "داشبورد", "تحلیل", "شاخص کلیدی", "معیار"],
  },
];

// Helper functions
export function getDocsByCategory(categorySlug: string): DocArticle[] {
  return docArticles
    .filter((doc) => doc.category === categorySlug)
    .sort((a, b) => a.order - b.order);
}

export function getDocBySlug(categorySlug: string, docSlug: string): DocArticle | undefined {
  return docArticles.find(
    (doc) => doc.category === categorySlug && doc.slug === docSlug
  );
}

export function searchDocs(query: string): DocArticle[] {
  const lowerQuery = query.toLowerCase();
  return docArticles.filter(
    (doc) =>
      doc.title.toLowerCase().includes(lowerQuery) ||
      doc.content.toLowerCase().includes(lowerQuery) ||
      doc.searchKeywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery))
  );
}

export function getRelatedDocs(docId: string): DocArticle[] {
  const doc = docArticles.find((d) => d.id === docId);
  if (!doc) return [];
  
  return docArticles.filter((d) => doc.relatedArticles.includes(d.id));
}
