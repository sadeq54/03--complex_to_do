import { useEffect, useState } from "react";
import ListItem from "./components/ListIteam";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";


import ListHeader from "./components/ListHeader";
function App() {
  const [taskes, setTaskes] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(null)

  
  // using the cookies for retriev the data from it (email and token)


const authToken =  cookie.AuthToken 
  const getData = async () => {
    const userEmail = cookie.Email;
    try {
      const respons = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/todo/${userEmail}`);
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
  if (authToken)
    getData();
  }, []);

  const sortedTaskes =  taskes?.sort((a,b)=> new Date(a.date)-  new Date(b.date))
  console.log(sortedTaskes)

  return (
    <>
      <div className="app">
        {!authToken && <Auth />}
        {authToken && 
        <>
        <ListHeader
        getData={getData} 
        listName={"⭐ Holiday ticket list"} />
        <p className="user-email">Wellcom  {cookie.Email}</p>
        {sortedTaskes?.map((task)=> <ListItem key={task.id} taskes={task}
        getData={getData} />)}
        </>
        }
        <p className="copy-right">&copy; sadeq {date.getFullYear()}</p>
      </div>
    </>
  );
}

export default App;
