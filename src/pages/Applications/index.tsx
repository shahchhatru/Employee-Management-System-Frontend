import Lottie from "lottie-react";
import { RootState } from "../../store/Store";
import { useSelector } from "react-redux";
import celebrationAnimation from "@/assets/animations/celebration-red.json";
import {
  useGetApplicationByOrgQuery,
  useGetApplicationBySupervisorQuery,
  useGetApplicationByUserQuery,
} from "@/store/ApplicationSlice";
import ApplicationTable from "./ApplicationDataTable";
import AddApplicationForm from "./EditApplicationBox";
import { ScrollArea } from "@/components/ui";

function ApplicationsPage() {
  const authState = useSelector((state: RootState) => state.auth);
  const { data, isLoading, isError } = useGetApplicationByOrgQuery();
  const {
    data: supervisordata,
    isLoading: isSuperLoading,
    isError: isSuperError,
  } = useGetApplicationBySupervisorQuery(authState.user._id);
  const {
    data: userapplicationdata,
    isLoading: userapplicationisLoading,
    isError: userapplicationisError,
  } = useGetApplicationByUserQuery(authState.user._id);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (authState.user.role === "SUPERVISOR") {
    if (isSuperLoading) {
      return <div>Loading...</div>;
    }

    if (isSuperError) {
      return <div>Error</div>;
    }
  }

  if (authState.user.role === "EMPLOYEE") {
    if (userapplicationisLoading) {
      return <div>Loading...</div>;
    }

    if (userapplicationisError) {
      return <div>Error</div>;
    }
  }
  return (
    <>
      {authState.user.role === "ADMIN" ? (
        <div className="w-full border-red-400 border-4 min-h-[90vh] flex flex-col">
          <div className="w-full flex">
            {authState.user.role !== "ADMIN" && (
              <div className="w-2/5 h-full flex justify-center items-center mt-4">
                <AddApplicationForm
                  update={false}
                  className="p-4 rounded bg-custom-mainColor text-custom-cardTagText "
                />
              </div>
            )}
          </div>
          {/* <div className="w-full flex">
            {JSON.stringify(data.data, null, 2)}
          </div> */}
          {authState.user.role === "ADMIN" ? (
            <>
              <ScrollArea className="h-[90vh]">
                <div className="ml-4 capitalize text-custom-headingText">
                  All Applications
                </div>
                <ApplicationTable data={data?.data || []} />
                <div className="ml-4 capitalize text-custom-headingText">
                  Application where you are supervisor
                </div>
                <ApplicationTable data={supervisordata?.data || []} />
              </ScrollArea>
            </>
          ) : authState.user.role === "SUPERVISOR" ? (
            <ScrollArea className="h-[78vh]">
              <div className="ml-4 capitalize text-custom-headingText">
                Application where you are supervisor
              </div>
              <ApplicationTable data={supervisordata?.data || []} />
              <div className="ml-4 capitalize text-custom-headingText">
                Your applications
              </div>
              <ApplicationTable data={userapplicationdata?.data || []} />
            </ScrollArea>
          ) : (
            <ScrollArea className="h-[80vh]">
              <div className="ml-4 capitalize text-custom-headingText">
                Your applications
              </div>
              <ApplicationTable data={userapplicationdata?.data || []} />
            </ScrollArea>
          )}
        </div>
      ) : authState.user.role === "SUPERVISOR" ? (
        <div>This is supervisor panel view</div>
      ) : (
        <div>This is user panel view</div>
      )}
    </>
  );
}

export default ApplicationsPage;
