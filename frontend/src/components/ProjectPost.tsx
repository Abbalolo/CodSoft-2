import { MdOutlinePending } from "react-icons/md";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineProject,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Project } from "../Pages/Dashboard";

interface Props {
  projects: Project[];
  userProjects: Project[];
}

function ProjectPost({ projects, userProjects }: Props) {
  const { user } = useContext(UserContext);

  return (
    <div className="py-10 flex flex-col lg:flex-row gap-3">
      {projects.length !== 0 ? (
        <div className="flex flex-col gap-3 md:w-[55%]">
          {projects.map((project, index) => (
            <Link
              key={index}
              to={user ? `/projects/project/${project._id}` : "/login"}
              className="flex items-center justify-between pr-2 gap-2 border hover:bg-slate-100 rounded-sm w-full"
            >
              <div className="flex items-center text-sm">
                <div
                  style={{ backgroundColor: project.color }}
                  className="border text-white flex justify-center items-center font-bold p-4 w-[90px]"
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
          ))}
        </div>
      ) : (
        <div className="h-screen w-full text-center">
          <p className="font-semibold text-2xl lg:text-3xl">
            Sorry, posts not available
          </p>
        </div>
      )}

      <div className="border md:w-[45%] h-full">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-0 lg:divide-x divide-y">
          <Link
            to="#"
            className="flex items-center justify-center w-full flex-col p-3"
          >
            <AiOutlineProject className="text-[40px] text-green-400" />
            <p className="flex items-center gap-1 flex-col">
              <span className="text-[40px] font-semibold">
                {userProjects.length}+
              </span>
              <p className="font-semibold">All Users projects </p>
            </p>
          </Link>
          <Link
            to="#"
            className="flex items-center justify-center w-full flex-col p-3"
          >
            <AiOutlineFundProjectionScreen className="text-[40px] text-green-400" />
            <p className="flex items-center gap-1 flex-col">
              <span className="text-[40px] font-semibold">
                {projects.length}+
              </span>
              <p className="font-semibold">My projects</p>
            </p>
          </Link>
          <Link
            to="#"
            className="flex items-center justify-center w-full flex-col p-3"
          >
            <MdOutlinePending className="text-[40px] text-blue-400" />
            <p className="flex items-center gap-1 flex-col">
              <span className="text-[40px] font-semibold">5+</span>
              <p className="font-semibold">Started Project</p>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectPost;
