import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { url } from "../ApiUrl";
import { SearchContext } from "../context/SearchContext";
import ContentLoader from "../components/ContentLoader";
import ProjectPost from "../components/ProjectPost";
import { UserContext } from "../context/UserContext";

export interface Project {
  _id:any,
  title: string;
  username: string;
  updatedAt: string;
  userId: string;
  color: string;
}

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { filteredProjects } = useContext(SearchContext);
  const { user } = useContext(UserContext)
  
  const fetchProject = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Project[]>(`${url}/api/v1/projects/`);
      setUserProjects(response.data);
      // console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setIsLoading(false);
    }
   
  };

  

  const fetchUsersProject = async () => {
   try {
     const response = await axios.get<Project[]>(
       `${url}/api/v1/projects/user/${user?._id}`
     );
     setProjects(response.data);
    //  console.log(response.data);
       setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
    }
  };




  useEffect(() => {
    fetchUsersProject()
    fetchProject();
  }, []);

  // useEffect(() => {
  //   setUserProjects();
  // }, [filteredProjects]);

  return (
    <div className="px-6 md:px-[100px]  ">
      {isLoading ? (
        <div className="h-screen w-full">
          <ContentLoader />
        </div>
      ) : (
        <div className="lg:h-screen">
            <ProjectPost projects={projects}
              userProjects={userProjects}
            />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
