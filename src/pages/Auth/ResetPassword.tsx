import { Input, Button } from "@/components/ui";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/Store";
import { resetPassword, clearErrors } from "../../store/AuthSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface ResetPasswordProps {
    className?: string;
}

function ResetPasswordComponent({ className }: ResetPasswordProps) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { token } = useParams<{ token: string }>();
    const { error } = useSelector((state: RootState) => state.auth);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearErrors());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            dispatch(clearErrors());
            alert("Passwords do not match");
            return;
        }
        await dispatch(resetPassword({ token, password: newPassword })).unwrap();
        navigate("/login");
    };

    return (
        <div
            className={`w-full h-full flex flex-col md:justify-center ${className}`}
        >
            <div className="p-4 w-full rounded-md">
                <Input
                    type="password"
                    placeholder="New Password"
                    className="focus:border-custom-reddanger"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                {error?.fieldErrors?.password && (
                    <span className="text-red-500 text-sm">
                        {error.fieldErrors.password}
                    </span>
                )}
            </div>
            <div className="p-4 w-full rounded-md">
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    className="focus:border-custom-reddanger"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error?.fieldErrors?.password && (
                    <span className="text-red-500 text-sm">
                        {error.fieldErrors.password}
                    </span>
                )}
            </div>
            <div className="p-4 w-full">
                <Button
                    className="bg-custom-mainColor rounded-full hover:bg-custom-stonewhite hover:text-black text-custom-cardTagText"
                    onClick={handleResetPassword}
                >
                    Reset Password
                </Button>
            </div>
        </div>
    );
}

export default ResetPasswordComponent;
