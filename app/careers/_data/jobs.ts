export type JobType = "full-time" | "part-time" | "contract" | "remote";
export type JobDepartment = "Engineering" | "Design" | "Marketing" | "Sales" | "Operations" | "Product";
export type JobLocation = "Mashhad" | "Remote" | "Hybrid";

export interface JobPosting {
  id: string;
  slug: string;
  title: string;
  department: JobDepartment;
  location: JobLocation;
  type: JobType;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedDate: Date;
  applicationUrl?: string;
}

// Mock job data
export const mockJobs: JobPosting[] = [
  {
    id: "1",
    slug: "senior-frontend-engineer",
    title: "مهندس فرانت‌اند ارشد",
    department: "Engineering",
    location: "Mashhad",
    type: "full-time",
    description:
      "ما به دنبال یک مهندس فرانت‌اند با تجربه هستیم تا به تیم ما بپیوندد و کمک کند تا نسل بعدی ابزارهای مدیریت کسب‌وکار مبتنی بر هوش مصنوعی را بسازیم.",
    requirements: [
      "5+ سال تجربه با React و TypeScript",
      "درک عمیق از معماری فرانت‌اند مدرن",
      "تجربه با Next.js و رندرینگ سمت سرور",
      "تسلط بر Tailwind CSS و طراحی واکنش‌پذیر",
      "تجربه با مدیریت وضعیت (Redux، Zustand و غیره)",
      "مهارت‌های قوی در حل مسائل و ارتباطات",
    ],
    responsibilities: [
      "ساخت و نگهداری کامپوننت‌های React با کیفیت بالا",
      "همکاری با طراحان برای پیاده‌سازی رابط‌های کاملا دقیق",
      "بهینه‌سازی عملکرد برنامه و تجربه کاربر",
      "نوشتن کد تمیز، قابل نگهداری و آزمایش‌شده",
      "راهنمایی توسعه‌دهندگان جوان و بررسی کد",
      "مشارکت در تصمیمات معماری و برنامه‌ریزی فنی",
    ],
    benefits: [
      "حقوق رقابتی و سهام",
      "ساعات کاری انعطاف‌پذیر",
      "بیمه سلامت",
      "بودجه یادگیری و توسعه",
      "دفتر مدرن در مشهد",
    ],
    postedDate: new Date("2024-01-15"),
  },
  {
    id: "2",
    slug: "ai-ml-engineer",
    title: "مهندس هوش مصنوعی و یادگیری ماشین",
    department: "Engineering",
    location: "Hybrid",
    type: "full-time",
    description:
      "به تیم هوش مصنوعی ما بپیوندید تا مدل‌های یادگیری ماشین پیشرفته‌ای توسعه دهید که پلتفرم هوش تجاری ما را تقویت می‌کند.",
    requirements: [
      "3+ سال تجربه در یادگیری ماشین و هوش مصنوعی",
      "مهارت‌های قوی برنامه‌نویسی Python",
      "تجربه با TensorFlow، PyTorch یا چارچوب‌های مشابه",
      "درک پردازش زبان طبیعی و بینایی کامپیوتری",
      "تجربه با پلتفرم‌های ابری (AWS، GCP یا Azure)",
      "پیش‌زمینه قوی در ریاضیات و آمار",
    ],
    responsibilities: [
      "طراحی و پیاده‌سازی مدل‌های یادگیری ماشین",
      "آموزش و بهینه‌سازی الگوریتم‌های هوش مصنوعی برای کاربردهای تجاری",
      "همکاری با تیم محصول برای شناسایی فرصت‌های هوش مصنوعی",
      "نظارت و بهبود عملکرد مدل در محیط تولید",
      "تحقیق و پیاده‌سازی تکنیک‌های یادگیری ماشین پیشرفته",
      "مستندسازی رویکردها و یافته‌های فنی",
    ],
    benefits: [
      "حقوق رقابتی و سهام",
      "ترتیب کاری ترکیبی",
      "دسترسی به آخرین ابزارهای هوش مصنوعی و منابع",
      "بودجه کنفرانس و مقالات تحقیقی",
      "محیط تحقیقی همکاری‌انگیز",
    ],
    postedDate: new Date("2024-01-20"),
  },
  {
    id: "3",
    slug: "product-designer",
    title: "طراح محصول",
    department: "Design",
    location: "Mashhad",
    type: "full-time",
    description:
      "ما به دنبال یک طراح محصول با استعداد هستیم تا تجربیات زیبا و شهودی برای پلتفرم مبتنی بر هوش مصنوعی ما ایجاد کند.",
    requirements: [
      "4+ سال تجربه در طراحی محصول",
      "نمونه‌کار قوی که مهارت‌های UX/UI را نشان دهد",
      "تسلط بر Figma و سیستم‌های طراحی",
      "تجربه در طراحی برنامه‌های B2B پیچیده",
      "درک تحقیق کاربر و آزمایش قابلیت استفاده",
      "مهارت‌های عالی در ارتباطات و همکاری",
    ],
    responsibilities: [
      "طراحی رابط‌های کاربری برای برنامه‌های وب و موبایل",
      "ایجاد و نگهداری سیستم‌های طراحی و کتابخانه‌های کامپوننت",
      "انجام تحقیق کاربر و آزمایش قابلیت استفاده",
      "همکاری با مهندسان برای اطمینان از کیفیت طراحی",
      "ایجاد نمونه‌های اولیه و طرح‌های تعاملی",
      "ارائه مفاهیم طراحی به ذی‌نفعان",
    ],
    benefits: [
      "حقوق رقابتی",
      "محیط خلاق و همکاری‌انگیز",
      "آخرین ابزارهای طراحی و نرم‌افزار",
      "فرصت‌های توسعه حرفه‌ای",
      "ساعات کاری انعطاف‌پذیر",
    ],
    postedDate: new Date("2024-01-10"),
  },
  {
    id: "4",
    slug: "backend-engineer",
    title: "مهندس بک‌اند",
    department: "Engineering",
    location: "Remote",
    type: "full-time",
    description:
      "سیستم‌های بک‌اند مقیاس‌پذیری بسازید که پلتفرم مدیریت کسب‌وکار مبتنی بر هوش مصنوعی ما را تقویت می‌کند.",
    requirements: [
      "4+ سال تجربه در توسعه بک‌اند",
      "دانش قوی از Node.js یا Python",
      "تجربه با PostgreSQL و Redis",
      "درک معماری میکروسرویس‌ها",
      "تجربه با Docker و Kubernetes",
      "دانش طراحی API و سرویس‌های RESTful",
    ],
    responsibilities: [
      "طراحی و پیاده‌سازی سرویس‌های بک‌اند مقیاس‌پذیر",
      "ساخت و نگهداری API‌های RESTful",
      "بهینه‌سازی پرس‌وجوهای پایگاه داده و عملکرد",
      "پیاده‌سازی بهترین شیوه‌های امنیتی",
      "نوشتن آزمایش‌های جامع و مستندات",
      "همکاری با تیم فرانت‌اند در قرارداد API",
    ],
    benefits: [
      "حقوق رقابتی و سهام",
      "موقعیت کاملا دورکاری",
      "ساعات کاری انعطاف‌پذیر",
      "بیمه سلامت",
      "بودجه یادگیری",
    ],
    postedDate: new Date("2024-01-25"),
  },
  {
    id: "5",
    slug: "marketing-manager",
    title: "مدیر بازاریابی",
    department: "Marketing",
    location: "Mashhad",
    type: "full-time",
    description:
      "تلاش‌های بازاریابی ما را رهبری کنید تا حضور کارانوا در بازار ایران و فراتر از آن را افزایش دهید.",
    requirements: [
      "5+ سال تجربه بازاریابی در صنعت فناوری",
      "درک قوی از کانال‌های بازاریابی دیجیتال",
      "تجربه با بازاریابی محتوا و بهینه‌سازی موتور جستجو",
      "مهارت‌های عالی در نوشتن فارسی و انگلیسی",
      "رویکرد مبتنی بر داده برای تصمیمات بازاریابی",
      "تجربه با ابزارهای اتوماسیون بازاریابی",
    ],
    responsibilities: [
      "توسعه و اجرای استراتژی‌های بازاریابی",
      "مدیریت ایجاد و توزیع محتوا",
      "نظارت بر تعامل رسانه‌های اجتماعی و جامعه",
      "تجزیه و تحلیل معیارهای بازاریابی و بازگشت سرمایه",
      "هماهنگی با تیم فروش برای تولید سرنخ",
      "مدیریت بودجه و کمپین‌های بازاریابی",
    ],
    benefits: [
      "حقوق رقابتی",
      "آزادی خلاقانه و استقلال",
      "ابزارهای بازاریابی و منابع",
      "بودجه توسعه حرفه‌ای",
      "محیط تیم همکاری‌انگیز",
    ],
    postedDate: new Date("2024-01-18"),
  },
  {
    id: "6",
    slug: "devops-engineer",
    title: "مهندس DevOps",
    department: "Engineering",
    location: "Hybrid",
    type: "full-time",
    description:
      "کمک کنید تا زیرساخت قوی برای پلتفرم رو به رشد ما بسازیم و نگهداری کنیم.",
    requirements: [
      "3+ سال تجربه DevOps",
      "دانش قوی از AWS یا GCP",
      "تجربه با Kubernetes و Docker",
      "تسلط بر Infrastructure as Code (Terraform، CloudFormation)",
      "درک خط‌لوله‌های CI/CD",
      "مهارت‌های قوی در اسکریپت‌نویسی (Bash، Python)",
    ],
    responsibilities: [
      "مدیریت زیرساخت ابری و استقرار",
      "پیاده‌سازی و نگهداری خط‌لوله‌های CI/CD",
      "نظارت بر عملکرد و قابلیت اطمینان سیستم",
      "خودکارسازی وظایف و فرآیندهای عملیاتی",
      "اطمینان از استانداردهای امنیتی و انطباق",
      "همکاری با تیم‌های توسعه در نیازهای زیرساخت",
    ],
    benefits: [
      "حقوق رقابتی و سهام",
      "ترتیب کاری ترکیبی",
      "آخرین ابزارهای DevOps و پلتفرم‌ها",
      "بودجه گواهینامه و آموزش",
      "جبران خدمات در دسترس",
    ],
    postedDate: new Date("2024-01-22"),
  },
];

