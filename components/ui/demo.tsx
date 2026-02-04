import { FeatureSteps } from "@/components/ui/feature-section"
import { AnimatedPath } from "@/components/ui/animated-path"
import { SpiderChart } from "@/components/ui/spider-chart"
import { SlidePathDesigner } from "@/components/ui/slide-path-designer"

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
    <div className="relative overflow-visible">
      <SlidePathDesigner slideKey="landing-feature-steps" />
      {/* Animated Path - positioned absolutely behind content */}
      <AnimatedPath
        className="absolute top-[-96px] pointer-events-none z-0 opacity-100 scale-100 md:scale-100 left-[5%] md:left-[-14%] lg:left-[10%]"
        pathData={"M 353.00 0.00 C 310.50 63.83 108.83 271.17 98.00 383.00 C 87.17 494.83 161.33 551.50 288.00 671.00 C 414.67 790.50 763.00 1028.50 858.00 1100.00"}
        strokeWidth={14}
        viewBox="0 0 900 1120"
        svgWidth={900}
        svgHeight={1120}
        scrollOffset={["start 0.6", "end 0.1"]}
        progressRange={[0, 1]}
      />



      {/* Feature Steps Content */}
      <div className="relative z-10">
        <FeatureSteps
          features={featuresFa}
          title="سفر کارانوا: از کسب‌وکار گره‌خورده تا اتاق فرمان شفاف"
          imageHeight="h-[520px] md:h-[560px] lg:h-[600px]"
          renderCustomVisual={() => (
            <SpiderChart
              className="w-full h-full"
              metrics={[
                { label: "رشد درآمد", value: 82 },
                { label: "بهره‌وری", value: 70 },
                { label: "چابکی", value: 76 },
                { label: "تعامل تیمی", value: 64 },
                { label: "پایداری", value: 85 },
                { label: "نوآوری", value: 90 },
              ]}
            />
          )}
          className="text-slate-100"
        />
      </div>
    </div>
  )
}
