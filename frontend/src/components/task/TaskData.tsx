import { MdModeEditOutline } from "react-icons/md"; 


function TaskData() {
  return (
    <div className=" rounded-md flex flex-col gap-2">
      <div className="flex items-center justify-between border shadow-md p-2">
        <p>username</p>
        <MdModeEditOutline className="cursor-pointer"/>
      </div>
      <div className="flex flex-col gap-3 border shadow-md p-2">
        <div className="flex items-center  gap-3  ">
          <span className="w-5 h-5 bg-black rounded-full"></span>
          <h3 className="font-semibold">
            title titltitle titletitle titletitle titlee
          </h3>
        </div>
        <div className="p-3 flex flex-col gap-3">
          <p className="">description description</p>
          <span>Priorities prioritys</span>
        </div>
        <div className="flex items-center justify-between">
          <p>start date </p>
          <p>end date </p>
        </div>
      </div>
    </div>
  );
}

export default TaskData