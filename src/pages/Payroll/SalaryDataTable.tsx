import {
  addMonths,
  differenceInCalendarDays,
  format,
  isBefore,
  parseISO,
} from "date-fns";
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
import BonusActionTooltip from "./ActionTooltip";

function SalaryDataTable() {
  const { data, isLoading, error } = useGetEmployeeQuery();

  const isPaid = (joiningDate: string) => {
    const joining = parseISO(joiningDate);
    const current = new Date();

    // Check if the joining date is at least one month old
    const oneMonthLater = addMonths(joining, 1);
    if (isBefore(current, oneMonthLater)) {
      return `No (Less than 1 month since joining)`;
    }

    // Calculate the next payment date
    let nextPaymentDate = new Date(
      current.getFullYear(),
      current.getMonth(),
      1
    );
    if (joining.getDate() >= 28) {
      nextPaymentDate = new Date(current.getFullYear(), current.getMonth(), 28);
    }

    // Calculate remaining days if next payment date is in the future
    const remainingDays = differenceInCalendarDays(nextPaymentDate, current);

    // Determine the month name for which the salary is going to be paid
    const paymentMonth = format(nextPaymentDate, "MMMM");

    if (nextPaymentDate <= current) {
      return `Yes (Salary for ${paymentMonth} paid)`;
    } else {
      return `No (${remainingDays} days remaining until ${paymentMonth} salary)`;
    }
  };

  const salaryColumns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.original?.user?.name || " ",
    },
    {
      accessorKey: "salary",
      header: "Salary",
      cell: ({ row }) => `$${row.original.salary}`,
    },
    {
      accessorKey: "paid",
      header: "Paid",
      cell: ({ row }) => isPaid(row.original.joiningDate),
    },
    {
      accessorKey: "joiningDate",
      header: "Joining Date",
      cell: ({ row }) => (
        <span>{format(row.original.joiningDate, "MM/dd/yyyy")}</span>
      ),
    },
    {
      accessorKey: "bonus",
      header: "Bonus",
      cell: ({ row }) => (
        <span className="flex flex-wrap gap-2 ">
          {row.original.bonus?.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </span>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <BonusActionTooltip userId={row.original.user._id.toString()} />
      ),
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
