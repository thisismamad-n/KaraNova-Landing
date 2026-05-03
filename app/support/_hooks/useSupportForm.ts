import { useState } from "react";
import { FormData, FormErrors, content } from "../_components/SupportForm.constants";

/**
 * useSupportForm custom hook
 *
 * Extracts state management and validation logic out of the SupportForm UI component.
 * This separation of concerns improves code readability and maintainability.
 */
export function useSupportForm(language: "en" | "fa") {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const currentContent = content[language];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = currentContent.validation.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = currentContent.validation.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = currentContent.validation.emailInvalid;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = currentContent.validation.subjectRequired;
    }

    if (!formData.message.trim()) {
      newErrors.message = currentContent.validation.messageRequired;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = currentContent.validation.messageMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        priority: "medium",
      });
      setErrors({});
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const resetForm = () => {
    setSubmitStatus("idle");
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    currentContent,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
