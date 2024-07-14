import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Ellipsis,
  PlusCircle,
  MinusCircle,
  DollarSign,
  Trash2,
  Briefcase, // Ensure this is correctly imported
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useAddBonusAmountMutation,
  useRemoveBonusAmountMutation,
  useClearBonusArrayMutation,
  useGetTotalBonusAmountQuery,
} from "@/store/BonusSlice";
import { Month } from "../../enums/month.enum";
import MonthSelect from "../components/MonthSelectBox";
import YearSelect from "../components/YearSelectBox";
import { useAddSalaryMutation } from "@/store/SalarySlice";
import { toast } from "sonner";
interface BonusActionTooltipProps {
  userId: string;
}

function BonusActionTooltip({ userId }: BonusActionTooltipProps) {
  const [open, setOpen] = useState(false);
  const [
    addSalary,
    {
      isError: isAddSalaryError,
      isLoading: isAddSalaryLoading,
      isSuccess: isAddSalarySuccess,
      data: addSalaryData,
    },
  ] = useAddSalaryMutation();
  const [isOpenAddBonus, setIsOpenAddBonus] = useState(false);
  const [isOpenRemoveBonus, setIsOpenRemoveBonus] = useState(false);
  const [isOpenClearBonus, setIsOpenClearBonus] = useState(false);
  const [isOpenAddSalary, setIsOpenAddSalary] = useState(false); // New state for salary dialog
  const [bonusAmount, setBonusAmount] = useState("");
  const [salaryMonth, setSalaryMonth] = useState<Month>();
  const [salaryYear, setSalaryYear] = useState("");
  const [addBonus] = useAddBonusAmountMutation();
  const [removeBonus] = useRemoveBonusAmountMutation();
  const [clearBonusArray] = useClearBonusArrayMutation();
  const { data: totalBonus, refetch: refetchTotalBonus } =
    useGetTotalBonusAmountQuery(userId);

  const handleAddBonus = async () => {
    await addBonus({ userId, bonusAmount: { bonusAmount } });
    setIsOpenAddBonus(false);
    refetchTotalBonus();
  };

  const handleRemoveBonus = async () => {
    await removeBonus({ userId, bonusAmount: { bonusAmount } });
    setIsOpenRemoveBonus(false);
    refetchTotalBonus();
  };

  const handleClearBonus = async () => {
    await clearBonusArray(userId);
    setIsOpenClearBonus(false);
    refetchTotalBonus();
  };

  const handleAddSalary = async () => {
    console.log({ salaryMonth, salaryYear, userId });
    while (isAddSalaryLoading);
    await addSalary({ employee: userId, month: salaryMonth, year: salaryYear });

    if (isAddSalaryError) {
      // setOpen(false);
      toast.error(
        "Error adding salary" + JSON.stringify(addSalaryData, null, 2)
      );
      console.error("Error adding salary:", addSalaryData);
    }
    if (isAddSalarySuccess) {
      // setOpen(false);
      toast.success(
        "Salary added successfully" + JSON.stringify(addSalaryData, null, 2)
      );
      console.log("Salary added successfully:", addSalaryData);
    }
    setIsOpenAddSalary(false);
    // You might want to add a refetch for salary data if needed
  };

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger onMouseEnter={() => setOpen(true)}>
        <Ellipsis />
      </HoverCardTrigger>
      <HoverCardContent>
        <span className="flex flex-row items-center gap-2 justify-around">
          {/* Add Bonus Dialog */}
          <Dialog open={isOpenAddBonus} onOpenChange={setIsOpenAddBonus}>
            <DialogTrigger
              className="hover:bg-green-100 rounded p-2"
              onClick={() => setIsOpenAddBonus(true)}
            >
              <PlusCircle className="text-green-700" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Bonus</DialogTitle>
              </DialogHeader>
              <Input
                type="number"
                value={bonusAmount}
                onChange={(e) => setBonusAmount(e.target.value)}
                placeholder="Enter bonus amount"
              />
              <DialogFooter>
                <Button onClick={handleAddBonus}>Add</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Remove Bonus Dialog */}
          <Dialog open={isOpenRemoveBonus} onOpenChange={setIsOpenRemoveBonus}>
            <DialogTrigger
              className="hover:bg-red-100 rounded p-2"
              onClick={() => setIsOpenRemoveBonus(true)}
            >
              <MinusCircle className="text-red-700" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Remove Bonus</DialogTitle>
              </DialogHeader>
              <Input
                type="number"
                value={bonusAmount}
                onChange={(e) => setBonusAmount(e.target.value)}
                placeholder="Enter bonus amount to remove"
              />
              <DialogFooter>
                <Button variant="destructive" onClick={handleRemoveBonus}>
                  Remove
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Clear Bonus Dialog */}
          <Dialog open={isOpenClearBonus} onOpenChange={setIsOpenClearBonus}>
            <DialogTrigger
              className="hover:bg-yellow-100 rounded p-2"
              onClick={() => setIsOpenClearBonus(true)}
            >
              <Trash2 className="text-yellow-700" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Clear All Bonuses</DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <Button variant="destructive" onClick={handleClearBonus}>
                  Clear All
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Add Salary Dialog */}
          <Dialog open={isOpenAddSalary} onOpenChange={setIsOpenAddSalary}>
            <DialogTrigger
              className="hover:bg-blue-100 rounded p-2"
              onClick={() => setIsOpenAddSalary(true)}
            >
              <Briefcase className="text-blue-700" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Salary</DialogTitle>
              </DialogHeader>
              {/* <Input
                type="text"
                value={salaryMonth}
                onChange={(e) => setSalaryMonth(e.target.value)}
                placeholder="Enter month (e.g., January)"
              /> */}
              <MonthSelect value={salaryMonth} onChange={setSalaryMonth} />
              {/* <Input
                type="number"
                value={salaryYear}
                onChange={(e) => setSalaryYear(e.target.value)}
                placeholder="Enter year (e.g., 2024)"
              /> */}
              <YearSelect value={salaryYear} onChange={setSalaryYear} />
              <DialogFooter>
                <Button onClick={handleAddSalary}>Add Salary</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Total Bonus Display */}
          <span className="flex items-center">
            <span>
              Total: <DollarSign className="text-blue-700" />{" "}
              {totalBonus?.data?.totalBonus || 0}
            </span>
          </span>
        </span>
      </HoverCardContent>
    </HoverCard>
  );
}

export default BonusActionTooltip;
