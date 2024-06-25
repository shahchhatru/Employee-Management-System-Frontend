import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { FilePenLine } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/Store";
import {
  updateProfileState,
  setFirstname,
  setLastname,
  setEmail,
  setPhone,
  setAddress,
  setCity,
  setState,
  setZip,
  setSays,
  setImage,
} from "@/store/UpdateProfileSlice";
import { ProfileInput } from "@/types/Profile";
import { useEffect } from "react";
import { useUpdateProfileMutation } from "@/store/ProfileSlice";
import { toast } from "sonner";
const EditProfileForm = ({
  firstname,
  lastname,
  email,
  phone,
  address,
  city,
  state,
  zip,
  says,
  image,
}: ProfileInput) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleUpdate = async (updatedProfile: Partial<ProfileInput>) => {
    while (isLoading);
    try {

      const response = await updateProfile(updatedProfile).unwrap();
      toast.success(`Profile updated successfully ${JSON.stringify(response)}`);
    } catch (error) {
      toast.error("Failed to update profile:", error);
    }
  };
  const dispatch = useDispatch();
  const profileState = useSelector((state: RootState) => state.updateProfile);
  useEffect(() => {
    dispatch(
      updateProfileState({

        firstname,
        lastname,
        email,
        phone,
        address,
        city,
        state,
        zip,
        says,
        image,
      })
    );
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-fit bg-custom-mainColor/80 p-4 m-2 rounded flex gap-2">
        <FilePenLine /> <span>Edit</span>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[70vw]">
        <AlertDialogHeader className="w-full">
          <AlertDialogTitle>Update Your Profile Information</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="grid grid-cols-2 gap-4 p-4">
          <div className="flex flex-col">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              className="p-2 border rounded"
              value={profileState.firstname}
              onChange={(e) => dispatch(setFirstname(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              className="p-2 border rounded"
              value={profileState.lastname}
              onChange={(e) => dispatch(setLastname(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="p-2 border rounded"
              value={profileState.email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              className="p-2 border rounded"
              value={profileState.phone}
              onChange={(e) => dispatch(setPhone(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              className="p-2 border rounded"
              value={profileState.address}
              onChange={(e) => dispatch(setAddress(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              className="p-2 border rounded"
              value={profileState.city}
              onChange={(e) => dispatch(setCity(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              className="p-2 border rounded"
              value={profileState.state}
              onChange={(e) => dispatch(setState(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="zip">Zip Code</label>
            <input
              type="text"
              id="zip"
              className="p-2 border rounded"
              value={profileState.zip}
              onChange={(e) => dispatch(setZip(e.target.value))}
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="says">What do you say about yourself?</label>
            <textarea
              id="says"
              className="p-2 border rounded"
              value={profileState.says}
              onChange={(e) => dispatch(setSays(e.target.value))}
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="image">Profile Image URL</label>
            <input
              type="text"
              id="image"
              className="p-2 border rounded"
              value={profileState.image}
              onChange={(e) => dispatch(setImage(e.target.value))}
            />
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-custom-mainColor hover:bg-custom-mainColor/70s text-custom-cardTagText"
            onClick={() => handleUpdate({ ...profileState })}
          >
            Update
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditProfileForm;
