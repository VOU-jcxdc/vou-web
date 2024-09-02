import ItemsSection from "@/components/organisms/items-section";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetFile } from "@/hooks/react-query/useBucket";
import { useGetEvent, useUpdateEvent } from "@/hooks/react-query/useEvents";
import { useGetGameDetail, useGetGamesInSystem } from "@/hooks/react-query/useGames";
import { GameEnum } from "@/types/enums";
import { createFileRoute } from "@tanstack/react-router";
import { Loader } from "lucide-react";

export const Route = createFileRoute("/_authenticated/_brand/events/$eventId/_$eventId/game")({
  component: EventGame,
});

function GameDetail({ gameId }: { gameId: string }) {
  const { data, isSuccess } = useGetGameDetail(gameId);
  if (isSuccess && data)
    return (
      <>
        <div>
          <strong>Name: </strong>
          {data.name}
        </div>
        <div>
          <strong>Instructions: </strong>
          {data.instruction}
        </div>
        {data.type == GameEnum.SHAKE && <ItemsSection />}
      </>
    );
  return null;
}
function GameImg({ bucketId }: { bucketId: string }) {
  const { data, isSuccess } = useGetFile(bucketId);
  if (isSuccess)
    return <img src={data.url} alt={`Game ${bucketId}`} className="max-h-[10rem] object-cover" />;
  return null;
}

function GameSelect({ eventId }: { eventId: string }) {
  const { data, isLoading, isSuccess, isError } = useGetGamesInSystem();
  const updateGameMutation = useUpdateEvent(eventId);
  const handleSubmit = (gameId: string) => {
    updateGameMutation.mutate({
      id: eventId,
      gameId,
    });
  };
  if (isError) return <div>Error</div>;
  if (isLoading)
    return (
      <div className="grid min-h-[350px] place-items-center">
        <Loader className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  if (isSuccess)
    return (
      <div className="flex flex-row justify-center gap-4">
        {data.map((game) => (
          <AlertDialog key={game.id}>
            <AlertDialogTrigger asChild>
              <Card className="flex size-[18rem] cursor-pointer flex-col justify-center overflow-hidden hover:shadow-lg">
                <GameImg bucketId={game.images[0].bucketId} />
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{game.name}</CardTitle>
                </CardHeader>
                <CardContent className="truncate">{game.instruction}</CardContent>
              </Card>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>You are assigning game to this event</AlertDialogTitle>
                <AlertDialogDescription>
                  <div>
                    <strong>{game.name} </strong>will be assigned to the event.
                  </div>
                  <div>
                    <strong>Instruction: </strong>
                    {game.instruction}
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleSubmit(game.id)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
      </div>
    );
  return null;
}

function EventGame() {
  const { eventId } = Route.useParams<{ eventId: string }>();
  const { data, isLoading, isSuccess, isError } = useGetEvent(eventId);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="my-4 text-3xl font-semibold">Game</h1>
      </div>
      <Separator orientation="horizontal" className="mb-4 w-full" />
      {isError && <div>Error</div>}
      {isLoading && (
        <div className="grid min-h-[350px] place-items-center">
          <Loader className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}
      {isSuccess ? (
        data.gameId ? (
          <GameDetail gameId={data.gameId} />
        ) : (
          <GameSelect eventId={eventId} />
        )
      ) : null}
    </>
  );
}
