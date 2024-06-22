import {
  NavigationMenu,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";

import { logout } from "@/store/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    dispatch(logout());
  };

  return (
    <NavigationMenu className="min-w-full flex justify-between bg-custom-primaryBackground">
      <NavigationMenuList className="w-1/3"> </NavigationMenuList>
      <NavigationMenuList className="w-1/3"> </NavigationMenuList>
      {/* Set the width to full using Shadcn UI */}
      <NavigationMenuList className="py-2 flex">
        {location.pathname === "/login" ? (
          <>
            <NavigationMenuItem className="hidden md:flex justify-center items-center mr-4 dm-sans-200">
              Don't have an account, signup now?
            </NavigationMenuItem>
            <NavigationMenuItem className="mr-12">
              <Link
                to="/login/signup"
                className={`${navigationMenuTriggerStyle()} p-4 min-w-24 rounded-full bg-custom-mainColor hover:bg-custom-mainColor/70 text-custom-cardTagText hover:text-custom-cardTagText cursor-pointer`}
              >
                Signup
              </Link>
            </NavigationMenuItem>
          </>
        ) : location.pathname === "/" ? (
          <NavigationMenuItem className="mr-12">
            <span
              onClick={() => handleLogout()}
              className={`${navigationMenuTriggerStyle()} p-4 min-w-24 rounded-full bg-custom-mainColor hover:bg-custom-mainColor/70 text-custom-cardTagText hover:text-custom-cardTagText cursor-pointer`}
            >
              Logout
            </span>
          </NavigationMenuItem>
        ) : (
          <>
            <NavigationMenuItem className="hidden md:flex justify-center items-center mr-4 dm-sans-200 ">
              Already have an account, signIn now ?
            </NavigationMenuItem>
            <NavigationMenuItem className="mr-12">
              <Link
                to="/login"
                className={`${navigationMenuTriggerStyle()} p-4 min-w-24 rounded-full bg-custom-mainColor hover:bg-custom-mainColor/70 text-custom-cardTagText hover:text-custom-cardTagText cursor-pointer`}
              >
                Login
              </Link>
            </NavigationMenuItem>
          </>
        )}
        <NavigationMenuItem
          className={` ${cn(
            location.pathname === "/" ? "flex" : "hidden"
          )} justify-center items-center mr-4 cursor-pointer`}
        ></NavigationMenuItem>
        <NavigationMenuItem className="mr-12">
          <ModeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
