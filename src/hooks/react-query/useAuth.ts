import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { signIn, signOut, signUp } from "@/services/auth";

import { useToast } from "../useToast";

export const authKeys = {
  key: ["authUser"] as const,
  detail: () => [...authKeys.key, "detail"] as const,
};

export const useSignUp = () => {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: signUp,
    onSuccess: async () => {
      toast({
        title: "Success",
        description: "You have successfully signed up",
      });
      await router.navigate({ to: "/log-in" });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useSignIn = () => {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: signIn,
    onSuccess: async () => {
      await router.navigate({ to: "/users" });
      toast({
        title: "Success",
        description: "You have successfully logged in",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useSignOut = () => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOut,
    onSuccess: async () => {
      await router.navigate({ to: "/log-in" });
      queryClient.clear();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
