import { Montserrat } from "next/font/google";
import List from "./components/List";
import Header from "./components/Header";
import { useEffect, useState } from "react";
const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("/api/dbActions", {
      method: "GET",
    });
    const data = await res.json();
    setTodos(data);
  };

  if (todos == null)
    return (
      <div className="absolute inset-0 text-2xl bg-neutral-50 grid place-content-center">
        <p>PLEASE WAIT...</p>
      </div>
    );

  return (
    <main
      className={`grid min-h-screen place-content-center p-28 bg-neutral-200 ${montserrat.className}`}
    >
      <div className="container">
        <div className="header">
          <p>todos</p>
          <Header getData={getData}/>
        </div>
        <List todos={todos} setTodos={setTodos} getData={getData}/>
      </div>
    </main>
  );
}