// Bilingual job content
export const jobTranslations = {
  en: {
    departments: {
      Engineering: "Engineering",
      Design: "Design",
      Marketing: "Marketing",
      Sales: "Sales",
      Operations: "Operations",
      Product: "Product",
    },
    locations: {
      Mashhad: "Mashhad",
      Remote: "Remote",
      Hybrid: "Hybrid",
    },
    types: {
      "full-time": "Full-time",
      "part-time": "Part-time",
      contract: "Contract",
      remote: "Remote",
    },
    labels: {
      openPositions: "Open Positions",
      filterBy: "Filter by",
      department: "Department",
      location: "Location",
      type: "Type",
      allDepartments: "All Departments",
      allLocations: "All Locations",
      allTypes: "All Types",
      apply: "Apply Now",
      viewDetails: "View Details",
      postedOn: "Posted on",
      requirements: "Requirements",
      responsibilities: "Responsibilities",
      benefits: "Benefits",
      noJobs: "No positions available at the moment",
      checkBackSoon: "Check back soon for new opportunities",
    },
  },
  fa: {
    departments: {
      Engineering: "مهندسی",
      Design: "طراحی",
      Marketing: "بازاریابی",
      Sales: "فروش",
      Operations: "عملیات",
      Product: "محصول",
    },
    locations: {
      Mashhad: "مشهد",
      Remote: "دورکاری",
      Hybrid: "ترکیبی",
    },
    types: {
      "full-time": "تمام‌وقت",
      "part-time": "پاره‌وقت",
      contract: "قراردادی",
      remote: "دورکاری",
    },
    labels: {
      openPositions: "موقعیت‌های شغلی باز",
      filterBy: "فیلتر بر اساس",
      department: "بخش",
      location: "موقعیت",
      type: "نوع",
      allDepartments: "همه بخش‌ها",
      allLocations: "همه موقعیت‌ها",
      allTypes: "همه انواع",
      apply: "درخواست",
      viewDetails: "مشاهده جزئیات",
      postedOn: "تاریخ انتشار",
      requirements: "الزامات",
      responsibilities: "مسئولیت‌ها",
      benefits: "مزایا",
      noJobs: "در حال حاضر موقعیت شغلی موجود نیست",
      checkBackSoon: "به زودی برای فرصت‌های جدید مراجعه کنید",
    },
  },
};
