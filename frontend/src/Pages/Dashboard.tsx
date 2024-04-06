import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { url } from "../ApiUrl";
import { SearchContext } from "../context/SearchContext";
import ContentLoader from "../components/ContentLoader";
import ProjectPost from "../components/ProjectPost";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { filteredList } = useContext(SearchContext);

  const fetchProject = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Project[]>(`${url}/api/v1/projects/`);
      setProjects(response.data);
      console.log(response.data);
     
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
    }
  };




  useEffect(() => {
    fetchProject();
  }, []);

  useEffect(() => {
    setProjects(filteredList);
  }, [filteredList]);

  return (
    <div className="px-6 md:px-[100px] ">
      {isLoading ? (
        <div className="h-screen w-full">
          <ContentLoader />
        </div>
      ) : (
   
          <ProjectPost projects={projects} />
      )}
    </div>
  );
};

export default Dashboard;
