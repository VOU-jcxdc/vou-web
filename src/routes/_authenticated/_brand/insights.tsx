import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import PaddingWrapper from "@/components/templates/padding-wrapper";

export const Route = createFileRoute("/_authenticated/_brand/insights")({
  component: InsightsPage,
});

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

function InsightsPage() {
  return (
    <PaddingWrapper className="grid grid-cols-12">
      <ChartContainer config={chartConfig} className="col-span-4 min-h-[200px]">
        <BarChart accessibilityLayer data={chartData}>
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </PaddingWrapper>
  );
}
