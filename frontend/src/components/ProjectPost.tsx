import { MdOutlinePending } from "react-icons/md"; 
import { AiOutlineFundProjectionScreen } from "react-icons/ai"; 
import { AiOutlineProject } from "react-icons/ai"; 

import person from "../assets/person.png"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
function ProjectPost() {

  const { user } = useContext(UserContext)
  // to={user ? `/posts/post/${post._id}` : "/login"}
  return (
    <div className="py-10 flex flex-col lg:flex-row gap-3">
      <div className="flex flex-col gap-3 md:w-[55%]">
         <Link to={""}
        className="flex items-center justify-between pr-2 gap-2 border hover:bg-slate-100 rounded-sm w-full">
          <div className="flex items-center text-sm ">
            <img className="w-[50px] h-full" src={person} alt="person" />
            <p className="p-2">my next facebook</p>
          </div>
          <div className="flex items-center text-sm gap-2">
            {/* <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(15, 24)}</p> */}
            <p>14:5 </p>
            <p>2023-2-8</p>
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-3 md:w-[55%]">
        <button className="flex items-center justify-between pr-2 gap-2 border hover:bg-slate-100 rounded-sm w-full">
          <div className="flex items-center text-sm ">
            <img className="w-[50px] h-full" src={person} alt="person" />
            <p className="p-2">my next facebook</p>
          </div>
          <div className="flex items-center text-sm gap-2">
            {/* <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(15, 24)}</p> */}
            <p>14:5 </p>
            <p>2023-2-8</p>
          </div>
        </button>
      </div>
      <div className="flex flex-col gap-3 md:w-[55%]">
        <button className="flex items-center justify-between pr-2 gap-2 border hover:bg-slate-100 rounded-sm w-full">
          <div className="flex items-center text-sm ">
            <img className="w-[50px] h-full" src={person} alt="person" />
            <p className="p-2">my next facebook</p>
          </div>
          <div className="flex items-center text-sm gap-2">
            {/* <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(15, 24)}</p> */}
            <p>14:5 </p>
            <p>2023-2-8</p>
          </div>
        </button>
      </div>

      <div className="border md:w-[45%] h-full">
        <div className="flex flex-col  lg:flex-row gap-10 md:gap-0 lg:divide-x divide-y">
          <Link
            to={"#"}
            className="flex items-center justify-center w-full  flex-col p-3"
          >
            <AiOutlineProject className="text-[40px] text-green-400 " />
            <p className="flex items-center gap-1 flex-col ">
              <span className="text-[40px] font-semibold">10+</span>{" "}
              <p className="font-semibold">project created</p>
            </p>
          </Link>
          <Link
            to={"#"}
            className="flex items-center justify-center w-full  flex-col p-3"
          >
            <AiOutlineFundProjectionScreen className="text-[40px] text-green-400" />
            <p className="flex items-center gap-1 flex-col">
              <span className="text-[40px] font-semibold">5+</span>{" "}
              <p className="font-semibold">project completed</p>
            </p>
          </Link>
          <Link
            to={"#"}
            className="flex items-center justify-center w-full  flex-col p-3"
          >
            <MdOutlinePending className="text-[40px] text-blue-400" />
            <p className="flex items-center  gap-1 flex-col">
              <span className="text-[40px]  font-semibold">5+</span>{" "}
              <p className="font-semibold">project pending</p>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectPost