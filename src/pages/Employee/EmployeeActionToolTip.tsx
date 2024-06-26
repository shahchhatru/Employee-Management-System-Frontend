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
import { Trash2, Eye, User, Calendar, Mail, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types/employee";
import { useDeleteEmployeeMutation } from "@/store/EmployeeSlice";
import AddEmployeeForm from "./AddEmployeeForm";

interface ActionTooltipProps {
  id: string;
  employeeDetails?: Employee;
}

function ActionTooltip({ id, employeeDetails }: ActionTooltipProps) {
  const [open, setOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [deleteEmployee, { isLoading: isDeleteLoading }] =
    useDeleteEmployeeMutation();

  const handleDelete = async () => {
    setIsOpenDelete(false);
    await deleteEmployee({ id });
  };

  const handleCloseDelete = () => {
    setIsOpenDelete(false);
  };

  const handleOpenDetails = () => {
    setIsOpenDelete(false);
    setIsOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setIsOpenDetails(false);
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
            <Dialog open={isOpenDetails} onOpenChange={setIsOpenDetails}>
              <DialogTrigger
                className="hover:bg-custom-reddanger rounded p-2"
                onClick={handleOpenDetails}
              >
                <Eye className="text-green-400" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Employee Details</DialogTitle>
                </DialogHeader>
                <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <User className="h-8 w-8 text-blue-500 mr-2" />
                    <h2 className="text-lg font-semibold">
                      {employeeDetails?.user.name}
                    </h2>
                  </div>
                  <div className="mb-2 flex items-center">
                    <Mail className="h-5 w-5 text-gray-600 mr-2" />
                    <p className="text-gray-700">
                      {employeeDetails?.user.email}
                    </p>
                  </div>
                  <div className="mb-2 flex items-center">
                    <Calendar className="h-5 w-5 text-gray-600 mr-2" />
                    <p className="text-gray-700">
                      Joining Date:{" "}
                      {new Date(
                        employeeDetails?.joiningDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mb-2 flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-600 mr-2" />
                    <p className="text-gray-700">
                      Salary: ${employeeDetails?.salary}
                    </p>
                  </div>
                  <div className="mb-2 flex items-center">
                    <p className="text-gray-600">Designation:</p>
                    <p className="ml-1">{employeeDetails?.designation}</p>
                  </div>
                  {/* Add more details as needed */}
                </div>
                <DialogFooter>
                  <Button onClick={handleCloseDetails}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <AddEmployeeForm
            update={true}
            text={false}
            {...employeeDetails}
            className="text-custom-mainColor/50"
          />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default ActionTooltip;
