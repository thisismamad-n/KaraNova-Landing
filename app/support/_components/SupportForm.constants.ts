export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: "low" | "medium" | "high";
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const content = {
  fa: {
    title: "فرم پشتیبانی",
    subtitle: "برای ارسال درخواست پشتیبانی فرم زیر را تکمیل کنید",
    fields: {
      name: "نام و نام خانوادگی",
      email: "ایمیل",
      subject: "موضوع",
      message: "پیام",
      priority: "اولویت",
    },
    priorities: {
      low: "کم",
      medium: "متوسط",
      high: "زیاد",
    },
    placeholders: {
      name: "نام خود را وارد کنید",
      email: "example@email.com",
      subject: "موضوع درخواست خود را بنویسید",
      message: "توضیحات کامل مشکل یا سوال خود را بنویسید...",
    },
    submit: "ارسال درخواست",
    submitting: "در حال ارسال...",
    success: "درخواست شما با موفقیت ارسال شد!",
    successMessage: "تیم پشتیبانی ما در اسرع وقت با شما تماس خواهند گرفت.",
    error: "خطا در ارسال درخواست",
    errorMessage: "لطفاً دوباره تلاش کنید یا با ما تماس بگیرید.",
    validation: {
      nameRequired: "نام الزامی است",
      emailRequired: "ایمیل الزامی است",
      emailInvalid: "ایمیل معتبر نیست",
      subjectRequired: "موضوع الزامی است",
      messageRequired: "پیام الزامی است",
      messageMinLength: "پیام باید حداقل ۱۰ کاراکتر باشد",
    },
  },
  en: {
    title: "Support Form",
    subtitle: "Fill out the form below to submit a support request",
    fields: {
      name: "Full Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      priority: "Priority",
    },
    priorities: {
      low: "Low",
      medium: "Medium",
      high: "High",
    },
    placeholders: {
      name: "Enter your name",
      email: "example@email.com",
      subject: "Enter your request subject",
      message: "Describe your issue or question in detail...",
    },
    submit: "Submit Request",
    submitting: "Submitting...",
    success: "Your request has been submitted successfully!",
    successMessage: "Our support team will contact you as soon as possible.",
    error: "Error submitting request",
    errorMessage: "Please try again or contact us directly.",
    validation: {
      nameRequired: "Name is required",
      emailRequired: "Email is required",
      emailInvalid: "Invalid email address",
      subjectRequired: "Subject is required",
      messageRequired: "Message is required",
      messageMinLength: "Message must be at least 10 characters",
    },
  },
};
