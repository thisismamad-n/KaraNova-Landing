export type BlogCategory = "محصول" | "بینش‌های صنعتی" | "آموزش‌ها" | "اخبار شرکت" | "Product Updates" | "Industry Insights" | "Tutorials" | "Company News";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  author: {
    name: string;
    nameEn: string;
    avatar?: string;
    bio?: string;
    bioEn?: string;
  };
  publishedDate: Date;
  updatedDate?: Date;
  category: BlogCategory;
  tags: string[];
  tagsEn: string[];
  featuredImage?: string;
  readTime: number; // minutes
}

// Mock blog data
export const mockBlogs: BlogPost[] = [
  {
    id: "1",
    slug: "ai-business-intelligence-future",
    title: "هوش مصنوعی و آینده هوش تجاری",
    titleEn: "AI and the Future of Business Intelligence",
    excerpt: "کاوش کنید که چگونه هوش مصنوعی تجارت را تغییر می‌دهد و شرکت‌ها چگونه می‌توانند از آن بهره‌برداری کنند.",
    excerptEn: "Explore how artificial intelligence is transforming business and how companies can leverage it for competitive advantage.",
    content: `هوش مصنوعی دیگر یک فناوری آینده‌نگر نیست - این حال و الآن است. شرکت‌های پیشرو در سراسر جهان از هوش مصنوعی برای تحول دیجیتال و بهبود کارایی استفاده می‌کنند.

در این مقاله، ما بررسی می‌کنیم که چگونه هوش مصنوعی می‌تواند:
- تصمیم‌گیری را بهتر کند
- فرآیندهای تجاری را خودکار کند
- تجربه مشتری را بهبود بخشد
- رشد درآمد را تسریع کند

کارانوا با ماژول‌های Inova، TaskEase و BIQ، شرکت‌ها را قادر می‌سازد تا از قدرت هوش مصنوعی برای مدیریت بهتر کسب‌وکار خود استفاده کنند.`,
    contentEn: `Artificial intelligence is no longer a future technology - it's here and now. Leading companies around the world are using AI to drive digital transformation and improve efficiency.

In this article, we explore how artificial intelligence can:
- Improve decision-making
- Automate business processes
- Enhance customer experience
- Accelerate revenue growth

Karanova, with its Inova, TaskEase, and BIQ modules, empowers companies to leverage the power of AI for better business management.`,
    author: {
      name: "محمد نجار",
      nameEn: "Mohammad Najar",
      bio: "مدیر محصول در کارانوا",
      bioEn: "Product Manager at Karanova",
    },
    publishedDate: new Date("2024-01-25"),
    category: "بینش‌های صنعتی",
    tags: ["هوش مصنوعی", "تجارت", "فناوری"],
    tagsEn: ["AI", "Business", "Technology"],
    readTime: 5,
  },
  {
    id: "2",
    slug: "project-management-best-practices",
    title: "بهترین روش‌های مدیریت پروژه",
    titleEn: "Project Management Best Practices",
    excerpt: "یاد بگیرید که چگونه پروژه‌های خود را به‌طور موثر مدیریت کنید و تیم‌های خود را سازمان‌دهی کنید.",
    excerptEn: "Learn how to effectively manage your projects and organize your teams for maximum productivity.",
    content: `مدیریت پروژه یکی از مهم‌ترین مهارت‌های رهبری است. پروژه‌های موفق نیاز به برنامه‌ریزی دقیق، ارتباط واضح و اجرای مؤثر دارند.

در این راهنما، ما بررسی می‌کنیم:
- نحوه تعریف اهداف واضح
- تقسیم کار به وظایف قابل مدیریت
- ایجاد جدول زمانی واقع‌بینانه
- نظارت بر پیشرفت و تطبیق
- مدیریت ریسک‌ها

TaskEase از کارانوا ابزارهایی فراهم می‌کند که مدیریت پروژه را ساده‌تر و موثرتر می‌کند.`,
    contentEn: `Project management is one of the most important leadership skills. Successful projects require careful planning, clear communication, and effective execution.

In this guide, we explore:
- How to define clear objectives
- Breaking work into manageable tasks
- Creating realistic timelines
- Monitoring progress and adapting
- Managing risks

TaskEase from Karanova provides tools that make project management simpler and more effective.`,
    author: {
      name: "محمد نجار",
      nameEn: "Mohammad Najar",
      bio: "مشاور مدیریت پروژه",
      bioEn: "Project Management Consultant",
    },
    publishedDate: new Date("2024-01-20"),
    category: "آموزش‌ها",
    tags: ["مدیریت پروژه", "تیم‌کاری", "بهره‌وری"],
    tagsEn: ["Project Management", "Teamwork", "Productivity"],
    readTime: 7,
  },
  {
    id: "3",
    slug: "karanova-v2-launch",
    title: "کارانوا نسخه 2 منتشر شد",
    titleEn: "Karanova Version 2 Released",
    excerpt: "ما با افتخار اعلام می‌کنیم که نسخه 2 کارانوا با ویژگی‌های جدید و بهبودهای عملکردی منتشر شده است.",
    excerptEn: "We are proud to announce the release of Karanova Version 2 with new features and performance improvements.",
    content: `ما خوشحال هستیم که نسخه 2 کارانوا را معرفی کنیم. این نسخه شامل:

ویژگی‌های جدید:
- داشبورد بهبود‌یافته با تجسم‌های بهتر
- ادغام هوش مصنوعی پیشرفته‌تر
- رابط کاربری بازطراحی‌شده
- عملکرد بهتر و سرعت بیشتر

بهبودهای امنیتی:
- رمزگذاری بهتر
- احراز هویت دو‌مرحله‌ای
- کنترل دسترسی بهبود‌یافته

ما از بازخورد کاربران خود سپاسگزاریم که این نسخه را ممکن کرده‌اند.`,
    contentEn: `We are excited to introduce Karanova Version 2. This release includes:

New Features:
- Enhanced dashboard with better visualizations
- More advanced AI integration
- Redesigned user interface
- Better performance and faster speeds

Security Improvements:
- Enhanced encryption
- Two-factor authentication
- Improved access controls

We thank our users for their feedback that made this release possible.`,
    author: {
      name: "محمد نجار",
      nameEn: "Mohammad Najar",
      bio: "مدیر عمومی کارانوا",
      bioEn: "CEO of Karanova",
    },
    publishedDate: new Date("2024-01-15"),
    category: "اخبار شرکت",
    tags: ["اعلان", "نسخه جدید", "بهبودها"],
    tagsEn: ["Announcement", "New Release", "Updates"],
    readTime: 4,
  },
  {
    id: "4",
    slug: "data-driven-decision-making",
    title: "تصمیم‌گیری مبتنی بر داده",
    titleEn: "Data-Driven Decision Making",
    excerpt: "چگونه داده‌ها می‌توانند به شما کمک کنند بهتر تصمیم بگیرید و کسب‌وکار خود را رشد دهید.",
    excerptEn: "How data can help you make better decisions and grow your business.",
    content: `در عصر دیجیتال، داده‌ها طلای سیاه هستند. شرکت‌های موفق داده‌های خود را تحلیل می‌کنند و از آن برای تصمیم‌گیری استفاده می‌کنند.

BIQ از کارانوا ابزارهایی فراهم می‌کند که:
- داده‌های پیچیده را تجسم می‌کند
- الگوهای مهم را شناسایی می‌کند
- پیش‌بینی‌های دقیق ارائه می‌دهد
- تصمیم‌گیری را سریع‌تر می‌کند

با استفاده از داده‌های صحیح، می‌توانید:
- ریسک‌ها را کاهش دهید
- فرصت‌ها را شناسایی کنید
- رشد را تسریع کنید`,
    contentEn: `In the digital age, data is the new gold. Successful companies analyze their data and use it to make decisions.

BIQ from Karanova provides tools that:
- Visualize complex data
- Identify important patterns
- Provide accurate predictions
- Speed up decision-making

With the right data, you can:
- Reduce risks
- Identify opportunities
- Accelerate growth`,
    author: {
      name: "محمد نجار",
      nameEn: "Mohammad Najar",
      bio: "تحلیلگر داده",
      bioEn: "Data Analyst",
    },
    publishedDate: new Date("2024-01-10"),
    category: "بینش‌های صنعتی",
    tags: ["داده", "تجزیه‌وتحلیل", "تصمیم‌گیری"],
    tagsEn: ["Data", "Analytics", "Decision Making"],
    readTime: 6,
  },
  {
    id: "5",
    slug: "remote-team-collaboration",
    title: "همکاری تیم‌های دورکار",
    titleEn: "Remote Team Collaboration",
    excerpt: "نکات عملی برای ایجاد یک تیم دورکار موثر و حفظ ارتباط قوی.",
    excerptEn: "Practical tips for building an effective remote team and maintaining strong communication.",
    content: `کار دورکاری اکنون بخشی از واقعیت کسب‌وکار است. اما چگونه می‌توانیم اطمینان حاصل کنیم که تیم‌های دورکار به‌طور موثر کار می‌کنند؟

نکات کلیدی:
- ابزارهای مناسب انتخاب کنید
- ارتباط واضح برقرار کنید
- اهداف روشن تعیین کنید
- اعتماد بسازید
- فرهنگ شرکتی را حفظ کنید

TaskEase از کارانوا برای تیم‌های دورکار طراحی شده است و:
- ارتباط را آسان می‌کند
- کار را سازمان‌دهی می‌کند
- پیشرفت را نظارت می‌کند`,
    contentEn: `Remote work is now part of business reality. But how can we ensure that remote teams work effectively?

Key points:
- Choose the right tools
- Establish clear communication
- Set clear goals
- Build trust
- Maintain company culture

TaskEase from Karanova is designed for remote teams and:
- Makes communication easier
- Organizes work
- Monitors progress`,
    author: {
      name: "محمد نجار",
      nameEn: "Mohammad Najar",
      bio: "متخصص منابع انسانی",
      bioEn: "HR Specialist",
    },
    publishedDate: new Date("2024-01-05"),
    category: "آموزش‌ها",
    tags: ["دورکاری", "تیم‌کاری", "ارتباط"],
    tagsEn: ["Remote Work", "Teamwork", "Communication"],
    readTime: 5,
  },
];

