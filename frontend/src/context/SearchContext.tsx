import axios from "axios";
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { url } from "../ApiUrl";

type MyComponentProps = {
  children: ReactNode;
};

interface SearchContextType {
  searchQuery: string;
  handleSearch: (query: string) => void;
  filteredList: Project[];
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
  filteredList: [],
});

export const SearchProvider = ({ children }: MyComponentProps) => {
  const [filteredList, setFilteredList] = useState<Project[]>([]);
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
       setFilteredList(filtered);
     } catch (error) {
       console.error("Error fetching posts:", error);
     }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchProjects(query);
  };


  return (
    <SearchContext.Provider value={{ searchQuery, handleSearch, filteredList }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
