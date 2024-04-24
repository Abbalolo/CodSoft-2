import { TbTrashFilled } from "react-icons/tb"; 
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { MdOutlinePending } from "react-icons/md";
// import {
//   AiOutlineFundProjectionScreen,
//   AiOutlineProject,
// } from "react-icons/ai";

import { UserContext } from "../../context/UserContext";
import { url } from "../../ApiUrl";
import Loader from "../../components/Loader";

export interface Project {
  _id: any;
  title: string;
  username: string;
  updatedAt: string;
  userId: string;
  color: string;
}

function MyProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const [toggleDelete, setToggleDelete] = useState<boolean>(false); 

  const fetchProject = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Project[]>(
        `${url}/api/v1/projects/user/${user?._id}`
      );
      setProjects(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setIsLoading(false);
    }
  };
    
  const deleteProject = async (proId: any) => {
    setToggleDelete(true);
    try {
      await axios.delete(`${url}/api/v1/projects/${proId}`);
      setToggleDelete(false);
      fetchProject();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div className="py-10 flex flex-col lg:flex-row gap-3 px-6 h-screen">
      {isLoading ? (
        <Loader />
      ) : projects.length !== 0 ? (
        projects.map((project, index) => (
          <div key={index} className="flex  gap-3 md:w-[55%]">
            <Link
              to={user ? `/projects/project/${project._id}` : "/login"}
              className="flex items-center justify-between pr-2  gap-2 border  rounded-sm w-full"
            >
              <div className="flex items-center text-sm">
                <div
                  style={{ backgroundColor: project.color }}
                  className="border flex justify-center items-center font-bold p-4 w-[90px]"
                >
                  {project.title.slice(0, 3).toUpperCase()}
                </div>
                <p className="p-4">{project.title}</p>
              </div>
              <div className="flex items-center text-sm gap-2">
                <p>{new Date(project.updatedAt).toString().slice(0, 15)}</p>
                <p>{new Date(project.updatedAt).toString().slice(15, 24)}</p>
              </div>
            </Link>
            <button
              onClick={() => deleteProject(project._id)}
              className="hover:bg-red-400 hover:text-white h-full px-3 border transition-all duration-500 flex items-center"
            >
              {toggleDelete ?  <div className="button-loader2"></div>:  <TbTrashFilled />}
            </button>
          </div>
        ))
      ) : (
        <div className="h-screen w-full text-center">
          <p className="font-semibold text-2xl lg:text-3xl">
            No projects available
          </p>
        </div>
      )}

      {/* Project statistics section */}
      {/* <div className="border md:w-[45%] h-full">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-0 lg:divide-x divide-y">
          <Link
            to="#"
            className="flex items-center justify-center w-full flex-col p-3"
          >
            <AiOutlineProject className="text-[40px] text-green-400" />
            <p className="flex items-center gap-1 flex-col">
              <span className="text-[40px] font-semibold">
                {projects.length}+
              </span>
              <p className="font-semibold">projects created</p>
            </p>
          </Link>
          <Link
            to="#"
            className="flex items-center justify-center w-full flex-col p-3"
          >
            <AiOutlineFundProjectionScreen className="text-[40px] text-green-400" />
            <p className="flex items-center gap-1 flex-col">
              <span className="text-[40px] font-semibold">5+</span>
              <p className="font-semibold">projects completed</p>
            </p>
          </Link>
          <Link
            to="#"
            className="flex items-center justify-center w-full flex-col p-3"
          >
            <MdOutlinePending className="text-[40px] text-blue-400" />
            <p className="flex items-center gap-1 flex-col">
              <span className="text-[40px] font-semibold">5+</span>
              <p className="font-semibold">projects pending</p>
            </p>
          </Link>
        </div>
      </div> */}
    </div>
  );
}

export default MyProjects;