// Bilingual blog content
export const blogTranslations = {
  en: {
    categories: {
      "محصول": "Product",
      "بینش‌های صنعتی": "Industry Insights",
      "آموزش‌ها": "Tutorials",
      "اخبار شرکت": "Company News",
      "Product Updates": "Product Updates",
      "Industry Insights": "Industry Insights",
      "Tutorials": "Tutorials",
      "Company News": "Company News",
    },
    labels: {
      blog: "Blog",
      latestArticles: "Latest Articles",
      filterBy: "Filter by",
      category: "Category",
      allCategories: "All Categories",
      readMore: "Read More",
      readTime: "min read",
      publishedOn: "Published on",
      author: "Author",
      relatedArticles: "Related Articles",
      shareArticle: "Share Article",
      noBlog: "No articles available at the moment",
      checkBackSoon: "Check back soon for new articles",
      previousPost: "Previous Post",
      nextPost: "Next Post",
      backToBlog: "Back to Blog",
    },
  },
  fa: {
    categories: {
      "محصول": "محصول",
      "بینش‌های صنعتی": "بینش‌های صنعتی",
      "آموزش‌ها": "آموزش‌ها",
      "اخبار شرکت": "اخبار شرکت",
      "Product Updates": "بروزرسانی‌های محصول",
      "Industry Insights": "بینش‌های صنعتی",
      "Tutorials": "آموزش‌ها",
      "Company News": "اخبار شرکت",
    },
    labels: {
      blog: "وبلاگ",
      latestArticles: "آخرین مقالات",
      filterBy: "فیلتر بر اساس",
      category: "دسته‌بندی",
      allCategories: "همه دسته‌بندی‌ها",
      readMore: "ادامه مطلب",
      readTime: "دقیقه مطالعه",
      publishedOn: "تاریخ انتشار",
      author: "نویسنده",
      relatedArticles: "مقالات مرتبط",
      shareArticle: "اشتراک‌گذاری مقاله",
      noBlog: "در حال حاضر مقاله‌ای موجود نیست",
      checkBackSoon: "به زودی برای مقالات جدید مراجعه کنید",
      previousPost: "مقاله قبلی",
      nextPost: "مقاله بعدی",
      backToBlog: "بازگشت به وبلاگ",
    },
  },
};
