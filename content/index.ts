import type { ProfileData } from "./schema";
import { profile } from "./profile";
import { experience } from "./experience";
import { projects } from "./projects";
import { education } from "./education";
import { certifications } from "./certifications";
import { publications } from "./publications";
import { leadership } from "./leadership";
import { skills } from "./skills";

export const profileData: ProfileData = {
  profile,
  experience,
  projects,
  education,
  certifications,
  publications,
  leadership,
  skills,
};

export {
  profile, experience, projects, education,
  certifications, publications, leadership, skills,
};
export * from "./schema";
