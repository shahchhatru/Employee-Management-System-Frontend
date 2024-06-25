import { ScrollArea } from "@radix-ui/react-scroll-area";
import AddEmployeeForm from "./AddEmployeeForm";
import EmployeeDataTable from "./EmployeedataTable";
const EmployeePage = () => {
  return (
    <div className="border-red-400 border-2 w-full h-[95vh] p-2 grid grid-cols-12 grid-rows-12">
      <div className="col-span-1">
        <AddEmployeeForm update={false} />
      </div>

      {/* <AddEmployeeForm update={true} /> */}
      <ScrollArea className="col-span-12 row-start-4 row-end-12 p-2 bg-red-400">
        <EmployeeDataTable />
      </ScrollArea>
    </div>
  );
};

export default EmployeePage;
