import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/Store";
import {
  setApplicationState,
  setText,
  setType,
  setSupervisor,
  setInitialState,
} from "@/store/ApplicationStateSlice";
import { toast } from "sonner";
import SelectBox from "./SelectBox";
import UserSelect from "../components/UserSelectBox";

export interface ApplicationInputProps {
  id?: string;
  text?: string;
  type?: string;
  supervisor?: string;
  update?: boolean;
  className?: string;
}

const AddApplicationForm = ({
  id,
  text,
  type,
  supervisor,
  update = false,
  className,
}: ApplicationInputProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (update) {
      dispatch(
        setApplicationState({
          text,
          type,
          supervisor,
        })
      );
    }
  }, [update, text, type, supervisor, dispatch]);

  const applicationState = useSelector(
    (state: RootState) => state.applicationState
  );

  const handleSave = async () => {
    try {
      // Add your save logic here
      toast.success(
        `Application ${update ? "updated" : "created"} successfully`
      );
      dispatch(setInitialState());
    } catch (error) {
      toast.error(`Failed to save application: ${error}`);
      dispatch(setInitialState());
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className={className}>
        <span>{update ? "Edit Application" : "Add Application"}</span>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[70vw]">
        <AlertDialogHeader className="w-full">
          <AlertDialogTitle>
            {update ? "Update Application" : "Create Application"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="grid grid-cols-2 gap-4 p-4">
          <span className="flex flex-col">
            <label htmlFor="text">Text</label>
            <input
              type="text"
              id="text"
              className="p-2 border rounded"
              value={applicationState.text}
              onChange={(e) => dispatch(setText(e.target.value))}
            />
          </span>
          {/*  LEAVE = 'LEAVE',
    TASK = 'TASK',
    URGENT = 'URGENT',
    OTHER = 'OTHER',
    RESIGNATION = 'RESIGNATION',
 */}
          <span className="flex flex-col w-full">
            <label htmlFor="type">Type</label>
            <SelectBox
              options={[
                { value: "LEAVE", label: "LEAVE" },
                { value: "TASK ", label: "TASK" },
                { value: "URGENT", label: "URGENT" },
                { value: "RESIGNATION", label: "RESIGNATION" },
                { value: "OTHER", label: "OTHER" },
              ]}
              value={applicationState.type}
              onChange={(value) => dispatch(setType(value))}
              placeholder="Select type"
            />
          </span>
          <span className="flex flex-col w-full">
            <label htmlFor="supervisor">Supervisor</label>
            <UserSelect
              defaultValue={applicationState.supervisor}
              onChange={(value) => dispatch(setSupervisor(value))}
              placeholder="Select supervisor"
            />
          </span>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => dispatch(setInitialState())}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-custom-mainColor hover:bg-custom-mainColor/70 text-custom-cardTagText"
            onClick={handleSave}
          >
            {update ? "Update" : "Create"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddApplicationForm;
