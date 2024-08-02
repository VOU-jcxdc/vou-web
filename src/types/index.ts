import { z } from "zod";

export interface FileWithPreview extends File {
  preview: string;
}

export interface LogType {
  id: string;
  created_at: string;
  name: string;
  actor_id: string;
  actor_name: string;
  type: string;
  result: string;
}

export interface LogActorType {
  actorId: string;
  actorName: string;
}

export type PagedData = {
  total: number;
  offset: number;
  limit: number;
};

export const pagingSchema = z.object({
  page: z.number().catch(1),
  pageSize: z.number().catch(10),
});

export type PagingSchema = z.infer<typeof pagingSchema>;
