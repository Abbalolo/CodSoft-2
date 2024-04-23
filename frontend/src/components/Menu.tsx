// Menu.tsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

interface MenuProps {
  handleLogOut: () => void;
  closeMenu: () => void;
  setToggleCreate: (value: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({ handleLogOut, closeMenu ,setToggleCreate}) => {
  const { user } = useContext(UserContext);


  const handleClick = () => {
    closeMenu(); 
  };

  return (
    <div className="absolute top-8 right-0 md:top-10 overflow-hidden border border-gray-300 bg-white text-black   rounded-md shadow-md   justify-start items-start w-40 md:w-48">
      <ul className="flex flex-col">
        {user ? (
          <div className="divide-y">
            <h3
              onClick={handleClick}
              className="hover:bg-slate-100 p-2 text-sm"
            >
              <Link to="/dashboard">Dashboard</Link>
            </h3>
            <h3
              onClick={handleClick}
              className="hover:bg-slate-100 p-2 text-sm"
            >
              <Link to={user ? `/profile/${user?._id}` : "/login"}>
                Profile
              </Link>
            </h3>
            <h3
              onClick={() => {
                handleClick();
                setToggleCreate(true);
              }}
              className="hover:bg-slate-100 p-2 text-sm md:hidden cursor-pointer"
            >
              <span>Add new project</span>
            </h3>
            <h3
              onClick={handleClick}
              className="hover:bg-slate-100 p-2 text-sm"
            >
              <Link to="/my-project">My Project</Link>
            </h3>
            <h3
              onClick={() => {
                handleLogOut();
                handleClick();
              }}
              className=" p-2 hover:bg-slate-100 text-sm cursor-pointer"
            >
              Logout
            </h3>
          </div>
        ) : (
          <div className="divide-y">
            <h3 onClick={handleClick} className=" p-2 hover:bg-slate-100">
              <Link to="/login">Login</Link>
            </h3>
            <h3 onClick={handleClick} className=" p-2 hover:bg-slate-100">
              <Link to="/register">Register</Link>
            </h3>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Menu;
