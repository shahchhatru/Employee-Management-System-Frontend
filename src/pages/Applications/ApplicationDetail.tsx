import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ApplicationTypeReturn } from "@/types/application";
import { useState } from "react";
import { Eye, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteApplicationMutation } from "@/store/ApplicationSlice";
import { toast } from "sonner";
import AddApplicationForm from "./EditApplicationBox";

interface ApplicationDetailsModelProps {
  applicationDetails?: ApplicationTypeReturn;
}

const ApplicationDetailModel = ({
  applicationDetails,
}: ApplicationDetailsModelProps) => {
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [deleteApplication, { isLoading: isDeleteLoading }] =
    useDeleteApplicationMutation();

  const handleOpenDetails = () => {
    setIsOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setIsOpenDetails(false);
  };

  const handleDelete = async () => {
    try {
      await deleteApplication({ id: applicationDetails._id }).unwrap();
      toast.success("Application deleted successfully");
      setIsOpenDetails(false);
    } catch (error) {
      toast.error(`Failed to delete application: ${JSON.stringify(error)}`);
    }
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
          <div className="p-4 bg-custom-cardBackground rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <User className="h-8 w-8 text-custom-primaryText mr-2" />
              <h2 className="text-lg font-semibold capitalize">
                {applicationDetails?.user.name}
              </h2>
            </div>
            <div className="mb-2 flex items-center">
              <p className="text-custom-cardTagText bg-custom-mainColor rounded px-4 py-2">
                {applicationDetails?.user.role}
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mb-2 flex items-center gap-4">
                <span className="capitalize">Type:</span>
                <span>{applicationDetails?.type}</span>
              </div>
              <p className="bg-custom-cardBackground rounded px-4 py-2">
                {applicationDetails?.text}
              </p>
              <div className="flex w-full justify-end">
                <AddApplicationForm
                  update={true}
                  type={applicationDetails?.type}
                  id={applicationDetails?._id}
                  text={applicationDetails?.text}
                  supervisor={applicationDetails?.supervisor._id}
                  className="p-4 rounded bg-custom-mainColor text-custom-cardTagText"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCloseDetails}>Close</Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              disabled={isDeleteLoading}
            >
              {isDeleteLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationDetailModel;
