import { useGetAdminAttendenceQuery } from "@/store/AttendenceSlice";
import QRCode from "react-qr-code";

const AdminView = () => {
  const { data, error, isLoading } = useGetAdminAttendenceQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading attendance data</div>;

  return (
    <div className="w-full h-[90vh] flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">Admin Attendance</h1>
      <div className="flex justify-center items-center w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
        {data?.data.token && (
          <QRCode
            value={data.data.token}
            style={{ width: "100%", height: "auto" }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminView;
