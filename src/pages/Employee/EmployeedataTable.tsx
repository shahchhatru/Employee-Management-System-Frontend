import { useGetEmployeeQuery } from "@/store/EmployeeSlice";
import { EmployeeResponse } from "@/types";

function EmployeeDataTable() {
  const { data, isLoading, error } = useGetEmployeeQuery();
  if (isLoading) {
    return <div>Loading ....</div>;
  }
  if (error) {
    if ("message" in error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
          An unknown error occurred
          <pre>{JSON.stringify(data)}</pre>
          <pre>{JSON.stringify(error)}</pre>
        </div>
      );
    }
  }

  return (
    <div>
      Hello from Employee Data Table
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}

export default EmployeeDataTable;
