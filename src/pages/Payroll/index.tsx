import { ScrollArea } from "@/components/ui";
import SalaryDataTable from "./SalaryDataTable";
import SalaryDetailModel from "./SearchSalary";
import { RootState } from "@/store/Store";
import { useSelector } from "react-redux";
import SalaryDataTableView from "./ModalSalaryDataTable";

const PayrollComponent = () => {
  const authState = useSelector((state: RootState) => state.auth);

  const currentDate = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  return authState.user.role === "ADMIN" ? (
    <div className="w-full h-[90vh] grid grid-cols-12 grid-rows-12">
      <div className="col-span-12 row-start-1 row-end-2 text-2xl flex justify-center items-center">
        <h1 className="text-custom-headingText">
          Upcoming Payroll for {currentMonth} {currentYear}
        </h1>
      </div>
      <div className="col-span-12 row-start-3 row-end-6 flex justify-center items-center">
        <SalaryDetailModel />
      </div>

      <ScrollArea className="col-span-12 row-start-6 row-end-13 ">
        <SalaryDataTable />
      </ScrollArea>
    </div>
  ) : (
    <div className="w-full h-[90vh] ">
      <SalaryDataTableView user={authState.user._id} />
    </div>
  );
};

export default PayrollComponent;
