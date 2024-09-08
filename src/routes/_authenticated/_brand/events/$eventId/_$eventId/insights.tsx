import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/_authenticated/_brand/events/$eventId/_$eventId/insights")({
  component: InsightsPage,
});

const chartConfig = {
  default: {
    label: "Voucher",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", default: 186 },
  { month: "February", default: 305 },
  { month: "March", default: 237 },
  { month: "April", default: 73 },
  { month: "May", default: 209 },
  { month: "June", default: 214 },
];
function InsightsPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="my-4 text-3xl font-semibold">Insights</h1>
      </div>
      <Separator orientation="horizontal" className="mb-8 w-full" />
      <ChartContainer config={chartConfig} className="min-h-[200px]">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <YAxis dataKey="default" />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
          <Bar dataKey="default" fill="var(--color-default)" radius={4} />
        </BarChart>
      </ChartContainer>
    </>
  );
}
