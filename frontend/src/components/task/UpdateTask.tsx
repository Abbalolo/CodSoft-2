import { FormEvent, useEffect, useState } from "react";
import { url } from "../../ApiUrl";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";

interface Props {
  setUpdatedTask: (value: boolean) => void;
  taskId: string;
}

interface User {
  _id: string;
  username: string;
}

function UpdateTask({ setUpdatedTask, taskId }: Props) {
  const [error1, setError1] = useState<boolean>(false);
  const [error2, setError2] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [assignUsers, setAssignUsers] = useState<User[]>([]);

  const fetchTask = async () => {
    try {
      const res = await axios.get(`${url}/api/v1/tasks/${taskId}`);
      const taskData = res.data;
      setTitle(taskData.title);
      setDescription(taskData.description);
      setPriority(taskData.priority);
      setStatus(taskData.status);
      setStartDate(taskData.startDate);
      setEndDate(taskData.endDate);
      setSelectedUsers(taskData.assignedTo);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get<User[]>(`${url}/api/v1/users`);
      setAssignUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const validate = () => {
    setError1(title.length <= 4);
    setError2(description.length <= 4);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const updateTaskData = {
      title,
      description,
      startDate,
      endDate,
      priority,
      status,
      assignedTo: selectedUsers.map((user) => user._id),
    };
    try {
      const res = await axios.patch(
        `${url}/api/v1/tasks/${taskId}`,
        updateTaskData
      );
      console.log(res.data)
      setUpdatedTask(false)
    } catch (error) {
      console.log(error);
    }
  };

  const addAUserToDoTask = (userId: string) => {
    const userExists = selectedUsers.some((user) => user._id === userId);
    if (!userExists) {
      const userToAdd = assignUsers.find((user) => user._id === userId);
      if (userToAdd) {
        setSelectedUsers((prevUsers) => [...prevUsers, userToAdd]);
      }
    }
  };

  const removeUser = (id: number) => {
    const updatedUsers = selectedUsers.filter((_, index) => index !== id);
    setSelectedUsers(updatedUsers);
  };

  useEffect(() => {
    fetchTask();
    fetchUsers();
  }, []);

  useEffect(() => {
    validate();
  }, [title, description]);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[80%] rounded-md shadow-md p-5 border">
      <h2 className="text-center font-semibold">Update Task</h2>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <div className="">
          <input
            className="border w-full rounded-md outline-none shadow-sm p-3 focus:border-black"
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {error1 && (
            <span className="text-sm text-red-400 py-1">
              Title must be more than 4 characters
            </span>
          )}
        </div>
        <div className="">
          <input
            className="border w-full rounded-md outline-none shadow-sm p-3 focus:border-black"
            type="text"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {error2 && (
            <span className="text-sm text-red-400 py-1">
              Description must be more than 4 characters
            </span>
          )}
        </div>
        <select
          className="select select-bordered w-full"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option disabled value="">
            Priority
          </option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <div className="flex flex-col">
           {selectedUsers.map((select, index) => (
            <div
              key={select._id}
              className="border text-white flex items-center p-2 gap-3 rounded-sm"
              style={{
                borderColor: `#${Math.floor(Math.random() * 16777215).toString(
                  16
                )}`,
              }}
            >
              <p className="">{select.username}</p>
              <MdOutlineDelete
                onClick={() => removeUser(index)}
                className="mr-1 cursor-pointer"
              />
            </div>
          ))} 
          <div className="flex mt-3 flex-wrap gap-2">
            {assignUsers.map((user, index) => (
              <div
                key={index}
                className="flex justify-center items-center bg-gray-200 px-2 py-1 rounded-md cursor-pointer"
                onClick={() => addAUserToDoTask(user._id)}
              >
                <p>{user.username}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="border w-full rounded-md outline-none shadow-sm p-3 focus:border-black"
            type="date"
            placeholder="start date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <input
            className="border w-full rounded-md outline-none shadow-sm p-3 focus:border-black"
            type="date"
            placeholder="End date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button className="bg-black w-20 p-2 rounded-md mt-4 text-white shadow-md hover:bg-slate-800">
          Submit
        </button>
      </form>
      <div className="flex items-end justify-end mt-3">
        <button
          onClick={() => setUpdatedTask(false)}
          className="bg-black w-20 p-2 rounded-md text-white shadow-md hover:bg-slate-800 "
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default UpdateTask;
