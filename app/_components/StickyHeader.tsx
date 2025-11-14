"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardNav, { CardNavItem } from "./CardNav";

const StickyHeader: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setVisible(y > 850);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items: CardNavItem[] = [
    {
      label: "درباره کارانوا",
      bgColor: "rgba(13, 20, 32, 0.82)",
      textColor: "#e2e8f0",
      links: [
        { label: "معرفی شرکت", href: "/#about", ariaLabel: "معرفی کارانوا" },
        { label: "مسیرهای شغلی", href: "/#careers", ariaLabel: "فرصت‌های شغلی کارانوا" },
        { label: "تیم ما", href: "/#team", ariaLabel: "تیم کارانوا" },
      ],
    },
    {
      label: "راهکارها",
      bgColor: "rgba(13, 20, 32, 0.82)",
      textColor: "#e2e8f0",
      links: [
        { label: "مدیریت پروژه‌ها", href: "/#solutions", ariaLabel: "راهکار مدیریت پروژه کارانوا" },
        { label: "اتوماسیون هوشمند", href: "/#automation", ariaLabel: "اتوماسیون هوشمند کارانوا" },
        { label: "داشبورد تحلیلی", href: "/#analytics", ariaLabel: "داشبورد تحلیلی کارانوا" },
      ],
    },
    {
      label: "ارتباط با ما",
      bgColor: "rgba(13, 20, 32, 0.82)",
      textColor: "#e2e8f0",
      links: [
        { label: "ایمیل پشتیبانی", href: "mailto:hello@karanova.io", ariaLabel: "ارسال ایمیل به کارانوا" },
        { label: "تلگرام", href: "https://t.me/karanova", ariaLabel: "تلگرام کارانوا" },
        { label: "لینکدین", href: "https://linkedin.com/company/karanova", ariaLabel: "لینکدین کارانوا" },
      ],
    },
  ];

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ y: -80, opacity: 0, scale: 0.95 }}
          animate={{ 
            y: 0, 
            opacity: 1, 
            scale: 1,
            transition: {
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 0.3 }
            }
          }}
          exit={{ 
            y: -80, 
            opacity: 0, 
            scale: 0.95,
            transition: {
              duration: 0.35,
              ease: [0.4, 0, 1, 1]
            }
          }}
          className="fixed top-3 left-0 right-0 z-50"
        >
          <CardNav
            items={items}
            baseColor="rgba(2, 6, 23, 0.44)"
            menuColor="#e2e8f0"
            buttonBgColor="#14b8a6"
            buttonTextColor="#ffffff"
            ease="power3.out"
            className="text-slate-100"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyHeader;
