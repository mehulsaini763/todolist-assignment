import React, { useRef } from "react";
import { Bars2Icon } from "@heroicons/react/24/solid";
import DeleteTask from "./DeleteTask";
import UpdateTask from "./UpdateTask";

const List = ({ todos, setTodos, getData }) => {
  const dragTask = useRef(0);
  const draggedOverTask = useRef(0);

  const handleSort = () => {
    const todosClone = [...todos];
    const temp = todosClone[dragTask.current];
    todosClone[dragTask.current] = todosClone[draggedOverTask.current];
    todosClone[draggedOverTask.current] = temp;
    setTodos(todosClone);
    setData(todosClone);
  };

  const setData = async (todosClone) => {
    await fetch("/api/dbActions", {
      method: "PATCH",
      body: JSON.stringify(todosClone),
    });
  };

  return (
    <div className="flex flex-col divide-y p-2">
      {todos.map((t, i) => (
        <div
          key={t.uid}
          className="p-2 flex gap-4 items-center"
          draggable
          onDragStart={() => (dragTask.current = i)}
          onDragEnter={() => (draggedOverTask.current = i)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >
          <Bars2Icon className="h-4 w-4 hover:cursor-grab" />
          <UpdateTask task={t} getData={getData} />
          <p className={`grow ${t.completed && "line-through font-bold"}`}>
            {t.taskName}
          </p>
          <DeleteTask id={t.uid} getData={getData} />
        </div>
      ))}
    </div>
  );
};

export default List;
