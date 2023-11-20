import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

const DeleteTask = ({ id, getData }) => {
  const setData = async () => {
    const res = await fetch("/api/dbActions", {
      method: "DELETE",
      body: JSON.stringify(id),
    });
    await res.json();
    getData();
  };

  return (
    <div className="grid place-content-center border border-neutral-500 rounded-sm p-1">
      <button onClick={setData}>
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default DeleteTask;
