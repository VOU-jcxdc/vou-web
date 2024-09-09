import DropAndDragZoneGeneralFile from "@/components/File/DropAndDragZoneGeneralFile";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  useCreateQuizGameQuestions,
  useCreateRoomGame,
  useGetQuizGameQuestions,
} from "@/hooks/react-query/useQuizGame";
import useFiles from "@/hooks/zustand/useFiles";
import { Route } from "@/routes/_authenticated/_brand/events/$eventId/_$eventId/game";
import { Loader } from "lucide-react";

export default function QuizSection() {
  const { files } = useFiles();
  const { eventId } = Route.useParams();
  const createQuestionsMutation = useCreateQuizGameQuestions(eventId);
  const createRoomGameMutation = useCreateRoomGame();
  const handleSubmit = () => {
    if (files.length > 0) createQuestionsMutation.mutate(files[0]);
  };
  const { data, isSuccess, isError, isLoading } = useGetQuizGameQuestions(eventId);
  return (
    <div className="flex flex-col gap-4">
      <Separator orientation="horizontal" className="mt-4" />
      <h6 className="text-2xl font-semibold">Questions</h6>
      <p className="text-sm italic text-muted-foreground">
        After creating questions and carefully checking them, click on the button "Create room"
      </p>
      {data?.length == 0 && (
        <>
          <p className="font-semibold">Create questions:</p>
          <DropAndDragZoneGeneralFile maxFiles={1} />
          <Button className="w-fit" disabled={files.length == 0} onClick={handleSubmit}>
            Send file
          </Button>
        </>
      )}
      {isLoading && (
        <div className="grid min-h-[350px] place-items-center">
          <Loader className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}
      {isError && <div>Error</div>}

      {isSuccess && (
        <>
          {data.map(({ question, options, answer }, index) => {
            return (
              <div>
                <div>
                  <strong>Question no {index + 1}: </strong>
                  {question}
                </div>
                <ul className="ml-10">
                  {options.map((opt, idx) => (
                    <li className={answer == idx + 1 ? "bg-green-200 font-semibold" : ""}>{opt}</li>
                  ))}
                </ul>
              </div>
            );
          })}
          <Button
            className="w-fit"
            onClick={() => createRoomGameMutation.mutate({ eventId })}
            disabled={createRoomGameMutation.isPending}
          >
            Create room game
          </Button>
        </>
      )}
    </div>
  );
}
