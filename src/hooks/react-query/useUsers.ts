import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getUser, getUsers, updateUser, User } from "@/services";
import { PagingSchema } from "@/types";

import { useToast } from "../useToast";

const userKeys = {
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
      queryClient.setQueryData(userKeys.detail(id), (user: User) => {
        return {
          ...user,
          ...returnData,
        };
      });
      const existingEvents = queryClient.getQueryData<User[]>(userKeys.list());
      if (existingEvents) {
        queryClient.setQueryData(userKeys.list(), (users: User[]) => {
          return users.map((user) => {
            if (user.id === returnData.id) return returnData;
            return user;
          });
        });
      }
      toast({
        description: "Update user successfully!",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to update user!",
      });
    },
  });
};
