import { useEffect, useState } from "react";
import { allTasksApi, deleteTaskApi } from "../api/TaskApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const fetchTaskData = async () => {
    try {
      const res = await allTasksApi();
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      const res = await deleteTaskApi(id);
      toast.success(res.data.message);

      const newTasks = tasks.filter((task) => task._id !== id);
      setTasks(newTasks);
    } catch (error) {
      console.log("Error object:", error);
      const errorMessage =
        error?.response?.data?.error || "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold pb-6 t">Your All Tasks</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow ">
        <table className="w-full text-left border-collapse p">
          <thead>
            <tr className="bg-slate-600 text-white">
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Deadline</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{task.title}</td>
                  <td className="p-3">{task.description}</td>
                  <td className="p-3">{task.priority}</td>
                  <td className="p-3">
                    {new Date(task.deadline).toLocaleDateString()}
                  </td>
                  <td className="p-3 space-x-2">
                    <button
                      className="px-3 py-1 mb-2 bg-green-500 text-white rounded-lg"
                      onClick={() => navigate("/", { state: { tasks: task } })}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1  bg-red-500 text-white rounded-lg"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-3 text-gray-500">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTasks;
