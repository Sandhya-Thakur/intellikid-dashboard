import * as z from "zod";
export const formSchema  = z.object({
    language: z.string().min(1, {
      message: "Language is required.",
    }),
    grade: z.string().min(1, {
      message: "Grade is required.",
    }),
    subject: z.string().min(1, {
      message: "Subjects is required.",
    }),
    topic: z.string().min(1, {
      message: "Topic is required.",
    }),
  });