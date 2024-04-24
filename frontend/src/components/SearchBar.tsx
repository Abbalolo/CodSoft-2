import React, { useState, ChangeEvent, useContext, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { Input } from "@/components/ui/input"


const SearchBar: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);
  const { handleSearch } = useContext(SearchContext);
  const navigate = useNavigate();

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
    <div className="relative flex  md:w-[60%] border-none md-border justify-center items-center border border-gray-300 pl-2 gap-2 rounded-sm shadow-sm overflow-hidden">
       
        <FiSearch  onClick={() => setToggleSearch(!toggleSearch)} className="text-gray-500 text-xl cursor-pointer" />
      <input
      onClick={() => setToggleSearch(!toggleSearch)}
        className="hidden md:flex p-1 md:p-2 w-full text-sm md:text-base border-none outline-none"
        type="search"
        placeholder="Search a Projects"
        value={prompt}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      
    </div>
    
    {toggleSearch &&  <div className="fixed  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[80%] md:w-[40%] rounded-md shadow-md p-5 border   border-gray-400 h-[300px] z-50">
    <div className="flex items-center gap-3">
    
      <Input 
        className="md:flex p-1 md:p-2 w-full text-sm md:text-base border-none outline-none"
        type="search"
        placeholder="Search a Projects"
        value={prompt}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
<button className="" onClick={handleClick}>
        <FiSearch className="text-gray-500 text-xl cursor-pointer" />
      </button>

    
    </div>
   <div className="border mt-5"></div>
      
      </div>}
    {toggleSearch &&  <div className="absolute top-0 left-0 bg-[#00000066] w-full h-screen"></div>}
    
    </>
  );
};

export default SearchBar;
