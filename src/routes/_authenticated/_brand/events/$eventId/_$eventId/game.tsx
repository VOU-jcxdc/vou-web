import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_brand/events/$eventId/_$eventId/game")({
  component: () => <div>Hello /_authenticated/_brand/events/$eventId/_$eventId/games!</div>,
});
