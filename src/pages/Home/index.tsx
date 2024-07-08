import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/Store";
export default function Home() {
  const AuthState = useSelector((state: RootState) => state.auth);
  return (
    <div className="text-custom-headingText bg-custom-primaryBackground flex w-full h-full gap-2">
      {AuthState.user.role === "ADMIN" ? <Sidebar /> : ""}

      {/* Dashboard */}
      <div className="flex-1 h-full bg-custom-primaryBackground rounded-lg  p-2 mr-4 flex flex-col">
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
