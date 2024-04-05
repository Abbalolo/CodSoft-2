import { MdModeEditOutline } from "react-icons/md";
import { Task } from "../../Pages/project/ProjectDetails";
import { useState } from "react";
import UpdateTask from "./UpdateTask";

interface Props {
  taskArr: Task[];
  listId: string;
}

function TaskData({ taskArr, listId }: Props) {
  const [updatedTask, setUpdatedTask] = useState<boolean>(false);
  return (
    <>
      {taskArr.map(
        (task) =>
          task.listId === listId && (
            <div
              key={task._id}
              className="shadow-md border rounded-md flex flex-col gap-2 mt-2 p-3"
            >
              <div className="flex flex-col gap-3 ">
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex gap-3 items-center">
                    <span className="w-5 h-5 bg-black rounded-full"></span>
                    <h3 className="font-semibold">{task.title}</h3>
                  </div>
                  <MdModeEditOutline
                    onClick={() => setUpdatedTask(true)}
                    className="cursor-pointer"
                  />
                </div>
                <div className="p-3 flex flex-col gap-3">
                  <p className="text-wrap break-word max-w-full">
                    {task.description}
                  </p>

                  <span
                    className={`py-1 px-2 text-center rounded-md font-semibold shadow-sm border ${
                      task.priority === "High"
                        ? "bg-red-400 text-white"
                        : task.priority === "Medium"
                        ? "bg-yellow-400 text-black"
                        : task.priority === "Low"
                        ? "bg-green-400 text-black"
                        : ""
                    }`}
                  >
                    {task.priority}
                  </span>
                  <span
                    className={`py-1 px-2 text-center rounded-md font-semibold shadow-sm border ${
                      task.status === "Todo"
                        ? "bg-blue-400 text-white"
                        : task.status === "In Progress"
                        ? "bg-purple-400 text-white"
                        : task.status === "Completed"
                        ? "bg-gray-400 text-black"
                        : ""
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-semibold">
                  <p>{new Date(task.startDate).toString().slice(0, 15)}</p>
                  <p>{new Date(task.endDate).toString().slice(0, 15)}</p>
                </div>
              </div>
              {updatedTask && (
                <UpdateTask taskId={task._id} setUpdatedTask={setUpdatedTask} />
              )}
            </div>
          )
      )}
    </>
  );
}

export default TaskData;
