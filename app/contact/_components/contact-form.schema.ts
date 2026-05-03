import { z } from "zod";
import type { ContentValidation } from "./contact-form.content";

// Zod validation schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "nameMin").max(100, "nameMax"),
  email: z.string().email("emailInvalid").max(254, "emailMax"),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]+$/, "phoneInvalid")
    .max(50, "phoneMax")
    .optional()
    .or(z.literal("")),
  company: z.string().max(100, "companyMax").optional(),
  subject: z.string().min(3, "subjectMin").max(200, "subjectMax"),
  message: z.string().min(10, "messageMin").max(2000, "messageMax"),
  preferredContact: z.enum(["email", "phone"]),
  consent: z.boolean().refine((val) => val === true, {
    message: "consentRequired",
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  preferredContact?: string;
  consent?: string;
  _general?: string;
}

export function getLocalizedErrors(
  error: z.ZodError,
  validationContent: ContentValidation
): FormErrors {
  const newErrors: FormErrors = {};

  error.issues.forEach((err) => {
    const field = err.path[0] as keyof FormErrors;
    // The message we passed to Zod is the key in our validation dict
    const msgKey = err.message as keyof ContentValidation;

    // If the message is a valid key in our localization dict, use it
    if (msgKey in validationContent) {
      newErrors[field] = validationContent[msgKey];
    } else {
      // Fallback for Zod's default errors (e.g. required field)
      if (field === "email") {
        newErrors[field] = validationContent.emailInvalid;
      } else {
         newErrors[field] = err.message;
      }
    }
  });

  return newErrors;
}
