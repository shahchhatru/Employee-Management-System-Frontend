import Lottie from "lottie-react";
import celebrationAnimation from "@/assets/animations/celebration-red.json";

function HelloCard({ name }: { name: string }) {
  return (
    <div className="col-span-3 row-span-4 bg-custom-secondaryBackground rounded p-4 flex">
      <div className="flex flex-col">
        <h1 className="text-custom-headingText">Hello</h1>
        <div className=" flex items-center  mt-4 p-2 text-custom-primaryText">
          <span className="w-4/5">Welcome back</span>

          <span className="w-1/5 ">
            <Lottie animationData={celebrationAnimation} loop={false} />
          </span>
        </div>
        <div className="w-full">
          <span className="text-custom-primaryText text-sm p-2">
            Good to see you again ,
          </span>
          <span>
            <b>{name}</b>
          </span>
        </div>
      </div>
    </div>
  );
}

function EmployeeCard() {
  return (
    <div className="col-span-3 row-span-4 bg-custom-secondaryBackground rounded p-4 flex flex-row items-center">
      <div className="h-full w-fit text-7xl flex flex-col justify-center items-center">
        <div className="w-full ">10K +</div>
      </div>
      <div className="h-full  flex flex-col justify-center items-center gap-2 ml-1">
        <div className="w-full ">
          <span className="text-custom-primaryText">Active</span>
        </div>
        <div className="w-full ">
          <span className="text-custom-primaryText">Employees</span>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="w-full min-h-[90vh] h-full grid grid-cols-12 grid-rows-12 gap-4">
      <HelloCard name="Admin" />
      <EmployeeCard />
    </div>
  );
}
export default Dashboard;
