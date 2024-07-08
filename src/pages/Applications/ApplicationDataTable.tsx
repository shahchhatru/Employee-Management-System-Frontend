import React, { useState } from "react";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ApplicationTypeReturn } from "@/types/application";
import { Button } from "@/components/ui/button";
import { Edit2, UserRoundX, CheckCheck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUpdateApplicationMutation } from "@/store/ApplicationSlice";
import { toast } from "sonner";
import ApplicationDetailModel from "./ApplicationDetail";

function ApplicationTable({ data }: { data: ApplicationTypeReturn[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterField, setFilterField] = useState<string>("text");
  const [filterValue, setFilterValue] = useState<string>("");
  const [updateApplication, { isLoading, isError, data: updateData }] =
    useUpdateApplicationMutation();
  // console.log({ data });

  const columns: ColumnDef<ApplicationTypeReturn>[] = [
    {
      accessorKey: "text",
      header: "Text",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => row.original.user?.name || "Myself",
    },

    {
      accessorKey: "supervisor",
      header: "Supervisor",
      cell: ({ row }) => row.original.supervisor?.name || "N/A",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center space-x-4 bg-custom-primaryBackground">
          <ApplicationDetailModel applicationDetails={row.original} />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    // Handle edit button click
                    while (isLoading);
                    console.log("row.original._id", row.original._id);
                    await updateApplication({
                      id: row.original._id,
                      applicationData: {
                        status: "APPROVED",
                      },
                    }).unwrap();
                    if (!isError) {
                      toast.success(
                        "Application Approved Successfully" +
                          JSON.stringify(updateData)
                      );
                    } else {
                      toast.error(
                        "Failed to Approve Applications" +
                          JSON.stringify(updateData)
                      );
                    }
                  }}
                >
                  <CheckCheck className="text-custom-mainColor" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Approve</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    // Handle edit button click
                    while (isLoading);
                    console.log("row.original._id", row.original._id);
                    await updateApplication({
                      id: row.original._id,
                      applicationData: {
                        status: "REJECTED",
                      },
                    }).unwrap();
                    if (!isError) {
                      toast.success(
                        "Application Approved Successfully" +
                          JSON.stringify(updateData)
                      );
                    } else {
                      toast.error(
                        "Failed to Approve Applications" +
                          JSON.stringify(updateData)
                      );
                    }
                  }}
                >
                  <UserRoundX className="text-red-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Reject</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
    table.getColumn(filterField)?.setFilterValue(value);
  };

  return (
    <div className="w-full p-4 mx-2 my-4 bg-custom-primaryBackground rounded border-2 border-custom-secondarBackground">
      <div className="flex items-center py-4 space-x-4">
        <Select value={filterField} onValueChange={setFilterField}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a field" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="type">Type</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="organization">Organization</SelectItem>
            <SelectItem value="supervisor">Supervisor</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder={`Filter by ${filterField}...`}
          value={filterValue}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        ></Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default ApplicationTable;
