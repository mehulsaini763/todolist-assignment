import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { v4 } from "uuid";

const Header = ({ getData }) => {
  const [show, setShow] = useState(false);
  const [taskName, setTaskName] = useState("");

  const setData = async () => {
    const res = await fetch("/api/dbActions", {
      method: "POST",
      body: JSON.stringify({ uid: v4(), taskName: taskName, completed: false }),
    });
    await res.json();
    setTaskName("");
    setShow(false);
    getData();
  };

  return (
    <div className="rounded-md grid place-content-center p-1 bg-neutral-50 shadow-sm">
      <button onClick={() => setShow(true)}>
        <PlusIcon className="h-6 w-6" />
      </button>
      {show && (
        <div className="absolute space-y-4 inset-x-0 items-center bg-neutral-100 text-lg justify-between p-4 mx-2 shadow-2xl rounded-md">
          <input
            autoFocus
            className="bg-neutral-100 focus:outline-none border-b-2 w-full"
            type="text"
            placeholder="TaskName..."
            onChange={(e) => setTaskName(e.target.value)}
          />
          <div className="flex justify-around">
            <button
              className="bg-neutral-50 rounded-md px-2 shadow-md"
              onClick={() => setData()}
            >
              Add Task
            </button>
            <button
              className="bg-neutral-50 rounded-md px-2 shadow-md"
              onClick={() => {
                setTaskName("");
                setShow(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
