import AddEmployeeForm from "./AddEmployeeForm";
const EmployeePage = () => {
  return (
    <div className="border-red-400 border-2 w-full h-[95vh] p-2">
      Employee Page
      <AddEmployeeForm update={false} />
    </div>
  );
};

export default EmployeePage;
