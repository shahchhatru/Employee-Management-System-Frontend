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
import { generateRandomPassword } from "@/lib/utils";
import { FilePenLine } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/Store";
import {
  setDesignation,
  setSalary,
  setJoiningDate,
  setskills,
  setEmployeeState,
  setInitialState,
  setName,
  setEmail,
  setRole,
  setPassword,
} from "@/store/EmployeeStateSlice";
import { EmployeeInputType, EmployeeWithUserInputType } from "@/types/employee";
import { useEffect } from "react";
import {
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} from "@/store/EmployeeSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui";

export interface EmployeeInputProps extends EmployeeWithUserInputType {
  update: boolean;
  className?: string;
  text?: boolean;
}

const AddEmployeeForm = ({
  designation,
  salary,
  joiningDate,
  skills,
  update,
  name,
  email,
  role,
  password,
  className,
  user,
  text = true,
}: EmployeeInputProps) => {
  const [createEmployee, { isLoading: isCreateLoading }] =
    useCreateEmployeeMutation();
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();
  const dispatch = useDispatch();

  const handleUpdate = async (updatedEmployee: Partial<EmployeeInputType>) => {
    while (isLoading);
    try {
      const response = await updateEmployee({
        id: user,
        employeeData: updatedEmployee,
      }).unwrap();

      toast.success(
        `Employee updated successfully ${JSON.stringify(response)}`
      );
      dispatch(setInitialState());
    } catch (error) {
      toast.error(`Failed to update employee: ${error}`);
      dispatch(setInitialState());
    }
  };

  const handleGeneratePassword = () => {
    const password = generateRandomPassword();
    dispatch(setPassword(password));
  };

  const handleCreate = async (newEmployee: EmployeeInputType) => {
    while (isCreateLoading);
    try {
      const response = await createEmployee(newEmployee).unwrap();
      toast.success(
        `Employee created successfully ${JSON.stringify(response)}`
      );
      dispatch(setInitialState());
    } catch (error) {
      toast.error(`Failed to create employee: ${error}`);
      dispatch(setInitialState());
    }
  };

  useEffect(() => {
    if (update) {
      dispatch(
        setEmployeeState({
          designation,
          salary,
          joiningDate,
          skills,
        })
      );
    }
  }, [update]);

  const employeeState = useSelector((state: RootState) => state.employeeState);

  return (
    <AlertDialog>
      <AlertDialogTrigger className={`${className}`}>
        <FilePenLine /> {text ? <span>{update ? "Edit" : "Add"}</span> : ""}
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[70vw]">
        <AlertDialogHeader className="w-full">
          <AlertDialogTitle>
            {update ? "Update Employee" : "Create Employee"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="grid grid-cols-2 gap-4 p-4">
          <span className="flex flex-col">
            <label htmlFor="designation">Designation</label>
            <input
              type="text"
              id="designation"
              className="p-2 border rounded"
              value={employeeState.designation}
              onChange={(e) => dispatch(setDesignation(e.target.value))}
            />
          </span>
          <span className="flex flex-col">
            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              id="salary"
              className="p-2 border rounded"
              value={employeeState.salary}
              onChange={(e) => dispatch(setSalary(parseFloat(e.target.value)))}
            />
          </span>
          {update ? (
            <></>
          ) : (
            <span className="flex flex-col">
              <label htmlFor="joiningDate">Joining Date</label>
              <input
                type="date"
                id="joiningDate"
                className="p-2 border rounded"
                value={employeeState.joiningDate}
                onChange={(e) => dispatch(setJoiningDate(e.target.value))}
              />
            </span>
          )}
          <span className="flex flex-col">
            <label htmlFor="skills">Skills</label>
            <input
              type="text"
              id="skills"
              className="p-2 border rounded"
              value={employeeState.skills}
              onChange={(e) => dispatch(setskills(e.target.value))}
            />
          </span>

          {!update ? (
            <span className="flex flex-col col-span-1">
              <label htmlFor="user">Username</label>
              <input
                type="text"
                id="name"
                className="p-2 border rounded"
                value={employeeState.name}
                onChange={(e) => dispatch(setName(e.target.value))}
              />
            </span>
          ) : (
            <></>
          )}
          {!update ? (
            <span className="flex flex-col col-span-1">
              <label htmlFor="user">Email</label>
              <input
                type="text"
                id="email"
                className="p-2 border rounded"
                value={employeeState.email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
              />
            </span>
          ) : (
            <></>
          )}
          {!update ? (
            <span className="flex flex-col col-span-1">
              <label htmlFor="user">password</label>
              <span className="flex flex-row w-full">
                <input
                  type="text"
                  id="name"
                  className="p-2 border rounded w-8/10"
                  value={employeeState.password}
                  onChange={(e) => dispatch(setPassword(e.target.value))}
                />
                <Button
                  onClick={handleGeneratePassword}
                  variant="outline"
                  className="ml-2"
                >
                  Generate
                </Button>
              </span>
            </span>
          ) : (
            <></>
          )}
          {!update ? (
            <span className="flex flex-col col-span-1">
              <label htmlFor="user">Role</label>
              <input
                type="text"
                id="email"
                className="p-2 border rounded"
                value={employeeState.role}
                onChange={(e) => dispatch(setRole(e.target.value))}
              />
            </span>
          ) : (
            <></>
          )}
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => dispatch(setInitialState())}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-custom-mainColor hover:bg-custom-mainColor/70 text-custom-cardTagText"
            onClick={() =>
              update
                ? handleUpdate({ ...employeeState })
                : handleCreate(employeeState)
            }
          >
            {update ? "Update" : "Create"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddEmployeeForm;
