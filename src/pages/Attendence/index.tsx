import { RootState } from "@/store/Store";
import { useSelector } from "react-redux";
import AdminView from "./QRBoard";
import QrCodeScanner from "./QRcodeScanner";
import { Link } from "react-router-dom";
import AttendenceTableAlert from "./AttendenceTableAlert";
const Attendence = () => {
  const authState = useSelector((state: RootState) => state.auth);

  if (authState.user.role === "ADMIN") {
    return (
      <div className="w-full">
        <div className="w-full ">
          <Link
            to="/"
            className="p-4 bg-custom-mainColor text-custom-cardTagText rounded"
          >
            Home
          </Link>
        </div>
        <AdminView />
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <div className="w-full flex justify-between">
          <Link
            to="/"
            className="p-4 bg-custom-mainColor text-custom-cardTagText rounded"
          >
            Home
          </Link>
          <AttendenceTableAlert />
        </div>
        <QrCodeScanner />
      </div>
    );
  }
};
export default Attendence;
