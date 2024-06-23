import { ModeToggle } from "@/components/mode-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  HomeIcon,
  UserIcon,
  SettingsIcon,
  LogOut,
  LineChart,
  UsersRound,
  Files,
  MessageCircleDashed,
  BellRing,
  HandCoins,
} from "lucide-react";
import { Link } from "react-router-dom";
import { logout } from "../../../store/AuthSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/Store";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };
  return (
    <div className=" w-1/6 flex flex-col h-[99vh] bg-custom-primaryBackground text-custom-primaryText">
      {/* Title and Logo */}
      <div className="flex items-center justify-center p-4 gap-2 bg-custom-mainColor rounded text-custom-cardTagText">
        <img
          src="src/assets/images/dashboard.svg"
          alt="Logo"
          className="h-8 w-8 mr-2 "
        />
        <h1 className="text-xl font-semibold ">My App</h1>
      </div>

      {/* Scroll Area with Navigation Tabs */}
      <ScrollArea className="flex-1 h-[70%]">
        <nav className="flex flex-col p-4">
          <Link
            to="/"
            className="flex items-center gap-2 p-4 my-2 hover:bg-custom-mainColor/60 rounded"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            <span>Home</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center p-4 gap-2  my-2 hover:bg-custom-mainColor/60 rounded"
          >
            <UserIcon className="h-5 w-5 mr-2" />
            <span>Profile</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-2 p-4 my-2 hover:bg-custom-mainColor/60 rounded"
          >
            <SettingsIcon className="h-5 w-5 mr-2" />
            <span>Settings</span>
          </Link>
          {/* Add more buttons as needed */}
          <Link
            to="/analytics"
            className="flex items-center gap-2 p-4 my-2 hover:bg-custom-mainColor/60 rounded"
          >
            <LineChart className="h-5 w-5 mr-2" />
            <span>Analytics</span>
          </Link>
          <Link
            to="/payroll"
            className="flex items-center gap-2 p-4 my-2 hover:bg-custom-mainColor/60 rounded"
          >
            <HandCoins className="h-5 w-5 mr-2" />
            <span>Payroll</span>
          </Link>
          <Link
            to="/employee"
            className="flex items-center gap-2 p-4 my-2 hover:bg-custom-mainColor/60 rounded"
          >
            <UsersRound className="h-5 w-5 mr-2" />
            <span>Employee</span>
          </Link>
          <Link
            to="/application"
            className="flex items-center gap-2 p-4 my-2 hover:bg-custom-mainColor/60 rounded"
          >
            <Files className="h-5 w-5 mr-2" />
            <span>Application</span>
          </Link>
          <Link
            to="/chat"
            className="flex items-center gap-2 p-4 my-2 hover:bg-custom-mainColor/60 rounded"
          >
            <MessageCircleDashed className="h-5 w-5 mr-2" />
            <span>Chats</span>
          </Link>
          <button className="flex items-center gap-2 p-4 my-2 hover:bg-custom-mainColor/60 rounded">
            <BellRing className="h-5 w-5 mr-2" />
            <span>Notifications</span>
          </button>
        </nav>
      </ScrollArea>

      {/* Logout Button */}
      <div className="p-4 bg-custom-secondaryBackground rounded flex items-center justify-evenly">
        <button
          className="flex items-center  p-4 hover:bg-red-600 hover:text-white rounded w-3/5"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          <span>Logout</span>
        </button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
