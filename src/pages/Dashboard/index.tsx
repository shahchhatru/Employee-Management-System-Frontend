import Lottie from "lottie-react";
import celebrationAnimation from "@/assets/animations/celebration-red.json";
import {
  Button,
  ScrollArea,
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui";
import { HandCoins, Terminal } from "lucide-react";

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

function LeaveRequests() {
  return (
    <div className="col-span-3 row-span-4 bg-custom-secondaryBackground rounded p-4 flex flex-col items-center justify-center ">
      <div className="flex flex-row items-center justify-center">
        <div className="h-full w-fit min-w-1/2 text-7xl flex flex-col justify-center items-center">
          <div className="w-full ">12</div>
        </div>
        <div className="h-full  flex flex-col justify-center items-center gap-2 ml-1">
          <div className="w-full ">
            <span className="text-custom-primaryText">Leave</span>
          </div>
          <div className="w-full ">
            <span className="text-custom-primaryText">Requests</span>
          </div>
        </div>
      </div>
      <div>
        <Button
          className="w-full mt-4 hover:bg-custom-mainColor/65 rounded"
          variant="outline"
        >
          View Details
        </Button>
      </div>
    </div>
  );
}

function PayHikeRequests() {
  return (
    <div className="col-span-3 row-span-4 bg-custom-secondaryBackground rounded p-4 flex flex-col items-center justify-center ">
      <div className="flex flex-row items-center justify-center">
        <div className="h-full w-fit min-w-1/2 text-7xl flex flex-col justify-center items-center">
          <div className="w-full ">12</div>
        </div>
        <div className="h-full  flex flex-col justify-center items-center gap-2 ml-1">
          <div className="w-full ">
            <span className="text-custom-primaryText">Pay Hike</span>
          </div>
          <div className="w-full ">
            <span className="text-custom-primaryText">Requests</span>
          </div>
        </div>
      </div>
      <div>
        <Button
          className="w-full mt-4 hover:bg-custom-mainColor/65 rounded"
          variant="outline"
        >
          View Details
        </Button>
      </div>
    </div>
  );
}

function RecentActivities() {
  return (
    <ScrollArea className="col-span-6 row-span-6">
      <Alert className="shadow-md">
        <Terminal className="h-4 w-4 " />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription className="flex gap-4 items-center">
          <span>
            You can add components and dependencies to your app using the cli.
          </span>
          <Button
            className="hover:bg-custom-mainColor/65 rounded"
            variant="outline"
          >
            View Details
          </Button>
        </AlertDescription>
      </Alert>
      <Alert className="shadow-md">
        <Terminal className="h-4 w-4 " />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription className="flex gap-4 items-center">
          <span>
            You can add components and dependencies to your app using the cli.
          </span>
          <Button
            className="hover:bg-custom-mainColor/65 rounded"
            variant="outline"
          >
            View Details
          </Button>
        </AlertDescription>
      </Alert>
    </ScrollArea>
  );
}

function PayRollExpenseBox() {
  return (
    <div className="col-span-3 row-span-4 bg-custom-secondaryBackground rounded p-4 flex flex-col items-center justify-center ">
      <div className="flex flex-row items-center justify-center">
        <div className="h-full w-fit min-w-1/2 text-4xl flex flex-col justify-center items-center mr-4">
          <div className="w-full ">14,80,000</div>
        </div>
        <div className="h-full  flex flex-col justify-center items-center gap-2 ml-1">
          <div className="w-full h-full flex justify-center items-center">
            <HandCoins className="h-12 w-12" />
          </div>
          <div className="w-full ">
            <span className="text-custom-primaryText">Total Expense</span>
          </div>
        </div>
      </div>
      <div>
        <Button
          className="w-full mt-4 hover:bg-custom-mainColor/65 rounded"
          variant="outline"
        >
          View Details
        </Button>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="w-full min-h-[90vh] h-full grid grid-cols-12 grid-rows-12 gap-4">
      <HelloCard name="Admin" />
      <EmployeeCard />
      <LeaveRequests />
      <PayHikeRequests />
      <RecentActivities />
      <PayRollExpenseBox />
    </div>
  );
}
export default Dashboard;
