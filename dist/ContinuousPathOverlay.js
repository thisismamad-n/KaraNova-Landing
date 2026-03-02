// components/ui/ContinuousPathOverlay.tsx
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { debounce } from "@/lib/utils";
import { jsxDEV } from "react/jsx-dev-runtime";
"use client";
function ContinuousPathOverlay({
  startSectionId,
  endSectionId,
  pathData,
  gradientId = "continuous-path-gradient"
}) {
  const DESIGN_WIDTH = 1920;
  const [viewBox, setViewBox] = useState(`0 0 ${DESIGN_WIDTH} 3000`);
  const [scaledPathData, setScaledPathData] = useState(pathData);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const easedProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });
  const pathLength = useTransform(easedProgress, [0, 1], [0, 1]);
  const strokeDashoffset = useTransform(pathLength, (value) => 1 - value);
  useEffect(() => {
    const scalePathCoordinates = (path, scaleX) => {
      return path.replace(/([ML])\s*([\d.]+)\s+([\d.]+)|C\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/g, (match, cmd, x1, y1, cx1, cy1, cx2, cy2, x2, y2) => {
        if (cmd === "M" || cmd === "L") {
          const scaledX = parseFloat(x1) * scaleX;
          return `${cmd} ${scaledX.toFixed(2)} ${y1}`;
        } else {
          const scaledCx1 = parseFloat(cx1) * scaleX;
          const scaledCx2 = parseFloat(cx2) * scaleX;
          const scaledX2 = parseFloat(x2) * scaleX;
          return `C ${scaledCx1.toFixed(2)} ${cy1} ${scaledCx2.toFixed(2)} ${cy2} ${scaledX2.toFixed(2)} ${y2}`;
        }
      });
    };
    const updateViewBox = () => {
      const startEl = document.getElementById(startSectionId);
      const endEl = document.getElementById(endSectionId);
      if (startEl && endEl) {
        const startTop = startEl.offsetTop;
        const endBottom = endEl.offsetTop + endEl.offsetHeight;
        const totalHeight = endBottom - startTop;
        const currentWidth = window.innerWidth;
        const scaleX = currentWidth / DESIGN_WIDTH;
        setViewBox(`0 0 ${currentWidth} ${totalHeight}`);
        setScaledPathData(scalePathCoordinates(pathData, scaleX));
      }
    };
    updateViewBox();
    const handleResize = debounce(updateViewBox, 100);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, [startSectionId, endSectionId, pathData, DESIGN_WIDTH]);
  return /* @__PURE__ */ jsxDEV("div", {
    ref: containerRef,
    className: "pointer-events-none fixed inset-0 z-30",
    style: { height: "100vh" },
    children: /* @__PURE__ */ jsxDEV("svg", {
      className: "absolute inset-0 w-full h-full",
      viewBox,
      preserveAspectRatio: "xMidYMid slice",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsxDEV("defs", {
          children: [
            /* @__PURE__ */ jsxDEV("linearGradient", {
              id: gradientId,
              x1: "0",
              y1: "0",
              x2: "0",
              y2: "1",
              children: [
                /* @__PURE__ */ jsxDEV("stop", {
                  offset: "0%",
                  stopColor: "var(--landing-primary)"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsxDEV("stop", {
                  offset: "50%",
                  stopColor: "hsl(185, 85%, 70%)"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsxDEV("stop", {
                  offset: "100%",
                  stopColor: "var(--landing-accent)"
                }, undefined, false, undefined, this)
              ]
            }, undefined, true, undefined, this),
            /* @__PURE__ */ jsxDEV("filter", {
              id: "continuousPathOverlayGlow",
              x: "-50%",
              y: "-50%",
              width: "200%",
              height: "200%",
              children: [
                /* @__PURE__ */ jsxDEV("feGaussianBlur", {
                  in: "SourceAlpha",
                  stdDeviation: "9",
                  result: "blur1"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsxDEV("feFlood", {
                  floodColor: "rgba(20, 184, 166, 0.55)",
                  result: "color1"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsxDEV("feComposite", {
                  in: "color1",
                  in2: "blur1",
                  operator: "in",
                  result: "shadow1"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsxDEV("feGaussianBlur", {
                  in: "SourceAlpha",
                  stdDeviation: "21",
                  result: "blur2"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsxDEV("feFlood", {
                  floodColor: "rgba(20, 184, 166, 0.45)",
                  result: "color2"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsxDEV("feComposite", {
                  in: "color2",
                  in2: "blur2",
                  operator: "in",
                  result: "shadow2"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsxDEV("feGaussianBlur", {
                  in: "SourceAlpha",
                  stdDeviation: "32",
                  result: "blur3"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsxDEV("feFlood", {
                  floodColor: "rgba(14, 165, 233, 0.35)",
                  result: "color3"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsxDEV("feComposite", {
                  in: "color3",
                  in2: "blur3",
                  operator: "in",
                  result: "shadow3"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsxDEV("feMerge", {
                  children: [
                    /* @__PURE__ */ jsxDEV("feMergeNode", {
                      in: "shadow3"
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsxDEV("feMergeNode", {
                      in: "shadow2"
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsxDEV("feMergeNode", {
                      in: "shadow1"
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsxDEV("feMergeNode", {
                      in: "SourceGraphic"
                    }, undefined, false, undefined, this)
                  ]
                }, undefined, true, undefined, this)
              ]
            }, undefined, true, undefined, this)
          ]
        }, undefined, true, undefined, this),
        /* @__PURE__ */ jsxDEV(motion.path, {
          d: scaledPathData,
          stroke: `url(#${gradientId})`,
          strokeWidth: "12",
          vectorEffect: "non-scaling-stroke",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          fill: "none",
          style: {
            pathLength,
            strokeDashoffset,
            filter: "url(#continuousPathOverlayGlow)",
            strokeOpacity: 0.82,
            willChange: "stroke-dashoffset"
          }
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this)
  }, undefined, false, undefined, this);
}
export {
  ContinuousPathOverlay
};
