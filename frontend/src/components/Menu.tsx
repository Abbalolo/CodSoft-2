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
            <h3 className="hover:bg-slate-100 p-2 text-sm">
              <Link to="/" onClick={handleClick}>
                Dashboard
              </Link>
            </h3>
            <h3 className="hover:bg-slate-100 p-2 text-sm">
              <Link
                to={user ? `/profile/${user?._id}` : "/login"}
                onClick={handleClick}
              >
                Profile
              </Link>
            </h3>
            <h3 className="hover:bg-slate-100 p-2 text-sm md:hidden cursor-pointer">
              <span  onClick={() =>{
                handleClick();
                setToggleCreate(true)
                 
              }}>
                Add new project
              </span>
            </h3>
            <h3 className="hover:bg-slate-100 p-2 text-sm">
              <Link to="/my-project" onClick={handleClick}>
                My Project
              </Link>
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
            <h3 className=" p-2 hover:bg-slate-100">
              <Link to="/login" onClick={handleClick}>
                Login
              </Link>
            </h3>
            <h3 className=" p-2 hover:bg-slate-100">
              <Link to="/register" onClick={handleClick}>
                Register
              </Link>
            </h3>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Menu;
