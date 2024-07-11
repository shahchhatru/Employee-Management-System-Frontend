import { ThemeProvider } from "@/components/theme-provider";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  AuthPage,
  SignupBox,
  EmployeePage,
  PayrollPage,
  Dashboard,
  LoginBox,
  ApplicationsPage,
  ProfilePage,
  SettingsPage,
  VerifyTokenBox,
} from "./pages";
import ResetEmailComponent from "./pages/Auth/ResetEmail";
import EmailSent from "./pages/Auth/EmailSent";
import ResetPasswordComponent from "./pages/Auth/ResetPassword";
import Attendence from "./pages/Attendence";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div
          style={{ width: "100%", height: "100%" }}
          className="bg-custom-primaryBackground min-h-screen"
        >
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" Component={Home}>
              <Route path="/" Component={Dashboard} />
              <Route path="/employee" Component={EmployeePage} />
              <Route path="/payroll" Component={PayrollPage} />
              <Route path="/attendence" Component={Attendence} />
              <Route path="/application" Component={ApplicationsPage} />
              <Route path="/profile" Component={ProfilePage} />
              <Route path="/settings" Component={SettingsPage} />
            </Route>

            <Route path="/auth" element={<AuthPage />}>
              <Route path="login" Component={LoginBox} />
              <Route path="signup" Component={SignupBox} />
              <Route path="resetemail" Component={ResetEmailComponent} />
              <Route path="emailsent" Component={EmailSent} />
              <Route
                path="resetpassword/:token"
                Component={ResetPasswordComponent}
              />
              <Route path="verifyToken" Component={VerifyTokenBox} />
              <Route path="*" Component={LoginBox} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
