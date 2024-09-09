import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TooltipProvider } from "@/components/ui/tooltip";

import PaddingWrapper from "@/components/templates/padding-wrapper";
import { Loader } from "lucide-react";

import { useGetUsers } from "@/hooks/react-query/useUsers";

export const Route = createFileRoute("/_authenticated/_admin/adminInsights")({
  component: InsightsPage,
});

function InsightsPage() {
  const users = useGetUsers({
    page: 1,
    pageSize: 100,
  });

  const roleCounts = {
    admin: 0,
    brand: 0,
    player: 0,
  };

  const monthCounts: any = {};

  if (users.isSuccess && users.data) {
    users.data.accounts.forEach((user) => {
      if (user.role in roleCounts) {
        roleCounts[user.role]++;
      }

      const createdMonth = new Date(user.createdOn).toLocaleString("default", { month: "short" });
      if (!monthCounts[createdMonth]) {
        monthCounts[createdMonth] = 0;
      }
      monthCounts[createdMonth]++;
    });
  }

  const roleData = [
    { name: "Admin", value: roleCounts.admin },
    { name: "Brand", value: roleCounts.brand },
    { name: "Player", value: roleCounts.player },
  ];

  const monthData = Object.keys(monthCounts).map((month) => ({
    name: month,
    users: monthCounts[month],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  //Mock data
  // const brandData = [
  //   { name: "Events", quantity: 20 },
  //   { name: "Vouchers", quantity: 50 },
  // ];

  // const playerData = [
  //   { name: "Shake Game", players: 150 },
  //   { name: "Quiz Game", players: 50 },
  // ];

  return (
    <PaddingWrapper className="w-full">
      <TooltipProvider>
        <div className="flex w-full flex-col gap-4 pt-4 sm:pt-2">
          <h1 className="my-4 text-3xl font-semibold">VOU Statistics</h1>
          {users.isLoading && (
            <div className="grid min-h-[350px] place-items-center">
              <Loader className="h-10 w-10 animate-spin text-primary" />
            </div>
          )}
          {users.isError && <div>Error</div>}
          {users.isSuccess && (
            <div>
              <div className="flex flex-row">
                <div>
                  <h2 className="my-4 text-2xl font-semibold">Total Accounts</h2>
                  <div className="flex">
                    <PieChart width={750} height={350}>
                      <Pie
                        data={roleData}
                        innerRadius={0}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        style={{ cursor: "pointer" }}
                        label
                      >
                        {roleData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </div>
                </div>

                <div>
                  <h2 className="my-4 text-2xl font-semibold">Total Users Joined Monthly</h2>
                  <BarChart
                    width={600}
                    height={300}
                    data={monthData}
                    margin={{
                      right: 30,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="#2563eb" />
                  </BarChart>
                </div>
              </div>

              {/* <div className="flex flex-row justify-between">
                <div>
                  <h2 className="my-4 text-2xl font-semibold">Brand Statistics</h2>
                  <BarChart width={600} height={300} data={brandData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="quantity" fill="#8884d8" />
                  </BarChart>
                </div>

                <div>
                  <h2 className="my-4 text-2xl font-semibold">Player Statistics</h2>
                  <BarChart width={600} height={300} data={playerData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="players" fill="#82ca9d" />
                  </BarChart>
                </div>
              </div> */}
            </div>
          )}
        </div>
      </TooltipProvider>
    </PaddingWrapper>
  );
}
