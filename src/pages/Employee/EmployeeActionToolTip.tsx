import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types/employee";
import { useDeleteEmployeeMutation } from "@/store/EmployeeSlice";
import AddEmployeeForm from "./AddEmployeeForm";
import EmployeeDetailModel from "./EmployeeDetailModel";

interface ActionTooltipProps {
  id: string;
  employeeDetails?: Employee;
}

function ActionTooltip({ id, employeeDetails }: ActionTooltipProps) {
  const [open, setOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [deleteEmployee, { isLoading: isDeleteLoading }] =
    useDeleteEmployeeMutation();

  const handleDelete = async () => {
    setIsOpenDelete(false);
    await deleteEmployee({ id });
  };

  const handleCloseDelete = () => {
    setIsOpenDelete(false);
  };

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger onMouseEnter={() => setOpen(true)}>
        <Ellipsis />
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-row items-center gap-2 justify-around">
          {/* Delete Confirmation Dialog */}
          <div>
            <Dialog open={isOpenDelete} onOpenChange={setIsOpenDelete}>
              <DialogTrigger
                className="hover:bg-custom-reddanger rounded p-2"
                onClick={() => setIsOpenDelete(true)}
              >
                <Trash2 className="text-red-700 hover:text-custom-primaryText" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    Are you sure you want to delete this?
                  </DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isDeleteLoading}
                  >
                    {isDeleteLoading ? "Deleting..." : "Yes"}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleCloseDelete}
                    disabled={isDeleteLoading}
                  >
                    No
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <EmployeeDetailModel employeeDetails={employeeDetails} />
          </div>

          <AddEmployeeForm
            update={true}
            text={false}
            {...employeeDetails}
            user={employeeDetails?.user._id}
            className="text-custom-mainColor/50"
          />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default ActionTooltip;
