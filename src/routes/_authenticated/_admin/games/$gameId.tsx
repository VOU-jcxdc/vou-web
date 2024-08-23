import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_admin/games/$gameId")({
  component: () => <div>Hello /_authenticated/_admin/games/$gameId!</div>,
});
