import z from "zod";
export const InputFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  interests: z
    .array(z.string().min(1).max(15))
    .min(1, "Must have at least 1 interest.")
    .max(6, "Cannot have more than 6 interests."),
  githubUrl: z.string().url().optional(),
  twitterUrl: z.string().url().optional(),
});
