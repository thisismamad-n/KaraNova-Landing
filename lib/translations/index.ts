export type Language = "en" | "fa";

export interface Translations {
  [key: string]: string | Translations;
}

// Translation structure for all pages
export const translations: Record<Language, Translations> = {
  en: {
    common: {
      readMore: "Read More",
      learnMore: "Learn More",
      getStarted: "Get Started",
      contactUs: "Contact Us",
      submit: "Submit",
      cancel: "Cancel",
      close: "Close",
      search: "Search",
      filter: "Filter",
      loading: "Loading...",
      error: "An error occurred",
      success: "Success!",
    },
    nav: {
      home: "Home",
      about: "About",
      careers: "Careers",
      products: "Products",
      resources: "Resources",
      support: "Support",
      contact: "Contact",
      legal: "Legal",
    },
    careers: {
      title: "Join Our Team",
      subtitle: "Build the future of AI-powered business management",
      culture: "Our Culture",
      benefits: "Benefits & Perks",
      openPositions: "Open Positions",
    },
    footer: {
      company: "Company",
      products: "Products",
      resources: "Resources",
      legal: "Legal",
      followUs: "Follow Us",
      allRightsReserved: "All rights reserved",
    },
  },
  fa: {
    common: {
      readMore: "بیشتر بخوانید",
      learnMore: "اطلاعات بیشتر",
      getStarted: "شروع کنید",
      contactUs: "تماس با ما",
      submit: "ارسال",
      cancel: "لغو",
      close: "بستن",
      search: "جستجو",
      filter: "فیلتر",
      loading: "در حال بارگذاری...",
      error: "خطایی رخ داد",
      success: "موفقیت‌آمیز!",
    },
    nav: {
      home: "خانه",
      about: "درباره ما",
      careers: "فرصت‌های شغلی",
      products: "محصولات",
      resources: "منابع",
      support: "پشتیبانی",
      contact: "تماس",
      legal: "قوانین",
    },
    careers: {
      title: "به تیم ما بپیوندید",
      subtitle: "آینده مدیریت کسب‌وکار مبتنی بر هوش مصنوعی را بسازید",
      culture: "فرهنگ ما",
      benefits: "مزایا و امکانات",
      openPositions: "موقعیت‌های شغلی باز",
    },
    footer: {
      company: "شرکت",
      products: "محصولات",
      resources: "منابع",
      legal: "قوانین",
      followUs: "ما را دنبال کنید",
      allRightsReserved: "تمامی حقوق محفوظ است",
    },
  },
};

// Helper function to get nested translation
export function getTranslation(
  lang: Language,
  key: string,
  fallback?: string
): string {
  const keys = key.split(".");
  let value: any = translations[lang];

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return fallback || key;
    }
  }

  return typeof value === "string" ? value : fallback || key;
}

// Hook-friendly translation function
export function createTranslator(lang: Language) {
  return (key: string, fallback?: string) => getTranslation(lang, key, fallback);
}
