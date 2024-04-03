import { AiOutlineMenu } from "react-icons/ai"; 
import person from "../assets/person.png"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { url } from "../ApiUrl";
import CreateProjectModal from "./Action/CreateProjectModal";

function NavBar() {
  const [toggle, setToggle] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const param = useLocation().pathname;
  const menuRef = useRef<HTMLDivElement>(null);
  const [toggleCreate, setToggleCreate] = useState<boolean>(false)

  const handleLogOut = async () => {
    try {
      await axios.get(`${url}/api/v1/auth/logout`);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const closeMenu = () => {
    setToggle(false); 
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setToggle(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center px-8 md:px-[50px] py-5">
      <Link to="/" className="font-extrabold lg:text-xl text-base">
        <span className="text-red-400">CodSoft</span> Manage
      </Link>
      {param === "/" && <SearchBar />}
      <div className="md:flex justify-center items-center gap-3  ">
        <div className=" items-center  hidden md:flex">
          {user ? (
            <h3>
              <span
                onClick={() => {
                  setToggle(false);
                  setToggleCreate(true);
                }}
                className="bg-black text-white py-2 px-3 rounded-md shadow-md"
              >
                Add project
              </span>
            </h3>
          ) : (
            <div className="flex items-center gap-3">
              <h3 className="">
                <Link to="/login">Login</Link>
              </h3>
              <h3 className="">
                <Link to="/register">Register</Link>
              </h3>
            </div>
          )}
        </div>
        <div className="relative flex items-center gap-3" ref={menuRef}>
          <img
            className="rounded-full w-[25px] h-[25px]"
            src={person}
            alt="profile image"
          />
          <button className="" onClick={() => setToggle(!toggle)}>
            <AiOutlineMenu className="text-[20px]" />
          </button>
          {toggle ? (
            <Menu
              handleLogOut={handleLogOut}
              setToggleCreate={setToggleCreate}
              closeMenu={closeMenu}
            />
          ) : null}
        </div>
      </div>

      {toggleCreate ? (
        <div>
          <div className="absolute top-0 left-0 bg-[#00000066] w-full h-screen"></div>
          <CreateProjectModal setToggleCreate={setToggleCreate} />
        </div>
      ) : null}
    </div>
  );
}

export default NavBar;
