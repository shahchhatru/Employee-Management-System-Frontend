import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui";
import { useGetEmployeeQuery } from "../../store/EmployeeSlice";
import { Employee } from "../../types/employee";

function SalaryDataTable() {
  const { data, isLoading, error } = useGetEmployeeQuery();

  const isPaid = (joiningDate: string) => {
    const joining = new Date(joiningDate);
    const current = new Date();
    const joiningDay = joining.getDate();
    const currentDay = current.getDate();
    // const joiningMonth = joining.getMonth();
    // const currentMonth = current.getMonth();

    if (joiningDay >= 28 && currentDay >= 28) {
      return true;
    } else if (joiningDay <= currentDay) {
      return true;
    }
    return false;
  };

  const salaryColumns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.original.user.name,
    },
    {
      accessorKey: "salary",
      header: "Salary",
      cell: ({ row }) => `$${row.original.salary}`,
    },
    {
      accessorKey: "paid",
      header: "Paid",
      cell: ({ row }) => (isPaid(row.original.joiningDate) ? "Yes" : "No"),
    },
    {
      accessorKey: "actions",
      header: "Actions",
    },
  ];

  const table = useReactTable({
    data: data?.data || [],
    columns: salaryColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <Card>
      <CardContent>
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
              {table.getRowModel().rows?.length ? (
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
                    colSpan={salaryColumns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default SalaryDataTable;
