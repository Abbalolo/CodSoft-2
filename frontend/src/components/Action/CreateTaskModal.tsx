import { FormEvent, useEffect, useState } from "react";
interface props {
  setNewTask: (value: boolean) => void;
}
function CreateTaskModal({setNewTask}: props) {
   const [error1, setError1] = useState<boolean>(false);
   const [error2, setError2] = useState<boolean>(false);
   const [title, setTitle] = useState<string>("");
   const [description, setDescription] = useState<string>("");
   const [startDate, setStartDate] = useState<string>("");
   const [endDate, setEndDate] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [assignTo, setAssignTo] = useState<string>("");
  


   const handleForm = (event: FormEvent<HTMLFormElement>) => {
     event.preventDefault();

     console.log({
       title,
       description,
       startDate,
       endDate,
       priority,
       assignTo

     })
   };

  const validate = () => {
    if (title.length <= 4) {
      setError1(true); 
      setError2(false); 
    } else if (description.length <= 4) {
      setError1(false);
      setError2(true); 
    } else {
      setError1(false);
      setError2(false);
      console.log("No errors");
    }
  };

   useEffect(() => {
     validate();
   }, [title,description]);
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
          {error1 ? (
            <span className="text-sm text-red-400 py-1">
              letter must be more than 4
            </span>
          ) : (
            ""
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
          {error2 ? (
            <span className="text-sm text-red-400 py-1">
              letter must be more than 4
            </span>
          ) : (
            ""
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
        <select
          className="select select-bordered w-full "
          value={assignTo}
          onChange={(e) => setAssignTo(e.target.value)}
        >
          <option disabled value="">
            Assign task
          </option>
          <option value="Han Solo">Han Solo</option>
          <option value="Greedo">Greedo</option>
          <option value="lolo">lolo</option>
        </select>
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
          className="bg-black w-20 p-2  rounded-md mt-4 text-white shadow-md hover:bg-slate-800 "
        >
          close
        </button>
      </div>
    </div>
  );
}

export default CreateTaskModal