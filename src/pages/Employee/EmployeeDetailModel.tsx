import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Employee } from "@/types/employee";
import { useState } from "react";
import { Eye, Mail, DollarSign, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
interface EmployeeDetailModelProps {
  employeeDetails?: Employee;
}

const EmployeeDetailModel = ({ employeeDetails }: EmployeeDetailModelProps) => {
  const [isOpenDetails, setIsOpenDetails] = useState(false);
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
          <Eye className="text-green-400" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] text-custom-headingText">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>
          <div className="p-4 bg-custom-secondaryBackground rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <User className="h-8 w-8 text-custom-primaryText mr-2" />
              <h2 className="text-lg font-semibold capitalize">
                {employeeDetails?.user.name}
              </h2>
            </div>
            <div className="mb-2 flex items-center">
              <Mail className="h-5 w-5 text-custom-primaryText mr-2" />
              <p className="text-custom-primaryText">
                {employeeDetails?.user.email}
              </p>
            </div>
            <div className="mb-2 flex items-center">
              <Calendar className="h-5 w-5 text-custom-primaryText mr-2" />
              <p className="text-custom-primaryText">
                Joining Date:{" "}
                {new Date(employeeDetails?.joiningDate).toLocaleDateString()}
              </p>
            </div>
            <div className="mb-2 flex items-center">
              <DollarSign className="h-5 w-5 text-custom-primaryText mr-2" />
              <p className="text-custom-primaryText">
                Salary: ${employeeDetails?.salary}
              </p>
            </div>
            <div className="mb-2 flex items-center text-custom-primaryText">
              <p className="text-custom-primaryText">Designation:</p>
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
  );
};
export default EmployeeDetailModel;
