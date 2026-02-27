// app/_components/CardNav.tsx
import { useLayoutEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import defaultLogo from "../../public/logo.png";
import { jsxDEV } from "react/jsx-dev-runtime";
"use client";
var CardNav = ({
  logo = defaultLogo,
  logoAlt = "KaraNovaa",
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor,
  buttonBgColor,
  buttonTextColor
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl)
      return 320;
    const contentEl = navEl.querySelector(".card-nav-content");
    if (contentEl) {
      const wasVisible = contentEl.style.visibility;
      const wasPointerEvents = contentEl.style.pointerEvents;
      const wasPosition = contentEl.style.position;
      const wasHeight = contentEl.style.height;
      contentEl.style.visibility = "visible";
      contentEl.style.pointerEvents = "auto";
      contentEl.style.position = "static";
      contentEl.style.height = "auto";
      contentEl.offsetHeight;
      const topBar = 64;
      const contentHeight = contentEl.scrollHeight;
      contentEl.style.visibility = wasVisible;
      contentEl.style.pointerEvents = wasPointerEvents;
      contentEl.style.position = wasPosition;
      contentEl.style.height = wasHeight;
      return topBar + contentHeight;
    }
    return 320;
  };
  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl)
      return null;
    gsap.set(navEl, { height: 64, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 15, opacity: 0, scale: 0.96 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.5,
      ease: "power3.inOut"
    });
    tl.to(cardsRef.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.45,
      ease: "power2.out",
      stagger: 0.06
    }, "-=0.3");
    return tl;
  }, []);
  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [items, createTimeline]);
  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current)
        return;
      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded, createTimeline]);
  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl)
      return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Escape" && isExpanded) {
      toggleMenu();
    }
  };
  const setCardRef = (i) => (el) => {
    if (el)
      cardsRef.current[i] = el;
  };
  return /* @__PURE__ */ jsxDEV("div", {
    className: `card-nav-container ${className}`,
    children: /* @__PURE__ */ jsxDEV("nav", {
      ref: navRef,
      className: `card-nav ${isExpanded ? "open" : ""}`,
      style: { backgroundColor: baseColor },
      children: [
        /* @__PURE__ */ jsxDEV("div", {
          className: "card-nav-top",
          children: [
            /* @__PURE__ */ jsxDEV("button", {
              type: "button",
              className: `hamburger-menu ${isHamburgerOpen ? "open" : ""}`,
              onClick: toggleMenu,
              onKeyDown: handleKeyDown,
              "aria-label": isExpanded ? "بستن منوی ناوبری" : "باز کردن منوی ناوبری",
              "aria-expanded": isExpanded,
              style: { color: menuColor || "#000", background: "transparent", border: "none", padding: 0 },
              children: [
                /* @__PURE__ */ jsxDEV("div", {
                  className: "hamburger-line"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsxDEV("div", {
                  className: "hamburger-line"
                }, undefined, false, undefined, this)
              ]
            }, undefined, true, undefined, this),
            /* @__PURE__ */ jsxDEV("div", {
              className: "logo-container",
              children: /* @__PURE__ */ jsxDEV(Link, {
                href: "/",
                "aria-label": "صفحه اصلی کارانوا",
                children: typeof logo === "string" ? /* @__PURE__ */ jsxDEV("img", {
                  src: logo,
                  alt: logoAlt,
                  className: "logo"
                }, undefined, false, undefined, this) : /* @__PURE__ */ jsxDEV(Image, {
                  src: logo,
                  alt: logoAlt,
                  className: "logo",
                  priority: true
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this)
            }, undefined, false, undefined, this),
            /* @__PURE__ */ jsxDEV("a", {
              href: "https://app.karanovaa.com",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "card-nav-cta-button inline-flex items-center justify-center",
              "aria-label": "شروع کنید - ورود به صفحه آنبوردینگ (در تب جدید باز می‌شود)",
              children: "شروع کنید"
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this),
        /* @__PURE__ */ jsxDEV("div", {
          className: "card-nav-content",
          "aria-hidden": !isExpanded,
          children: (items || []).slice(0, 3).map((item, idx) => /* @__PURE__ */ jsxDEV("div", {
            className: "nav-card",
            ref: setCardRef(idx),
            style: { background: item.bgColor, color: item.textColor },
            children: [
              /* @__PURE__ */ jsxDEV("div", {
                className: "nav-card-label",
                children: item.label
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsxDEV("div", {
                className: "nav-card-links",
                children: item.links?.map((lnk, i) => {
                  const isExternal = lnk.href.startsWith("http") || lnk.href.startsWith("mailto:");
                  if (isExternal) {
                    return /* @__PURE__ */ jsxDEV("a", {
                      className: "nav-card-link",
                      href: lnk.href,
                      "aria-label": lnk.ariaLabel,
                      target: lnk.href.startsWith("http") ? "_blank" : undefined,
                      rel: lnk.href.startsWith("http") ? "noopener noreferrer" : undefined,
                      children: [
                        /* @__PURE__ */ jsxDEV(GoArrowUpRight, {
                          className: "nav-card-link-icon",
                          "aria-hidden": "true"
                        }, undefined, false, undefined, this),
                        lnk.label
                      ]
                    }, `${lnk.label}-${i}`, true, undefined, this);
                  }
                  return /* @__PURE__ */ jsxDEV(Link, {
                    className: "nav-card-link",
                    href: lnk.href,
                    "aria-label": lnk.ariaLabel,
                    children: [
                      /* @__PURE__ */ jsxDEV(GoArrowUpRight, {
                        className: "nav-card-link-icon",
                        "aria-hidden": "true"
                      }, undefined, false, undefined, this),
                      lnk.label
                    ]
                  }, `${lnk.label}-${i}`, true, undefined, this);
                })
              }, undefined, false, undefined, this)
            ]
          }, `${item.label}-${idx}`, true, undefined, this))
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this)
  }, undefined, false, undefined, this);
};
var CardNav_default = CardNav;
export {
  CardNav_default as default
};
