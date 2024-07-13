import { DataTable } from "@components/Table/DataTable";
import { Bike, CalendarDays,Car, Hash, MoreVertical } from "lucide-react";

import DataCard from "@/app/(main)/users/Components/DataCard";
import {
  columns,
  User,
} from "@/app/(main)/users/Components/OverviewColumns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import formatCurrencyWithCommas from "@/lib/utils/functions/formatCurrency";

async function getUsers(): Promise<User[]> {
  const res = await fetch(
    "https://64a6f5fc096b3f0fcc80e3fa.mockapi.io/api/users"
  );
  const data = await res.json();
  return data;
}

export default async function page() {
  const data = await getUsers();

  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden px-4 pb-4 sm:px-2 sm:pb-2">
      <div className="flex flex-col gap-4 sm:gap-2">
        <div className="grid grid-cols-4 gap-4 lg:grid-cols-2 sm:grid-cols-1 sm:gap-2">
          <DataCard
            title="Total bike trips"
            data={"1000000"}
            previousData="Mostly successful"
            icon={<Bike className="text-muted-foreground h-4 w-4" />}
            isLoading={false}
          />
          <DataCard
            title="Total car trips"
            data={"111000"}
            previousData="Mostly satisfied"
            icon={<Car className="text-muted-foreground h-4 w-4" />}
            isLoading={false}
          />
          <DataCard
            title="Trips this month"
            data={"999000"}
            previousData="2/2/2024"
            icon={<CalendarDays className="text-muted-foreground h-4 w-4" />}
            isLoading={false}
          />
          <DataCard
            title="Successful percent"
            data={"99%"}
            previousData="Counted on total data"
            icon={<Hash className="text-muted-foreground h-4 w-4" />}
            isLoading={false}
          />
        </div>
        <div className="grid grid-cols-6 items-start gap-4 py-0 lg:gap-0 sm:gap-2">
          <div className="col-span-4 lg:col-span-6">
            <DataTable
              columns={columns}
              data={data}
              isPaginationEnabled={true}
              defaultPageSize={5}
            />
          </div>
          <Card className="col-span-2 w-full overflow-hidden lg:col-span-6">
            <CardHeader className="flex flex-row items-start">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Trips report
                </CardTitle>
                <CardDescription>Time: 23/8/2023</CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <MoreVertical className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Reload</DropdownMenuItem>
                    <DropdownMenuItem>Export PDF</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Report Details</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total trips:</span>
                    <span>200000</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Trips in HCM:</span>
                    <span>100000</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Trips in HN:</span>
                    <span>100000</span>
                  </li>
                </ul>
                <Separator className="" />
                <div className="font-semibold">Finance Details</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Total revenue:
                    </span>
                    <span>{formatCurrencyWithCommas(200000000)}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Revenue in HCM:
                    </span>
                    <span>{formatCurrencyWithCommas(200000000)}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Revenue in HN:
                    </span>
                    <span>{formatCurrencyWithCommas(200000000)}</span>
                  </li>
                </ul>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-row justify-between gap-4">
                <div className="grid gap-3">
                  <div className="font-semibold">Successful trips</div>
                  <address className="text-muted-foreground grid gap-0.5 not-italic">
                    <span>99000</span>
                  </address>
                </div>
                <div className="grid auto-rows-max gap-3">
                  <div className="font-semibold">Failed trips</div>
                  <div className="text-muted-foreground">1000 </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex w-full justify-center border-t px-6 py-3 text-sm font-medium">
              A report is generated automatically.
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
