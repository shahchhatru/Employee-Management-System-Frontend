import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui";
import { useNavigate, useLocation } from "react-router-dom";
import { useVerifyOrganizationMutation } from "@/store/OrganizationSlice";
import { toast } from "sonner";

interface VerifyProps {
  className?: string;
}

function VerifyTokenBox({ className }: VerifyProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [verifyOrganization, { isError, isLoading, isSuccess, data }] =
    useVerifyOrganizationMutation();

  // Parse query parameters
  const searchParams = new URLSearchParams(location.search);
  const otp = searchParams.get("otp");
  const userId = searchParams.get("userId");

  const handleVerify = async () => {
    try {
      while (isLoading);
      if (!otp) throw new Error("OTP is not defined");
      if (!userId) throw new Error("User ID is not defined");

      await verifyOrganization({ otp, user: userId });
      // window.alert(JSON.stringify(data, null, 2));

      if (isSuccess) {
        toast.success(
          "OTP verified successfully" + JSON.stringify(data, null, 2)
        );
        navigate("auth/login");
      } else if (isError) {
        toast.error("Failed to verify OTP" + JSON.stringify(data, null, 2));
      }
    } catch (error: any) {
      console.error(error);
      window.alert(error.message); // Provide user feedback
    }
  };

  return (
    <div
      className={`w-full md:h-full flex flex-col md:justify-center items-center ${className}`}
    >
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
            className="p-8 bg-custom-mainColor w-full rounded-full hover:bg-custom-stonewhite hover:text-black text-card-foreground text-2xl"
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
