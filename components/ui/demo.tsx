import { FeatureSteps } from "@/components/ui/feature-section"
import { AnimatedPath } from "@/components/ui/animated-path"

const featuresFa = [
  {
    step: "گام ۱",
    title: "دید ۳۶۰ درجه با اینووا",
    content:
      "چهار عامل هوشمند اینووا (ویژن، گاورن، ساپلای و کریتیو) بازار، قوانین و زنجیره تأمین شما را پایش می‌کنند تا فرصت‌ها و ریسک‌ها را زودتر ببینید.",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80",
  },
  {
    step: "گام ۲",
    title: "تبدیل بینش به عمل با تسک‌ایز",
    content:
      "سازمان، تیم‌ها، پروژه‌ها و تسک‌ها را در یک فضای یکپارچه می‌چینید؛ با اسپرینت‌ها، وابستگی‌ها و کانبان که با کمک هوش مصنوعی همیشه هم‌راستا می‌مانند.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    step: "گام ۳",
    title: "پایش سلامت کسب‌وکار با بی‌آی‌کیو",
    content:
      "شاخص‌های سلامت کسب‌وکار، سنجه‌های عملکرد و نبض تیم را در یک داشبورد واحد می‌بینید تا هر تصمیم بر پایه داده و تصویر کلی باشد.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
]

interface FeatureStepsDemoProps {
  language: "en" | "fa"
}

export function FeatureStepsDemo({ language }: FeatureStepsDemoProps) {
  return (
    <div className="relative">
      {/* Animated Path - positioned absolutely behind content */}
      <AnimatedPath
        className="absolute left-1/2 top-20 -translate-x-1/2 pointer-events-none z-0 opacity-15 scale-75 md:scale-90"
        pathData="M 298.00 14.00 C 250 80 180 180 125.00 248.00 C 120 300 122 500 128.00 618.00 C 180 700 280 780 356.00 836.00"
        strokeWidth={12}
        viewBox="0 0 400 900"
        svgWidth={400}
        svgHeight={900}
        scrollOffset={["start 0.7", "end 0.2"]}
        progressRange={[0, 1]}
      />

      {/* Feature Steps Content */}
      <div className="relative z-10">
        <FeatureSteps
          features={featuresFa}
          title="سفر کارانوا: از کسب‌وکار گره‌خورده تا اتاق فرمان شفاف"
          imageHeight="h-[460px] md:h-[500px] lg:h-[540px]"
          className="text-slate-100"
        />
      </div>
    </div>
  )
}
