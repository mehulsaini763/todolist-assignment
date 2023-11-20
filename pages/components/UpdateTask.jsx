import { CheckIcon } from "@heroicons/react/24/solid";
import React from "react";

const UpdateTask = ({ task, getData }) => {
  const setData = async (state) => {
    const res = await fetch("/api/dbActions", {
      method: "PUT",
      body: JSON.stringify({ id: task.uid, value: state }),
    });
    await res.json();
    getData();
  };

  return (
    <>
      {task.completed ? (
        <div className="bg-green-300 rounded-sm" onClick={() => setData(false)}>
          <CheckIcon className="w-5 h-5" />
        </div>
      ) : (
        <div
          className="grid place-content-center"
          onClick={() => setData(true)}
        >
          <div className="border border-neutral-500 p-2 rounded-sm"></div>
        </div>
      )}
    </>
  );
};

export default UpdateTask;
