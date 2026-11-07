export type ProjectVisibility = "private" | "unlisted" | "public";
export type ProjectStatus = "active" | "archived";
export type EpisodeStatus = "draft" | "planning" | "production" | "completed";

export interface ProjectSummary {
  id: string;
  title: string;
  description: string;
  visibility: ProjectVisibility;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}
