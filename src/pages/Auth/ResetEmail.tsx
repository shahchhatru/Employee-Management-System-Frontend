import { Input, Button } from "@/components/ui";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/Store";
import { setEmail, clearErrors, forgotPassword } from "../../store/AuthSlice";
import { useEffect } from "react";

interface ResetEmailProps {
    className?: string;
}

function ResetEmailComponent({ className }: ResetEmailProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { email, error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearErrors());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const handleSendResetEmail = async () => {
        await dispatch(forgotPassword(email)).unwrap();
    };

    return (
        <div
            className={`w-full h-full flex flex-col md:justify-center ${className}`}
        >
            <div className="p-4 w-full rounded-md">
                <Input
                    type="email"
                    placeholder="Enter your email"
                    className="focus:border-custom-reddanger"
                    value={email}
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                />
                {error?.fieldErrors?.email && (
                    <span className="text-red-500 text-sm">
                        {error.fieldErrors.email}
                    </span>
                )}
            </div>
            <div className="p-4 w-full">
                <Button
                    className="bg-custom-mainColor rounded-full hover:bg-custom-stonewhite hover:text-black text-custom-cardTagText"
                    onClick={handleSendResetEmail}
                >
                    Send Reset Link
                </Button>
            </div>
        </div>
    );
}

export default ResetEmailComponent;
