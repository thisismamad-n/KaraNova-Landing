"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface OfficeMapProps {
  language: "en" | "fa";
}

export default function OfficeMap({ language }: OfficeMapProps) {
  const content = {
    fa: {
      title: "موقعیت دفتر",
      subtitle: "دفتر مرکزی کارانوا در تهران",
      address: "تهران، خیابان ولیعصر، پلاک ۱۲۳۴، طبقه ۵، واحد ۱۰",
      viewOnMap: "مشاهده در نقشه",
      getDirections: "مسیریابی",
    },
    en: {
      title: "Office Location",
      subtitle: "Karanova Head Office in Tehran",
      address: "Tehran, Valiasr Street, No. 1234, 5th Floor, Unit 10",
      viewOnMap: "View on Map",
      getDirections: "Get Directions",
    },
  };

  const currentContent = content[language];

  // Tehran coordinates (approximate Valiasr Street location)
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51843.34214147051!2d51.38826!3d35.6892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00491ff3dcd9%3A0xf0a77c2f4224458!2sValiasr%20St%2C%20Tehran%2C%20Iran!5e0!3m2!1sen!2s!4v1234567890";
  const directionsUrl = "https://www.google.com/maps/dir//Valiasr+St,+Tehran,+Iran";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-2">
          {currentContent.title}
        </h2>
        <p className="text-lg text-slate-400">{currentContent.subtitle}</p>
      </div>

      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={cn(
          "backdrop-blur-md bg-slate-900/30",
          "border border-slate-800/50",
          "rounded-2xl overflow-hidden",
          "shadow-[0_8px_32px_rgba(0,0,0,0.24)]"
        )}
      >
        {/* Address Bar */}
        <div className="p-6 border-b border-slate-800/50">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "flex-shrink-0",
                "inline-flex items-center justify-center",
                "w-12 h-12 rounded-lg",
                "bg-gradient-to-br from-teal-500/20 to-cyan-500/20",
                "border border-teal-500/30"
              )}
            >
              <MapPin className="w-6 h-6 text-teal-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-100 mb-1">
                {currentContent.subtitle}
              </h3>
              <p className="text-slate-400">{currentContent.address}</p>
            </div>
          </div>
        </div>

        {/* Embedded Map */}
        <div className="relative w-full h-[400px] bg-slate-900/50">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={currentContent.title}
            className="w-full h-full"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>

        {/* Action Buttons */}
        <div className="p-6 flex flex-col sm:flex-row gap-4">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex-1 flex items-center justify-center gap-2",
              "px-6 py-3 rounded-lg",
              "bg-gradient-to-r from-teal-500 to-cyan-500",
              "text-white font-semibold",
              "hover:from-teal-600 hover:to-cyan-600",
              "transition-all duration-300",
              "shadow-[0_0_20px_rgba(20,184,166,0.3)]",
              "hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]",
              "hover:scale-[1.02]"
            )}
          >
            <ExternalLink className="w-5 h-5" />
            {currentContent.getDirections}
          </a>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex-1 flex items-center justify-center gap-2",
              "px-6 py-3 rounded-lg",
              "backdrop-blur-md bg-slate-800/40",
              "border border-slate-700/50",
              "text-teal-400 font-semibold",
              "hover:bg-slate-800/60 hover:border-teal-500/50",
              "transition-all duration-300"
            )}
          >
            <MapPin className="w-5 h-5" />
            {currentContent.viewOnMap}
          </a>
        </div>
      </motion.div>
    </div>
  );
}
