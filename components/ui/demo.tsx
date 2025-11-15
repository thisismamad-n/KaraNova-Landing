import { FeatureSteps } from "@/components/blocks/feature-section"

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
    <FeatureSteps
      features={featuresFa}
      title="سفر کارانوا: از کسب‌وکار گره‌خورده تا اتاق فرمان شفاف"
      imageHeight="h-[460px] md:h-[500px] lg:h-[540px]"
      className="text-slate-100"
    />
  )
}
