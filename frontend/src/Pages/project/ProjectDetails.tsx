
import {  useState } from "react";
import { BiPlus } from "react-icons/bi"; 
import CreateListModal from "../../components/Action/CreateLIstModal";
import CreateTaskModal from "../../components/Action/CreateTaskModal";
import TaskData from "../../components/task/TaskData";


function ProjectDetails() {
  const [list, setList] = useState<JSX.Element[]>([]);
  const [newTask, setNewTask] = useState<boolean>(false);

const addNewList = () => {

  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  const updatedList = [...list];
  updatedList.push(
    <div
      key={updatedList.length}
      className="bg-black flex items-center px-2 shadow-md rounded-md"
      style={{ borderTop: `5px solid ${randomColor}` }} 
    >
      <input
        type="text"
        className="text-white w-full bg-black rounded-sm focus-within:border-black p-2 outline-none"
        placeholder="List name"
      />
      <div className="flex items-center gap-5">
     
       
        <div className="">
          <BiPlus className="text-lg text-white relative cursor-pointer" />
        </div>
      </div>
    </div>
  );
  setList(updatedList);
};

  

  console.log(list)

  // useEffect(() => {

  // }, [list])
  return (
    <div className="px-6 py-5">
      <button
        onClick={addNewList}
        className="bg-black w-[100px] flex items-center gap-1  justify-center p-1 text-sm  rounded-md mt-4 text-white shadow-md hover:bg-slate-800 "
      >
        <BiPlus className="text-lg" /> Add List
      </button>
      <div className="">
        <CreateListModal lists={list} />
        <TaskData/>
        {newTask?<CreateTaskModal setNewTask={setNewTask}/> : null}
</div>

    </div>
  );
}

export default ProjectDetails