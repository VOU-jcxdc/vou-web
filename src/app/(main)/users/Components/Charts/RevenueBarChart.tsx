"use client";

import { BarChart } from "@tremor/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useDatePicker from "@/hooks/zustand/useDatePicker";
import formatVNDate from "@/lib/utils/functions/formatDate";

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()} VNĐ`;

const chartdata = [
  {
    name: "Jan",
    Revenue: 288,
    Profit: 2488,
  },
  {
    name: "April",
    Revenue: 2488,
    Profit: 388,
  },
  {
    name: "May",
    Revenue: 2488,
    Profit: 248,
  },
  {
    name: "June",
    Revenue: 488,
    Profit: 248,
  },
  {
    name: "September",
    Revenue: 488,
    Profit: 248,
  },
  {
    name: "November",
    Revenue: 248,
    Profit: 2488,
  },
  {
    name: "December",
    Revenue: 188,
    Profit: 788,
  },
];

export default function RevenueBarChart() {
  const { from, to } = useDatePicker();

  // const { data: orderPricesByMonth, isLoading } = useQuery({
  //   queryKey: ["orders-revenues", from, to],
  //   queryFn: async () => readOrdersNumbersByDateRange({ from: from, to: to }),
  //   staleTime: 1000 * 60 * 60,
  // });

  // const { chartData } = ordersToChartData(
  //   orderPricesByMonth?.data as { month: number; year: number; total: number }[]
  // ) as OrdersToChartData;

  return (
    <Card className="col-span-2 h-fit">
      <CardHeader className="pb-0">
        <CardTitle className="mb-2">Finance</CardTitle>
        <div className="flex w-full flex-row items-center justify-between sm:flex-col sm:gap-2">
          <CardDescription>
            Finance chart in the whole country{" "}
            <span className="hidden sm:block">
              from {formatVNDate(from)} to {formatVNDate(to)}
            </span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-2 h-fit">
        <div>
          <BarChart
            data={chartdata}
            index="name"
            categories={["Revenue", "Profit"]}
            colors={["blue", "green"]}
            valueFormatter={dataFormatter}
            yAxisWidth={90}
            onValueChange={(v) => console.log(v)}
          />

          {/* {isLoading || !orderPricesByMonth ? (
            <div className="h-[400px] w-full">
              <DashboardLoading />
            </div>
          ) : (
            <div className="h-[400px] w-full overflow-hidden">
              {orderPricesByMonth && (
                <BarChart
                  className="h-full w-full"
                  data={chartData}
                  index="name"
                  categories={["DoanhThu"]}
                  colors={["green"]}
                  valueFormatter={dataFormatter}
                  yAxisWidth={90}
                  onValueChange={() => {}}
                  noDataText="Không có đơn hàng"
                />
              )}
            </div>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
}

interface OrdersToChartData {
  chartData: { name: string; DoanhThu: number }[];
  totalRevenue: number;
}

const ordersToChartData = (
  orders:
    | {
        month: number;
        year: number;
        total: number;
      }[]
    | null
) => {
  const chartData: {
    name: string;
    DoanhThu: number;
  }[] = [];

  let totalRevenue = 0;

  if (orders && orders.length > 0) {
    if (Array.isArray(orders) && orders.length > 0) {
      orders.sort((a, b) => {
        if (a.year !== b.year) {
          return a.year - b.year;
        }
        return a.month - b.month;
      });

      for (let i = 0; i < orders.length; i++) {
        chartData.push({
          name: `${orders[i].month}, ${orders[i].year}`,
          DoanhThu: orders[i].total,
        });
        totalRevenue += orders[i].total;
      }
    }

    return { chartData, totalRevenue } as OrdersToChartData;
  } else return [];
};
