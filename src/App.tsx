import { ThemeProvider } from "@/components/theme-provider";
import { Route, Routes } from "react-router-dom";

// import Navbar from "./pages/components/Navbar";
import {
  Home,
  AuthPage,
  SignupBox,
  EmployeePage,
  PayrollPage,
  Dashboard,
  LoginBox,
} from "./pages";

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
            </Route>

            <Route path="/auth" element={<AuthPage />}>
              <Route path="login" Component={LoginBox} />
              <Route path="signup" Component={SignupBox} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
