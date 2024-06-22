import Lottie from "lottie-react";
import signupAnimation from "@/assets/animations/signup_animation.json";
import { Outlet } from "react-router-dom";
const AuthPage = () => {
  return (
    <div className="w-full min-h-[90vh] h-full flex justify-center items-center ">
      {/* container login */}
      <div className="h-[50vh] md:h-[70vh] w-4/5 md:w-6/12 p-4 rounded-md grid grid-cols-12 grid-rows-12 shadow-lg">
        <div className="row-start-1 row-end-7 lg:row-end-13 col-start-1 col-end-13 lg:col-end-6 flex md:p-2 justify-center md:items-center">
          <Lottie
            animationData={signupAnimation}
            loop={false}
            style={{ transform: "scale(0.7)" }}
          />
        </div>

        <div className=" row-start-7 lg:row-start-1 row-end-13 col-start-1 lg:col-start-6 col-end-13 flex flex-col justify-center items-center">
          <div className="  h-[10%] w-full md:flex justify-end items-center dm-sans-200 mt-4">
            <span className=" mr-4 dm-sans-100 hidden md:visible">
              Navigate to
            </span>
            {/* <Button className='rounded-full bg-custom-bluishpurple hover:bg-background hover:text-foreground' onClick={handleToggle}>{isLogin?'Signup':"Login"}</Button>
             */}
          </div>
          <div className="w-full  lg:h-[90%] mt-12 md:mt-0 z-10 lg:z-2 scale-75 lg:scale-100">
            <Outlet />
          </div>
        </div>
        {/* <AnimatedLoginSignupBoxes /> */}
      </div>
    </div>
  );
};

export default AuthPage;
