import { Language } from "@/lib/translations";

export interface ApplicationFormContent {
  title: string;
  fullName: string;
  email: string;
  phone: string;
  linkedIn: string;
  portfolio: string;
  coverLetter: string;
  resume: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successMessage: string;
  placeholders: {
    fullName: string;
    email: string;
    phone: string;
    coverLetter: string;
    resume: string;
  };
  errors: {
    required: string;
    invalidEmail: string;
    invalidPhone: string;
    minLength: string;
    maxLength: string;
    fileRequired: string;
  };
}

export const formContent: Record<Language, ApplicationFormContent> = {
  en: {
    title: "Apply for this position",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    linkedIn: "LinkedIn Profile (Optional)",
    portfolio: "Portfolio URL (Optional)",
    coverLetter: "Cover Letter",
    resume: "Upload Resume",
    submit: "Submit Application",
    submitting: "Submitting...",
    successTitle: "Application Submitted!",
    successMessage:
      "Thank you for applying. We'll review your application and get back to you soon.",
    placeholders: {
      fullName: "Enter your full name",
      email: "Enter your email",
      phone: "Enter your phone",
      coverLetter: "Why are you a good fit for this position?",
      resume: "Upload PDF or Word file",
    },
    errors: {
      required: "This field is required",
      invalidEmail: "Please enter a valid email address",
      invalidPhone: "Please enter a valid phone number",
      minLength: "Must be at least {min} characters",
      maxLength: "Must be less than {max} characters",
      fileRequired: "Please upload your resume",
    },
  },
  fa: {
    title: "درخواست برای این موقعیت",
    fullName: "نام و نام خانوادگی",
    email: "آدرس ایمیل",
    phone: "شماره تلفن",
    linkedIn: "پروفایل لینکدین (اختیاری)",
    portfolio: "آدرس نمونه کارها (اختیاری)",
    coverLetter: "نامه انگیزه",
    resume: "بارگذاری رزومه",
    submit: "ارسال درخواست",
    submitting: "در حال ارسال...",
    successTitle: "درخواست ارسال شد!",
    successMessage:
      "از درخواست شما متشکریم. ما درخواست شما را بررسی کرده و به زودی با شما تماس خواهیم گرفت.",
    placeholders: {
      fullName: "نام کامل خود را وارد کنید",
      email: "ایمیل خود را وارد کنید",
      phone: "شماره تلفن خود را وارد کنید",
      coverLetter: "چرا برای این موقعیت مناسب هستید؟",
      resume: "فایل PDF یا Word را بارگذاری کنید",
    },
    errors: {
      required: "این فیلد الزامی است",
      invalidEmail: "لطفا یک آدرس ایمیل معتبر وارد کنید",
      invalidPhone: "لطفا یک شماره تلفن معتبر وارد کنید",
      minLength: "حداقل {min} کاراکتر باید باشد",
      maxLength: "حداکثر {max} کاراکتر مجاز است",
      fileRequired: "لطفا رزومه خود را بارگذاری کنید",
    },
  },
};
