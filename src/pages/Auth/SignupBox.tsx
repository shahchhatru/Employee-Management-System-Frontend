import { Input, Button } from "@/components/ui";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/Store";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { signup } from "@/store/AuthSlice";

// Define the validation schema for signup
const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: z.string(),
});

interface SignupBoxProps {
  className?: string;
}

function SignupBox({ className }: SignupBoxProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateEmail = (value: string) => {
    try {
      signupSchema.pick({ email: true }).parse({ email: value });
      setErrors((prevErrors) => ({ ...prevErrors, email: undefined }));
      if (value == "") {
        setErrors({});
      }
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: error.errors[0]?.message,
      }));
    }
  };

  const validatePassword = (value: string) => {
    try {
      signupSchema.pick({ password: true }).parse({ password: value });
      setErrors((prevErrors) => ({ ...prevErrors, password: undefined }));
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: error.errors[0]?.message,
      }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignup = async () => {
    let response;
    try {
      signupSchema.parse({ email, password, confirmPassword });
      console.log({ email, password, confirmPassword });
      if (password === confirmPassword) {
        if (email !== "" && password.length >= 8) {
          response = await dispatch(
            signup({ name: username, email, password })
          ).unwrap();
          window.alert(JSON.stringify(response));
          console.log("Signup called");
          navigate("auth/emailsent");
        }
      }
    } catch (e) {
      if (e instanceof z.ZodError) {
        const fieldErrors = e.flatten().fieldErrors;
        setErrors({
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0],
          confirmPassword:
            password == confirmPassword ? "" : "the password donot match",
        });
      }
      setTimeout(
        () => {
          setErrors({});
          setEmail(""), setPassword(""), setConfirmPassword("");
          setUsername("");
        },

        2000
      );
    }
  };

  return (
    <div
      className={`w-full h-full flex flex-col md:justify-center ${className}`}
    >
      <div className="p-4 w-full rounded-md">
        <span className=" font-anekMalayalam text-md">
          Register your Organization with us
        </span>
      </div>
      <div className="p-4 w-full rounded-md">
        <Input
          type="text"
          placeholder="Organization Name"
          className="focus:border-custom-reddanger"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="p-4 w-full rounded-md">
        <Input
          type="email"
          placeholder="Email"
          className="focus:border-custom-reddanger"
          value={email}
          onChange={handleEmailChange}
        />
        {errors.email && (
          <span className="text-red-500 text-sm"> {errors.email} </span>
        )}
      </div>
      <div className="p-4 w-full rounded-md">
        <Input
          type="password"
          placeholder="Password"
          className="focus:border-custom-reddanger"
          value={password}
          onChange={handlePasswordChange}
        />
        {errors.password && (
          <span className="text-red-500 text-sm"> {errors.password} </span>
        )}
      </div>
      <div className="p-4 w-full rounded-md">
        <Input
          type="password"
          placeholder="Confirm Password"
          className="focus:border-custom-reddanger"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {" "}
            {errors.confirmPassword}{" "}
          </span>
        )}
      </div>
      <div className="p-4 w-full grid grid-cols-12">
        <div className="col-start-1 col-end-5 flex items-center space-x-2">
          {" "}
        </div>
        <div className="col-start-7 col-end-13 flex justify-end">
          <span className="text-red-400 cursor-pointer  text-sm lg:text-md">
            Already have an account ?
          </span>
          <Link
            to="/auth/login"
            className="text-black ml-2 cursor-pointer text-sm lg:text-md"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="w-full p-4">
        <Button
          className="bg-custom-mainColor text-custom-cardTagText rounded-full w-full mb-4  hover:bg-custom-mainColor/65"
          onClick={handleSignup}
        >
          Signup
        </Button>
      </div>
    </div>
  );
}

export default SignupBox;
