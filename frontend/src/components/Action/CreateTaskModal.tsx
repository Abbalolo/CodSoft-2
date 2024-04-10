import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { url } from "../../ApiUrl";

interface Props {
  setNewTask: (value: boolean) => void;
  projectId: string | undefined;
  listId: number;
}

interface User {
  _id: string;
  username: string;
}

function CreateTaskModal({ setNewTask, projectId, listId }: Props) {
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

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createTask();
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get<User[]>(`${url}/api/v1/users`);
      console.log(res.data);
      setAssignUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const validate = () => {
    setError1(title.length <= 4);
    setError2(description.length <= 4);
  };

  const createTask = async () => {
    const newTask = {
      listId: listId,
      projectId: projectId,
      title,
      description,
      startDate,
      endDate,
      priority,
      status,
      assignedTo: selectedUsers.map((user) => user?._id)
    };
    console.log(newTask);
    try {
      const res = await axios.post(`${url}/api/v1/tasks/create`, newTask, {
        withCredentials: true,
      });
      setNewTask(false)
window.location.reload()
      console.log(res.data);
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
    const updatedUsers = selectedUsers.filter((user, index) => index !== id);
    setSelectedUsers(updatedUsers);
  };

  useEffect(() => {
    validate();
  }, [title, description]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[80%] md:w-[40%] rounded-md shadow-md p-3 border">
      <h2 className="text-center font-semibold">Add Task</h2>

      <form onSubmit={handleForm} className="mt-4 flex flex-col gap-3">
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
          <textarea
            className="border w-full rounded-md outline-none shadow-sm p-3 focus:border-black"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        
          {error2 && (
            <span className="text-sm text-red-400 py-1">
              Description must be more than 4 characters
            </span>
          )}
        </div>
        <select
          className="select select-bordered w-full "
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
        <select
          className="select select-bordered w-full "
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option disabled value="">
            Status
          </option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In-progress</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2">
           {selectedUsers.map((select, index) => (
              <div
                key={select._id}
                className="border text-white flex items-center p-2 gap-3 rounded-sm"
                style={{
                  backgroundColor: `#${Math.floor(
                    Math.random() * 16777215
                  ).toString(16)}`,
                }}
              >
                <p className="">{select.username}</p>
                <MdOutlineDelete
                  onClick={() => removeUser(index)}
                  className="mr-1 cursor-pointer"
                />
              </div>
            ))} 
          </div>
          <div className="flex mt-3 flex-wrap gap-2">
            {assignUsers.map((user, index) => (
              <div
                key={index}
                className="flex justify-center items-center   bg-gray-200 px-2 py-1 rounded-md cursor-pointer"
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
      <div className="flex items-end justify-end mt-2">
        <button
          onClick={() => setNewTask(false)}
          className="bg-black w-20 p-2 rounded-md text-white shadow-md hover:bg-slate-800 "
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CreateTaskModal;
