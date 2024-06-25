import { useGetProfileQuery } from "../../store/ProfileSlice"; // Ensure this path is correct
import { LockKeyhole, Mails, UserRound, TabletSmartphone } from "lucide-react";
import EditProfileForm from "./EditProfileForm";
const ProfilePage = () => {
  const { data, isLoading, error } = useGetProfileQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    if ("message" in error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
          An unknown error occurred
          <pre>{JSON.stringify(data)}</pre>
          <pre>{JSON.stringify(error)}</pre>
        </div>
      );
    }
  }

  if (data) {
    console.log({ data });
  }

  return (
    <div className="w-full bg-custom-primaryBackground border-red-400 border-2 grid grid-cols-12 grid-rows-12 max-h-[95vh] gap-2">
      <div className="col-span-4 row-span-4 bg-custom-secondaryBackground grid grid-cols-12 grid-rows-12">
        <div className="col-start-1 col-end-6 row-start-1 row-end-9 cursor-pointer">
          <img src="src/assets/images/dummyprofile.png" alt="profile" />
        </div>
        <div className="col-start-1 col-end-6 row-start-10 row-end-13 cursor-pointer  flex justify-center items-center text-custom-cardTagText">
          <EditProfileForm
            firstname={data.data[0]?.firstname}
            lastname={data.data[0]?.lastname}
            email={data.data[0]?.email || data.data[0]?.user?.email || ""}
            phone={data.data[0]?.phone || ""}
            address={data.data[0]?.address || ""}
            city={data.data[0]?.city || ""}
            state={data.data[0]?.state || ""}
            zip={data.data[0]?.zip || ""}
            says={data.data[0]?.says || ""}
          />
        </div>
        <div className="col-start-7 col-end-13 row-start-1 row-end-13  flex flex-col justify-evenly px-2 gap-2 ">
          <div className="text-custom-primaryText  capitalize my-2 text-semibold">
            {data?.data[0]?.user?.name}
          </div>
          <div className="text-custom-primaryText flex gap-4">
            <Mails className="text-custom-mainColor" />{" "}
            <span>{data?.data[0]?.user?.email}</span>
          </div>
          <div className="text-custom-primaryText flex gap-4">
            <TabletSmartphone className="text-custom-mainColor" />{" "}
            <span>{data?.data[0]?.phone}</span>
          </div>
          <div className="text-custom-primaryText flex gap-4">
            {data?.data[0]?.user?.role === "ADMIN" ? (
              <LockKeyhole className="text-red-600" />
            ) : (
              <UserRound className="text-custom-mainColor" />
            )}

            <span>{data?.data[0]?.user?.role}</span>
          </div>
        </div>
      </div>
      <div className="col-span-6 row-span-4 bg-custom-secondaryBackground flex flex-col">
        <div className="flex flex-row text-custom-primaryText gap-2 w-1/2 justify-between py-4 px-2">
          <span className="text-custom-headingText uppercase">Full Name</span>{" "}
          <span>{data.data[0]?.firstname}</span>
          <span>{data.data[0]?.lastname}</span>
        </div>
        <div className="flex flex-row text-custom-primaryText gap-2 w-1/2 justify-between py-4 px-2">
          <span className="text-custom-headingText uppercase">Address</span>{" "}
          <span>{data.data[0]?.address}</span>
          <span>{data.data[0]?.city}</span>
          <span>zip({data.data[0]?.zip})</span>
        </div>
        <div className="flex flex-row text-custom-primaryText gap-2 w-1/2 justify-between py-4 px-2">
          <span className="text-custom-headingText uppercase">Thoughts</span>{" "}
          <span>{data.data[0]?.says}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
