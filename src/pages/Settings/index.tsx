import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changepassword } from "@/store/AuthSlice"; // Adjust the import path as needed
import { RootState } from "@/store/Store"; // Adjust the import path as needed

const SettingsPage = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.auth.user?._id);

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

    };

    return (
        <div className="w-full h-[90vh] border-red-400 border-8 grid grid-cols-12 grid-rows-12">
            <div className="col-span-4 bg-custom-secondaryBackground row-span-4 p-4">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <h2 className="text-xl font-bold">Change Password</h2>
                    <label>
                        Old Password:
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="border p-2 rounded"
                            required
                        />
                    </label>
                    <label>
                        New Password:
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border p-2 rounded"
                            required
                        />
                    </label>
                    <label>
                        Confirm New Password:
                        <input
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="border p-2 rounded"
                            required
                        />
                    </label>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;
