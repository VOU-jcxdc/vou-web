import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getUser,
  getUserProfile,
  getUsers,
  updateUser,
  updateUserProfile,
  User,
} from "@/services";
import { PagedData, PagingSchema } from "@/types";

import { useToast } from "../useToast";
import { useUploadFile } from "./useBucket";
import useFiles from "../zustand/useFiles";

export const userKeys = {
  key: ["users"] as const,
  profil: () => [...userKeys.key, "profile"] as const,
  list: () => [...userKeys.key] as const,
  detail: (id: string) => [...userKeys.list(), "detail", id] as const,
};

export const useGetUsers = (params: PagingSchema) => {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: () => getUsers(params),
  });
};

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUser(id),
  });
};

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationKey: ["update", ...userKeys.detail(id)],
    mutationFn: updateUser,
    onSuccess: (returnData: User) => {
      queryClient.setQueryData(userKeys.detail(id), () => {
        return returnData;
      });
      const existingUsers = queryClient.getQueryData<
        PagedData & {
          accounts: User[];
        }
      >(userKeys.list());
      if (existingUsers && existingUsers.accounts) {
        queryClient.setQueryData(
          userKeys.list(),
          (
            data: PagedData & {
              accounts: User[];
            }
          ) => {
            return {
              ...data,
              accounts: data.accounts.map((user) =>
                user.id === returnData.id ? returnData : user
              ),
            };
          }
        );
      }
      toast({
        description: "Update user successfully!",
      });
    },
    onError: (e) => {
      console.log(e);
      toast({
        variant: "destructive",
        description: "Failed to update user!",
      });
    },
  });
};

// export const useUpdateAvatar = () => {
//   const queryClient = useQueryClient();
//   const { toast } = useToast();
//   const changeAvatarMutation = useUploadFile();
//   const mutate = (bucketId: string | null, file: File, ) => {
//     if (bucketId)
//       changeAvatarMutation.mutate({
//         id: bucketId,
//         filename: file.name,
//         file
//       }, {

//       });
//   };
// };

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: [...userKeys.key, "profile"],
    queryFn: getUserProfile,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (returnData: User) => {
      queryClient.setQueryData([...userKeys.key, "profile"], () => returnData);
      toast({
        description: "Update user profile successfully!",
      });
    },
    onError: (e) => {
      console.log(e);
      toast({
        variant: "destructive",
        description: "Failed to update user profile!",
      });
    },
  });
};
