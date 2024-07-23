import PaddingWrapper from "@components/templates/padding-wrapper";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Game } from "../_components/columns";
import Form from "./form";

async function getGame({ gameId }: { gameId: string }): Promise<Game> {
  //   const res = await fetch(
  //     `https://669beb23276e45187d36d75f.mockapi.io/api/users/${gameId}`
  //   );
  //   const data = await res.json();
  const data: Game = {
    id: gameId,
    name: "Quiz game",
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/742.jpg",
    exchangeStatus: true,
    instruction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, varius nunc. Nulla facilisi. Nullam sit amet semper nunc. Nullam nec nunc nec nunc tincidunt fermentum. Nullam nec nunc nec nunc tincidunt fermentum.",
  };
  return data;
}

export default async function page({ params }: { params: { gameId: string } }) {
  const gameId = params.gameId;
  const data = await getGame({ gameId });
  return (
    <PaddingWrapper className="grid grid-cols-12 gap-4">
      <div className="col-start-4 col-end-10 lg:col-span-full">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-3xl my-4">Game Detail</h1>
        </div>
        <Separator orientation="horizontal" className="w-full mb-8" />
        <Form game={data} />
      </div>
    </PaddingWrapper>
  );
}
