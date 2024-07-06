import { RootState } from "@/store/Store";
import { useSelector } from "react-redux";
import AdminView from "./QRBoard";
import QrCodeScanner from "./QRcodeScanner";

const Attendence = () => {
  const authState = useSelector((state: RootState) => state.auth);

  if (authState.user.role === "ADMIN") {
    return (
      <div className="w-full">
        <AdminView />
      </div>
    );
  }
  return <QrCodeScanner />;
};
export default Attendence;
