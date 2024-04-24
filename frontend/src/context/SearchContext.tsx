import axios from "axios";
import { createContext, useState, useContext, ReactNode} from "react";
import { url } from "../ApiUrl";
import { Task } from "@/Pages/project/ProjectDetails";

type MyComponentProps = {
  children: ReactNode;
};

interface SearchContextType {
  searchQuery: string;
  handleSearch: (query: string) => void;
  filteredProjects: Project[];
  filteredTasks: Task[];
  filteredLists: any[]; // Adjust type according to your list data structure
}

export interface Project {
  _id: any,
  title: string;
  username: string;
  updatedAt: string;
  userId: string;
  color: string;
}

export const SearchContext = createContext<SearchContextType>({
  searchQuery: "",
  handleSearch: () => {},
  filteredProjects: [],
  filteredTasks: [],
  filteredLists: [],
});

export const SearchProvider = ({ children }: MyComponentProps) => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filteredLists, setFilteredLists] = useState<any[]>([]); // Adjust type according to your list data structure
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchProjects = async (query: string) => {
    try {
      const response = await axios.get<Project[]>(`${url}/api/v1/projects/`);
      const filtered = query
        ? response.data.filter(
            (item) =>
              item.title.toLowerCase().includes(query.toLowerCase()) 
          )
        : [];
      setFilteredProjects(filtered);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchTasks = async (query: string) => {
    try {
      const response = await axios.get<Task[]>(`${url}/api/v1/tasks/`);
      const filtered = query
        ? response.data.filter(
            (item) =>
              item.title.toLowerCase().includes(query.toLowerCase()) 
          )
        : [];
      setFilteredTasks(filtered);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchLists = async (query: string) => {
    try {
      const response = await axios.get(`${url}/api/v1/lists`);
      // Adjust data structure according to your list API response
      const filtered = query
        ? response.data.filter(
            (item: any) =>
              item.name.toLowerCase().includes(query.toLowerCase()) 
          )
        : [];
      setFilteredLists(filtered);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchProjects(query);
    fetchTasks(query);
    fetchLists(query);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, handleSearch, filteredProjects, filteredTasks, filteredLists }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
