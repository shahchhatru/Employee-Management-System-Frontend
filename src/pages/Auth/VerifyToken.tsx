
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyOrganizationMutation } from "@/store/OrganizationSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/Store";
import { toast } from "sonner";

interface VerifyProps {
    className?: string;
}

function VerifyTokenBox({ className }: VerifyProps) {
    const navigate = useNavigate();
    const { otp } = useParams<{ otp: string }>();
    const authState = useSelector((state: RootState) => state.auth);
    const [verifyOrganization] = useVerifyOrganizationMutation();

    const handleVerify = async () => {
        const userId = authState.user?.organization;
        console.log("authState.user", +JSON.stringify(authState.user));
        try {
            if (authState.user?.isVerified) {
                throw new Error("The user is already verified");
            }
            if (!otp) throw new Error("OTP is not defined");
            if (!userId) throw new Error("User ID is not defined");

            const response = await verifyOrganization({ otp, user: userId }).unwrap();
            toast.success(JSON.stringify(response));
            navigate("/auth/login");
        } catch (error: any) {
            console.error(error);
            toast.error(error.message); // Provide user feedback
        }
    };

    return (
        <div className={`w-full md:h-full flex flex-col md:justify-center items-center ${className}`}>
            <div className="w-full md:h-[60%] flex flex-col md:justify-between justify-center">
                <div className="p-4 w-full rounded-md flex justify-center">
                    <span className="dm-sans-200 text-xl text-center scale-150">
                        Enter the OTP code
                    </span>
                </div>
                <div className="p-4 w-full rounded-md flex justify-center scale-150">
                    <InputOTP maxLength={6} value={otp}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <div className="w-full p-4">
                    <Button
                        className="p-8 bg-custom-reddanger w-full rounded-full hover:bg-custom-stonewhite hover:text-black text-card-foreground text-2xl"
                        onClick={handleVerify}
                    >
                        Verify
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default VerifyTokenBox;
