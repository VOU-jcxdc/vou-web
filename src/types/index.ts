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
