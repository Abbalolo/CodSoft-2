import { MdOutlinePending } from "react-icons/md"; 
import { AiOutlineFundProjectionScreen, AiOutlineProject } from "react-icons/ai"; 
import person from "../assets/person.png"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Project } from "../Pages/Dashboard";

interface Props {
  projects: Project[];
}

function ProjectPost({ projects }: Props) {
  const { user } = useContext(UserContext);

  return (
    <div className="py-10 flex flex-col lg:flex-row gap-3">
      {projects.length !== 0 ? (
        projects.map((project, index) => (
          <div key={index} className="flex flex-col gap-3 md:w-[55%]">
            <Link
              to={user ? `/projects/project/${project._id}` : "/login"}
              className="flex items-center justify-between pr-2 gap-2 border hover:bg-slate-100 rounded-sm w-full"
            >
              <div className="flex items-center text-sm">
                <img className="w-[50px] h-full" src={person} alt="person" />
                <p className="p-2">{project.title}</p>
              </div>
              <div className="flex items-center text-sm gap-2">
                <p>{new Date(project.updatedAt).toString().slice(0, 15)}</p>
                <p>{new Date(project.updatedAt).toString().slice(15, 24)}</p>
              </div>
            </Link>
          </div>
        ))
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
      </div>
    </div>
  );
}

export default ProjectPost;
