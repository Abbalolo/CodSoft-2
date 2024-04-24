import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react";
import { url } from "../../ApiUrl";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Button } from "@/components/ui/button"


interface CreateProjectModalProps {
  setToggleCreate: (value: boolean) => void;
}

function CreateProjectModal({ setToggleCreate }: CreateProjectModalProps) {
  const [error, setError] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const  navigate = useNavigate()
const {user} = useContext(UserContext)

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const newProject = {
        title: name,
        userId: user?._id

      }
     const res = await axios.post(`${url}/api/v1/projects/create`, newProject, {
       withCredentials: true,
     });
      console.log(res.data)
      setToggleCreate(false)
    // window.location.reload()
      navigate("/dashboard")
    } catch (error) {
      console.log(error)
    }
  };

  const validate = () => {
    if (name.length <= 4) {
      setError(true);
    } else {
    }
  };

  useEffect(() => {
    validate();
  }, [name]);



  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[80%] md:w-[40%] rounded-md shadow-md p-5 border">
      <h2 className="text-center font-semibold">Add New Project</h2>

      <form onSubmit={handleForm} className="mt-4">
        <div className="">
          <input
            className="border w-full rounded-md outline-none p-3 focus:border-black"
            type="text"
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {error ? (
            <span className="text-sm text-red-400 py-1">
              letter must be more than 4
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center justify-between">
        <Button className="bg-black w-20 p-2 rounded-md mt-4 text-white shadow-md hover:bg-slate-800">
          Submit
        </Button>
        <Button
        variant="destructive"
          onClick={() => setToggleCreate(false)}
          className=" w-20 p-2  rounded-md mt-4 text-white shadow-md hover:bg-slate-800 "
        >
          close
        </Button>
      </div>
      </form>
     
    </div>
  );
}

export default CreateProjectModal;
