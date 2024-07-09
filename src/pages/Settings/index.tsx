import React, { useState } from "react";
import { useDispatch, } from "react-redux";
import { changepassword } from "@/store/AuthSlice"; // Adjust the import path as needed
import { AppDispatch, } from "@/store/Store"; // Adjust the import path as needed
import { Button, Input } from "@/components/ui";
import { Label } from "@/components/ui/label";

const SettingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const userId = useSelector((state: RootState) => state.auth.user?._id);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }

    dispatch(changepassword({ oldPassword, newPassword }));
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <div className="w-full h-[90vh] grid grid-cols-12 grid-rows-12">
      <div className="col-span-4 bg-custom-secondaryBackground row-span-6 p-4">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <h2 className="text-xl font-bold">Change Password</h2>
          <Label>
            Old Password:
            <Input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="border p-2 rounded"
              required
            />
          </Label>
          <Label>
            New Password:
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 rounded"
              required
            />
          </Label>
          <Label>
            Confirm New Password:
            <Input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="border p-2 rounded"
              required
            />
          </Label>
          <Button
            type="submit"
            className="bg-custom-mainColor/80 text-white p-2 rounded"
          >
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
