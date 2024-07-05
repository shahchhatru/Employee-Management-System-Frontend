import { AppDispatch, RootState } from "@/store/Store";
import { useSelector, useDispatch } from "react-redux";
const Attendence = () => {
  const authState = useSelector((state: RootState) => state.auth);
  if (authState.user.role === "ADMIN") {
    return <div> Admin Attendence</div>;
  }
  return <div>Attendence</div>;
};
export default Attendence;
