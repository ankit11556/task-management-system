import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full bg-slate-900 text-white shadow-xl flex justify-between items-center py-4 px-8">
      <h2 className="text-2xl font-bold">Task Management</h2>

      <ul className="flex flex-row text-lg gap-8">
        <Link to="/">
          <li className="hover:text-gray-400 cursor-pointer">Add Task</li>
        </Link>

        <Link to="all-tasks">
          <li className="hover:text-gray-400 cursor-pointer">All Tasks</li>
        </Link>
      </ul>

      {user ? (
        <button
          onClick={logout}
          className="text-red-500 bg-white px-4 py-2 rounded-md font-medium hover:bg-gray-100 shadow"
        >
          Logout
        </button>
      ) : (
        <button className="text-slate-900 bg-white px-4 py-2 rounded-md font-medium hover:bg-gray-100 shadow">
          <Link to="/login">Login</Link>
        </button>
      )}
    </nav>
  );
};
export default Navbar;
