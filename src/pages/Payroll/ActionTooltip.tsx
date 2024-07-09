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
  Trash2, // Ensure this is correctly imported
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

interface BonusActionTooltipProps {
  userId: string;
}

function BonusActionTooltip({ userId }: BonusActionTooltipProps) {
  const [open, setOpen] = useState(false);
  const [isOpenAddBonus, setIsOpenAddBonus] = useState(false);
  const [isOpenRemoveBonus, setIsOpenRemoveBonus] = useState(false);
  const [isOpenClearBonus, setIsOpenClearBonus] = useState(false);
  const [bonusAmount, setBonusAmount] = useState("");

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
