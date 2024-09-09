import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { useGetVouchers } from "@/hooks/react-query/useVouchers";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/_authenticated/_brand/events/$eventId/_$eventId/insights")({
  component: InsightsPage,
});

const chartConfig = {
  default: {
    label: "Available vouchers",
    color: "#2563eb",
  },
} satisfies ChartConfig;

function InsightsPage() {
  const { eventId } = Route.useParams();

  const { data: vouchers } = useGetVouchers(eventId);
  const chartData = useMemo(() => {
    if (vouchers) {
      return vouchers.map((vou) => {
        return {
          voucher: vou.name,
          default: vou.quantity,
        };
      });
    }
    return [];
  }, vouchers);

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
          <XAxis dataKey="voucher" tickLine={false} tickMargin={10} />
          <ChartLegend content={<ChartLegendContent />} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" className="min-w-20" />}
          />
          <Bar dataKey="default" fill="var(--color-default)" radius={4} />
        </BarChart>
      </ChartContainer>
    </>
  );
}
