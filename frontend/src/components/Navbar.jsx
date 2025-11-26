import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="w-full bg-slate-900 text-white shadow-xl flex justify-between items-center py-4 px-8">
      <h2 className="text-2xl font-bold">Task Management</h2>

      <ul className="flex flex-row text-lg gap-8">
        <li className="hover:text-gray-400 cursor-pointer">Add Task</li>
        <li className="hover:text-gray-400 cursor-pointer">All Tasks</li>
      </ul>

      <Link to="/login">
        <button className="text-slate-900 bg-white px-4 py-2 rounded-md font-medium hover:bg-gray-100 shadow">
          Login
        </button>
      </Link>
    </nav>
  );
};
export default Navbar;
