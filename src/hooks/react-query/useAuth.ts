import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { signIn, signUp } from "@/services/auth";

import { useToast } from "../useToast";

export const useSignUp = () => {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      router.push("/log-in");
      toast({
        title: "Success",
        description: "You have successfully signed up",
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

export const useSignIn = () => {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You have successfully logged in",
        variant: "default",
      });
      router.push("/users");
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
