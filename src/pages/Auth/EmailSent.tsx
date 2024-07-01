import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";

interface ResetLinkSentProps {
    className?: string;
}

function EmailSent({ className }: ResetLinkSentProps) {
    const { email } = useSelector((state: RootState) => state.auth);

    return (
        <div
            className={`w-full h-full flex flex-col items-center justify-center ${className}`}
        >
            <div className="p-4 w-full rounded-md text-center">
                <span className="text-green-500 text-lg">
                    A reset link has been sent to {email}. Please check your email.
                </span>
            </div>
        </div>
    );
}

export default EmailSent;
