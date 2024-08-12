import api from "@/services/httpRequests";

type Bucket = {
  id: string;
  url: string;
};

type PresignedURLParams = {
  id?: string;
  filename: string;
};

export type BucketParams = PresignedURLParams & {
  file: File;
};

const BASE_URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";
export const getFile = async (id: string) => {
  return await fetch(`${BASE_URL}/files/${id}`);
};

export const getPresignedURL = async (body: PresignedURLParams) => {
  if (!body.id) {
    return await api.post<Bucket>("files/presigned-url", {
      body,
    });
  }
  return await api.put<Bucket>("files/presigned-url", {
    body,
  });
};

export const uploadConfirmation = async (id: string) => {
  const state = await api.post<string>(`files/upload-confirmation`, {
    body: {
      id,
    },
  });
  return {
    id,
    state,
  };
};

export const uploadFile = async (file: File, url: string) => {
  const arrayBuffer = await file.arrayBuffer();
  return await fetch(url, {
    method: "PUT",
    body: arrayBuffer,
    headers: {
      "Content-Type": file.type, // Set the content type to the file's MIME type
    },
  });
};
