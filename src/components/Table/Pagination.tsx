import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useSearch } from "@tanstack/react-router";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalPages: number;
}

export function DataTablePagination<TData>({ totalPages }: DataTablePaginationProps<TData>) {
  const { page, pageSize, ...restSearch } = useSearch({
    strict: false,
  }) as { page: number; pageSize: number };
  const navigate = useNavigate();

  return (
    <div className="flex flex-row items-center justify-end gap-2 px-2 sm:flex-col sm:gap-4">
      <div className="flex flex-row items-center gap-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={pageSize ? pageSize.toString() : "10"}
            onValueChange={(value) => {
              navigate({ search: { ...restSearch, page, pageSize: Number(value) } });
            }}
          >
            <SelectTrigger className="h-8 w-[75px]">
              <SelectValue placeholder={pageSize ? pageSize.toString() : "10"} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Page {page} of {totalPages}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="h-8 w-8 p-0 lg:flex"
          onClick={() => {
            navigate({ search: { ...restSearch, page: 1, pageSize } });
          }}
          disabled={page == 1}
        >
          <span className="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => {
            navigate({ search: { ...restSearch, page: page - 1, pageSize } });
          }}
          disabled={page == 1}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => {
            navigate({ search: { ...restSearch, page: page + 1, pageSize } });
          }}
          disabled={page == totalPages}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0 lg:flex"
          onClick={() => {
            navigate({ search: { ...restSearch, page: totalPages, pageSize } });
          }}
          disabled={page == totalPages}
        >
          <span className="sr-only">Go to last page</span>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
