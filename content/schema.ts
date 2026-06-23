import { z } from "zod";

export const dateRef = z
  .string()
  .regex(/^(\d{4}-\d{2}(-\d{2})?|present)$/, "Use YYYY-MM, YYYY-MM-DD, or 'present'");

export const urlSchema = z.string().url();

export const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  location: z.string().min(1),
  email: z.string().email(),
  links: z.object({
    github: urlSchema,
    linkedin: urlSchema,
    website: urlSchema,
  }),
  summary: z.string().min(40),
  languages: z
    .array(z.object({ name: z.string().min(1), level: z.string().min(1) }))
    .min(1),
});

export const experienceSchema = z.object({
  org: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1),
  start: dateRef,
  end: dateRef,
  current: z.boolean(),
  employmentType: z.enum([
    "full-time",
    "part-time",
    "internship",
    "contract",
    "volunteer",
  ]),
  highlights: z.array(z.string().min(1)).min(1),
  tech: z.array(z.string().min(1)).default([]),
});

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "lowercase kebab-case"),
  name: z.string().min(1),
  oneLiner: z.string().min(1),
  description: z.string().min(40),
  role: z.string().optional(),
  tech: z.array(z.string().min(1)).min(1),
  links: z
    .object({ repo: urlSchema.optional(), demo: urlSchema.optional() })
    .default({}),
  start: dateRef.optional(),
  end: dateRef.optional(),
  featured: z.boolean(),
  private: z.boolean().default(false),
  highlights: z.array(z.string().min(1)).default([]),
});

export const educationSchema = z.object({
  org: z.string().min(1),
  credential: z.string().min(1),
  location: z.string().min(1),
  start: dateRef,
  end: dateRef,
  note: z.string().optional(),
});

export const certificationSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  date: dateRef,
  credentialId: z.string().optional(),
  url: urlSchema.optional(),
});

export const publicationSchema = z.object({
  title: z.string().min(1),
  authors: z.string().min(1),
  venue: z.string().min(1),
  year: z.number().int().gte(2000).lte(2100),
  details: z.string().optional(),
  url: urlSchema.optional(),
});

export const leadershipSchema = z.object({
  org: z.string().min(1),
  role: z.string().min(1),
  start: dateRef,
  end: dateRef,
  category: z.enum(["leadership", "creative", "community"]),
  highlights: z.array(z.string().min(1)).default([]),
});

export const skillGroupSchema = z.object({
  category: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});

export const profileDataSchema = z.object({
  profile: profileSchema,
  experience: z.array(experienceSchema).min(1),
  projects: z.array(projectSchema).min(1),
  education: z.array(educationSchema).min(1),
  certifications: z.array(certificationSchema),
  publications: z.array(publicationSchema),
  leadership: z.array(leadershipSchema),
  skills: z.array(skillGroupSchema).min(1),
});

export type Profile = z.infer<typeof profileSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Publication = z.infer<typeof publicationSchema>;
export type Leadership = z.infer<typeof leadershipSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type ProfileData = z.infer<typeof profileDataSchema>;
