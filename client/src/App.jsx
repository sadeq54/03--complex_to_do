import { useEffect, useState } from "react";
import ListItem from "./components/ListIteam";

import ListHeader from "./components/ListHeader";
function App() {
  const [taskes, setTaskes] = useState(null);

  const getData = async () => {
    const userEmail = "sadeqmass@gmail.com";
    try {
      const respons = await fetch(`http://localhost:8000/todo/${userEmail}`);
      const jsonData = await respons.json();

      // console.log(jsonData[0]);
      setTaskes(jsonData)
      // this will make the
    } catch (error) {
      console.error(error);
    }
  };
  const date = new Date();
  

  useEffect(() => {
    getData();
  }, []);

  const sortedTaskes =  taskes?.sort((a,b)=> new Date(a.date)-  new Date(b.date))


  return (
    <>
      <div className="app">
        <ListHeader listName={"⭐ Holiday ticket list"} />
        {sortedTaskes?.map((task)=> <ListItem key={task.id} taskes={task} />)}
      </div>
    </>
  );
}

export default App;
