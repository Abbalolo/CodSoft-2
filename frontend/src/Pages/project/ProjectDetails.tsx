import { BiPlus } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import { url } from "../../ApiUrl";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import CreateTaskModal from "../../components/Action/CreateTaskModal";
import TaskData from "../../components/task/TaskData";
export interface Task {
  _id: any;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  assignTo: any[];
  status: string;
  priority: string;
  projectId: string;
  listId: any;

}
function ProjectDetails() {
  const [lists, setLists] = useState<
    { id: number; name: string; color: string }[]
  >([]);
  const [listName, setListName] = useState<string>("");
  const [listArr, setListArr] = useState<
    { _id: number; userId: string; name: string; color: string }[]
  >([]);
  const { user } = useContext(UserContext);
  const { projectId } = useParams();
  const [taskArr, setTaskArr] = useState<Task[]>([])
  const [addNewTask, setAddNewTask] = useState<boolean>(false); 

console.log(taskArr)
  const fetchList = async () => {
    try {
      const res = await axios.get(`${url}/api/v1/lists/project/${projectId}`);
      // console.log(res.data);
      setListArr(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTasksForList = async () => {
    try {
      const res = await axios.get<Task[]>(
        `${url}/api/v1/tasks/project/${projectId}`
      );
      console.log(res.data);
      setTaskArr(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  const deleteList = async (id: any) => {
    try {
      const res = await axios.delete(`${url}/api/v1/lists/${id}`);
      fetchList();
     console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

 






  const createList = async () => {
    try {
      const newList = {
        name: listName,
        projectId: projectId,
        userId: user?._id,
      };
      const res = await axios.post(`${url}/api/v1/lists/create`, newList, {
        withCredentials: true,
      });
      console.log(res.data);
      fetchList();
    } catch (error) {
      console.log(error);
    }
  };
  // const UpdateList = async (listId: any) => {
  //   try {
  //     const updatedList = {
  //       name: listName,
    
  //     };
  //     const res = await axios.put(`${url}/api/v1/lists/${listId}`, updatedList, {
  //       withCredentials: true,
  //     });
  //     console.log(res.data);
  //     fetchList();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleListSubmit = async (id: number) => {
    console.log(`Form submitted for list with ID ${id} and name ${listName}`);
    await createList();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const updatedLists = lists.map((list) =>
      list.id === id ? { ...list, name: e.target.value } : list
     
    );
    setLists(updatedLists);
    setListName(e.target.value);
    
  };

  const addNewList = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    const newList = { id: Date.now(), name: "", color: randomColor };
    setLists([...lists, newList]);
  };

   useEffect(() => {
     fetchList();
     fetchTasksForList();
   }, [projectId]);




  return (
    <div className="px-6 py-5 ">
      <button
        onClick={addNewList}
        className="bg-black w-[100px] flex items-center gap-1  justify-center p-2 text-sm  rounded-md mt-4 text-white shadow-md hover:bg-slate-800 "
      >
        <BiPlus className="text-lg" /> Add List
      </button>
      {listArr?.map((list) => (
        <div className="mt-4" key={list._id}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleListSubmit(list._id);
            }}
            className="bg-black flex items-center px-2 shadow-md rounded-md"
            style={{ borderTop: `5px solid ${list.color}` }}
          >
            <input
              type="text"
              className="text-white w-full bg-black rounded-sm focus-within:border-black p-2 outline-none"
              placeholder="List name"
              value={list.name}
              onChange={(e) => handleChange(e, list._id)}
              // onBlur={() => handleListSubmit(list._id)}
            />
            {user?._id === list.userId && (
              <div className="flex items-center gap-3">
                {!taskArr.some((task) => task.listId === list._id) && (
                  <BiPlus
                    className="text-lg text-white relative cursor-pointer"
                    onClick={() => setAddNewTask(true)}
                  />
                )}

                <MdOutlineDelete
                  onClick={() => deleteList(list._id)}
                  className="text-lg text-white relative cursor-pointer"
                />
              </div>
            )}
          </form>

          <TaskData taskArr={taskArr} listId={list._id} />
          {addNewTask && (
            <>
              <div className="absolute top-0 left-0 bg-[#00000066] w-full h-screen"></div>
              <CreateTaskModal
                setNewTask={setAddNewTask}
                listId={list._id}
                projectId={projectId}
              />
            </>
          )}
        </div>
      ))}
      {lists.map((list) => (
        <div className="mt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleListSubmit(list.id);
            }}
            className="bg-black flex items-center px-2 shadow-md rounded-md"
            style={{ borderTop: `5px solid ${list.color}` }}
          >
            <input
              type="text"
              className="text-white w-full bg-black rounded-sm focus-within:border-black p-2 outline-none"
              placeholder="List name"
              value={list.name}
              onChange={(e) => handleChange(e, list.id)}
            />
          </form>
        </div>
      ))}
    </div>
  );
}

export default ProjectDetails;
