import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { url } from "../../ApiUrl";
import { FaRegTimesCircle } from "react-icons/fa";

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
  const [assignTo, setAssignTo] = useState<User[]>([]);
  const [assignUsers, setAssignUsers] = useState<User[]>([]);
  const [assignText, setAssignText] = useState<string>("");

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTask = {
      list: listId,
      projectId: projectId,
      title,
      description,
      startDate,
      endDate,
      priority,
      assignTo: assignTo.map((user) => user._id),
    };
    console.log(newTask);
    // await createTask();
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
const addAUserToDoTask = (user: User) => {
 
  if (!assignTo.find((u) => u._id === user._id)) {
    setAssignTo((prevAssignTo) => [...prevAssignTo, user]);
  }
  setAssignText(""); 
};


  useEffect(() => {
    validate();
  }, [title, description]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[80%] rounded-md shadow-md p-5 border">
      <h2 className="text-center font-semibold">Add Task</h2>

      <form onSubmit={handleForm} className="mt-4 flex flex-col gap-3">
        <div className="">
          <input
            className="border w-full rounded-md outline-none shadow-sm p-3 focus:border-black"
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          />
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
        >
          <option disabled value="">
            Priority
          </option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <div className="flex flex-col">
          <div className="flex items-center space-x-4 md:space-x-8">
            <input
              className="border  border-gray-300 outline-none rounded-md p-2 w-full"
              type="text"
              placeholder="Enter user(s), separated by commas"
              value={assignText}
              onChange={(e) => setAssignText(e.target.value)}
            />

            <button
              type="button"
              onClick={addAUserToDoTask}
              className="bg-black rounded-sm text-white px-4 py-2 font-semibold cursor-pointer"
            >
              Add
            </button>
          </div>
          {/* assign task */}
          <div className="flex mt-3 flex-wrap gap-2">
            {assignUsers.map((user, index) => (
              <div
                key={index}
                className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md cursor-pointer"
                onClick={() => addAUserToDoTask(user)}
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
          />
          <input
            className="border w-full rounded-md outline-none shadow-sm p-3 focus:border-black"
            type="date"
            placeholder="End date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button className="bg-black w-20 p-2 rounded-md mt-4 text-white shadow-md hover:bg-slate-800">
          Submit
        </button>
      </form>
      <div className="flex items-end justify-end mt-6">
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
