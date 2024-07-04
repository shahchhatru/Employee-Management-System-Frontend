import { ScrollArea } from "@radix-ui/react-scroll-area";
import AddEmployeeForm from "./AddEmployeeForm";
import EmployeeDataTable from "./EmployeedataTable";
const EmployeePage = () => {
  return (
    <div className=" w-full h-[95vh] p-2 grid grid-cols-12 grid-rows-12">
      <div className="col-span-1">
        <AddEmployeeForm
          update={false}
          className="bg-custom-mainColor/60 flex gap-2 rounded p-2 text-custom-cardTagText"
        />
      </div>

      {/* <AddEmployeeForm update={true} /> */}
      <ScrollArea className="col-span-12 row-start-4 row-end-12 p-2 ">
        <EmployeeDataTable />
      </ScrollArea>
    </div>
  );
};

export default EmployeePage;
