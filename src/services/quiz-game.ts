import api from "./kyInstance";

export type QuizGameQuestion = {
  question: string;
  options: string[];
  answer: number;
};
export type CreateQuestionsParams = {
  file: File;
  eventId: string;
};

export const createQuestions = async (body: CreateQuestionsParams) => {
  const formData = new FormData();
  formData.append("eventId", body.eventId);
  formData.append("file", body.file);
  return (
    await api
      .post(`quiz-game/questions`, {
        body: formData,
      })
      .json<{ data: QuizGameQuestion[] }>()
  ).data;
};

export const getQuestions = async (eventId: string) => {
  return (await api.get(`events/${eventId}/questions`).json<{ data: QuizGameQuestion[] }>()).data;
};

export const createRoomGame = async (body: { eventId: string }) => {
  return (await api.post(`quiz-game/room-game`, { json: body }).json<{ data: any }>()).data;
};
