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

interface SalaryDetailsModelProp {
    year: string;
    month: string;
    userId: string;
}
const SalaryDetailModel = () => {
    const [isOpenDetails, setIsOpenDetails] = useState(false);
    const [month, setMonth] = useState<Month>(Month.JANUARY);
    const [year, setYear] = useState<string>(new Date().getFullYear().toString());
    const handleOpenDetails = () => {
        setIsOpenDetails(true);
    };

    const handleCloseDetails = () => {
        setIsOpenDetails(false);
    };
    return (
        <div>
            <Dialog open={isOpenDetails} onOpenChange={setIsOpenDetails}>
                <DialogTrigger
                    className="hover:bg-custom-reddanger rounded p-2"
                    onClick={handleOpenDetails}
                >
                    <div className="w-full bg-custom-secondaryBackground flex gap-2">
                        <div>
                            <MonthSelect value={month} onChange={setMonth} />
                        </div>
                        <div>
                            <YearSelect />
                        </div>
                        <div>
                            <UserSelect />
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] text-custom-headingText">
                    <DialogHeader>
                        <DialogTitle>Employee Details</DialogTitle>
                    </DialogHeader>

                    <DialogFooter>
                        <Button onClick={handleCloseDetails}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
export default EmployeeDetailModel;
