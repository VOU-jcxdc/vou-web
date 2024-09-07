import DropAndDragZoneGeneralFile from "@/components/File/DropAndDragZoneGeneralFile";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  useCreateQuizGameQuestions,
  useGetQuizGameQuestions,
} from "@/hooks/react-query/useQuizGame";
import useFiles from "@/hooks/zustand/useFiles";
import { Route } from "@/routes/_authenticated/_brand/events/$eventId/_$eventId/game";
import { Loader } from "lucide-react";

export default function QuizSection() {
  const { files } = useFiles();
  const { eventId } = Route.useParams();
  const createQuestionsMutation = useCreateQuizGameQuestions(eventId);
  const handleSubmit = () => {
    if (files.length > 0) createQuestionsMutation.mutate(files[0]);
  };
  const { data, isSuccess, isError, isLoading } = useGetQuizGameQuestions(eventId);
  return (
    <div className="flex flex-col gap-4">
      <Separator orientation="horizontal" className="my-4" />
      {data?.length == 0 && (
        <>
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

      {isSuccess &&
        data.map(({ question, options, answer }, index) => {
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
    </div>
  );
}
