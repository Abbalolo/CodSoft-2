import React, { useState, ChangeEvent, useContext, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

const SearchBar: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);
  const { handleSearch } = useContext(SearchContext);
  const navigate = useNavigate();
  const { filteredProjects, filteredLists, filteredTasks } =
    useContext(SearchContext);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  useEffect(() => {
    if (prompt.trim() === "") {
      // Reset filtered list or perform any other action
      handleSearch(""); // Reset filtered list when input is empty
    } else {
      handleSearch(prompt);
    }
  }, [prompt]);

  const handleClick = () => {
    if (prompt.trim() !== "") {
      handleSearch(prompt);
    } else {
      navigate("/dashboard");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <>
      <div className="relative flex pl-2 md:border justify-center items-center  md:border-gray-300 gap-2 rounded-md md:shadow-sm overflow-hidden  focus-within:border-blue-600 focus-within:ring-2 ">
        <FiSearch
          onClick={() => setToggleSearch(!toggleSearch)}
          className="text-gray-500 text-xl cursor-pointer border-none"
        />
        <input
          onClick={() => setToggleSearch(!toggleSearch)}
          className="hidden md:flex p-1 md:p-2 w-full text-sm md:text-base border-none outline-none"
          type="search"
          placeholder="Search anything ...."
        />
        
      </div>

      {toggleSearch && (
        <div className="fixed  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[80%] md:w-[40%] rounded-md shadow-md p-5 border   border-gray-400 h-[300px] z-50">
          <div className="flex items-center gap-2 p-2 border rounded-md focus-within:border-blue-600 focus-within:ring-2">
            <button className="" onClick={handleClick}>
              <FiSearch className="text-gray-500 text-xl cursor-pointer" />
            </button>
            <input
              className="md:flex p-1 md:p-2 w-full text-sm md:text-base border-none  outline-none"
              type="search"
              placeholder="Search ..."
              value={prompt}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className=" mt-5">

            {filteredProjects.length > 0 && (
               <div className="p-3">
               <h3 className="text-blue-600 font-semibold">Projects:</h3>
               <div className="">
                 {filteredProjects.map((projects, index) => (
                   <ul key={index}>
                     <li className="font-semibold border p-2 rounded-md hover:bg-slate-50 cursor-pointer">{projects.title}</li>
                   </ul>
                 ))}
               </div>
             </div>
            )}
           
{filteredLists.length > 0 && (
  <div className="p-3">
  <h3 className="text-blue-600 font-semibold"> List:</h3>
  <div className="">
    {filteredLists.map((list, index) => (
      <ul key={index}>
        <li className="font-semibold border p-2 rounded-md hover:bg-slate-50 cursor-pointer">{list.name}</li>
      </ul>
    ))}
  </div>
</div>
)}
          
{filteredTasks.length > 0 && (
  <div className="p-3">
  <h3 className="text-blue-600 font-semibold">Projects Task:</h3>
  <div className="">
    {filteredTasks.map((task, index) => (
      <ul key={index}>
        <li className="font-semibold border p-2 rounded-md hover:bg-slate-50 cursor-pointer">{task.title}</li>
      </ul>
    ))}
  </div>
</div>
)}
            
          </div>
        </div>
      )}
      {toggleSearch && (
        <div
          onClick={() => setToggleSearch(false)}
          className="absolute top-0 left-0 bg-[#00000066] w-full h-screen"
        ></div>
      )}
    </>
  );
};

export default SearchBar;
