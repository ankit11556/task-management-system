import { useEffect, useState } from "react";
import { addTaskApi, updateTaskApi } from "../api/TaskApi";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    deadline: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = location.state?.tasks || null;

  useEffect(() => {
    if (isEditMode) {
      setFormData(isEditMode);
    }
  }, [isEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        const res = await updateTaskApi(isEditMode._id, formData);
        toast.success(res.data.message);
      } else {
        const res = await addTaskApi(formData);
        toast.success(res.data.message);
      }
      navigate("/all-tasks");
    } catch (error) {
      console.log("Error object:", error);
      const errorMessage =
        error?.response?.data?.error || "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl flex flex-col  shadow-xl items-center">
      <h2 className="text-2xl pb-6 font-bold">Add Your Task</h2>
      <form onSubmit={handleClick} className="flex flex-col space-y-5 w-100">
        <input
          type="text"
          placeholder="title"
          required
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="border border-gray-500 rounded-lg px-4 py-2"
        />

        <textarea
          placeholder="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="border border-gray-500 rounded-lg px-4 py-3"
        ></textarea>
        <div className="flex flex-col">
          <label>Priority:</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            className="border border-gray-500 rounded-lg px-2 py-1"
          >
            <option value="">select</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline.slice(0, 10)}
            onChange={handleInputChange}
            className="border border-gray-500 rounded-lg px-2 py-1"
          />
        </div>
        <button
          type="submit"
          className="bg-slate-800 text-white py-2 rounded-lg hover:cursor-pointer hover:bg-slate-700"
        >
          {isEditMode ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
