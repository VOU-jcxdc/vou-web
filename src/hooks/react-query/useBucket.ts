import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  BucketParams,
  getFile,
  getPresignedURL,
  uploadConfirmation,
  uploadFile,
} from "@/services/bucket";

export const bucketKeys = {
  key: ["files"] as const,
  detail: (id: string) => [...bucketKeys.key, id] as const,
};

export const useGetFile = (id: string | null) => {
  return useQuery({
    queryKey: bucketKeys.detail(id ?? ""),
    queryFn: () => {
      if (id) return getFile(id);
      return new Promise<Response>(() => {});
    },
  });
};

const combine = async ({ id: fileId, filename, file }: BucketParams) => {
  const { id, url } = await getPresignedURL({ id: fileId, filename });
  const response = await uploadFile(file, url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return uploadConfirmation(id);
};

export const useUploadFile = () => {
  return useMutation({
    mutationFn: ({ id, filename, file }: BucketParams) =>
      combine({ id, filename, file }),
  });
};
