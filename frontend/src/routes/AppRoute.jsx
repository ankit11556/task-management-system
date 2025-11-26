import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AddTask from "../pages/AddTask";
import AllTasks from "../pages/AllTasks";
import PrivateRoute from "../components/PrivateRoutes";
const AppRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<AddTask />}></Route>
        <Route path="/all-tasks" element={<AllTasks />}></Route>
      </Route>
    </Routes>
  );
};

export default AppRoute;
