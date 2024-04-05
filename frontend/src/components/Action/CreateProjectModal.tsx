import { FormEvent, useEffect, useState } from "react";

interface CreateProjectModalProps {
  setToggleCreate: (value: boolean) => void;
}

function CreateProjectModal({ setToggleCreate }: CreateProjectModalProps) {
  const [error, setError] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[80%] rounded-md shadow-md p-5 border">
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
        <button className="bg-black w-20 p-2 rounded-md mt-4 text-white shadow-md hover:bg-slate-800">
          Submit
        </button>
      </form>
      <div className="flex items-end justify-end mt-3">
        <button
          onClick={() => setToggleCreate(false)}
          className="bg-black w-20 p-2  rounded-md mt-4 text-white shadow-md hover:bg-slate-800 "
        >
          close
        </button>
      </div>
    </div>
  );
}

export default CreateProjectModal;
