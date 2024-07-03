import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import MonthSelect, { Month } from "../components/MonthSelectBox";
import YearSelect from "../components/YearSelectBox";
import UserSelect from "../components/UserSelectBox";
import { Button } from "@/components/ui/button";
import SalaryDataTableView from "./ModalSalaryDataTable";

interface SalaryDetailsModelProp {
  userId?: string;
}
const SalaryDetailModel = ({ userId }: SalaryDetailsModelProp) => {
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [month, setMonth] = useState<Month>(Month.JANUARY);
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [user, setUser] = useState<string>(userId ? userId : "");
  const handleOpenDetails = () => {
    setIsOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setIsOpenDetails(false);
  };
  return (
    <div className="w-full flex gap-2 justify-center items-center">
      <div>
        <MonthSelect value={month} onChange={setMonth} />
      </div>
      <div>
        <YearSelect value={year} onChange={setYear} />
      </div>
      <div>
        <UserSelect defaultValue={user} onChange={setUser} />
      </div>
      <div>
        <Dialog open={isOpenDetails} onOpenChange={setIsOpenDetails}>
          <DialogTrigger
            className="hover:bg-custom-reddanger rounded p-2"
            onClick={handleOpenDetails}
          >
            Search
          </DialogTrigger>
          <DialogContent className="sm:max-w-full w-full text-custom-headingText">
            <DialogHeader>
              <DialogTitle>SalaryDataTable</DialogTitle>
            </DialogHeader>
            <SalaryDataTableView month={month} year={year} user={user} />
            <DialogFooter>
              <Button onClick={handleCloseDetails}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default SalaryDetailModel;
