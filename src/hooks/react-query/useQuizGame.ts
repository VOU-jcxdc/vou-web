import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { eventKeys } from "./useEvents";
import { useToast } from "../useToast";
import { createQuestions, createRoomGame, getQuestions } from "@/services/quiz-game";

export const quizGameKeys = {
  key: (eventId: string) => [...eventKeys.detail(eventId), "questions"],
};

export const useCreateQuizGameQuestions = (eventId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (file: File) => createQuestions({ file, eventId }),
    onSuccess: (returnData) => {
      queryClient.setQueryData(quizGameKeys.key(eventId), returnData);
      toast({
        title: "Create questions successfully!",
      });
    },
    onError: (error) => {
      toast({
        description: error.message,
        title: "Failed to create questions",
        variant: "destructive",
      });
    },
  });
};

export const useGetQuizGameQuestions = (eventId: string) => {
  return useQuery({
    queryKey: quizGameKeys.key(eventId),
    queryFn: () => getQuestions(eventId),
  });
};

export const useCreateRoomGame = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: createRoomGame,
    onSuccess: () => {
      toast({
        title: "Create room game successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create room game",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
