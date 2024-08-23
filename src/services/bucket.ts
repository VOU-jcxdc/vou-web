import api, { apiAuth } from "./kyInstance";

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

export const getFile = async (id: string) => {
  return await apiAuth.get(`files/${id}`);
};

export const getPresignedURL = async (params: PresignedURLParams) => {
  if (!params.id) {
    return (
      await api
        .post("files/presigned-url", {
          json: params,
        })
        .json<{ data: Bucket }>()
    ).data;
  }
  return (
    await api
      .put(`files/presigned-url/${params.id}`, {
        json: {
          filename: params.filename,
        },
      })
      .json<{ data: Bucket }>()
  ).data;
};

export const uploadConfirmation = async (id: string) => {
  const state = await api
    .post(`files/upload-confirmation`, {
      json: {
        id,
      },
    })
    .json<string>();
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
