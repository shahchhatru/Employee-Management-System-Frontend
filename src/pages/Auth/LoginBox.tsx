import { Input, Checkbox, Button } from "@/components/ui";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/Store";
import {
    login,
    setEmail,
    setPassword,
    clearErrors,
} from "../../store/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface LoginBoxProps {
    className?: string;
}

function LoginBox({ className }: LoginBoxProps) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const authState = useSelector((state: RootState) => state.auth);
    const { email, password, error } = authState;

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearErrors());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const handleLogin = async () => {
        await dispatch(login({ email, password })).unwrap();
        navigate("/");
    };

    return (
        <div
            className={`w-full h-full flex flex-col md:justify-center ${className}`}
        >
            <div className="p-4 w-full rounded-md">
                <Input
                    type="email"
                    placeholder="Email"
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
            <div className="p-4 w-full rounded-md">
                <Input
                    type="password"
                    placeholder="Password"
                    className="focus:border-custom-reddanger"
                    value={password}
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                />
                {error?.fieldErrors?.password && (
                    <span className="text-red-500 text-sm">
                        {error.fieldErrors.password}
                    </span>
                )}
            </div>
            <div className="p-4 w-full grid grid-cols-12">
                <div className="col-start-1 col-end-5 flex items-center space-x-2">
                    <Checkbox id="remember-me" />
                    <label
                        htmlFor="remember-me"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Remember Me
                    </label>
                </div>
                <div className="col-start-8 col-end-13 flex justify-end">
                    <Link to="resetlink" className="text-red-400 cursor-pointer">
                        Forget password?
                    </Link>
                </div>
            </div>
            <div className="w-full p-4">
                <Button
                    className="bg-custom-reddanger rounded-full w-1/3 hover:bg-custom-stonewhite hover:text-black text-card-foreground"
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </div>
        </div>
    );
}

export default LoginBox;    