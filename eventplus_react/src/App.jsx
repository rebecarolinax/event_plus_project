import Rotas from "./Routes/route";
import { UserContext } from "./Context/AuthContext";

import "./App.css";
import { UseContext, useEffect, useState } from "react";

function App() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserData(token === null ? {} : JSON.parse(token));
    
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Rotas />
    </UserContext.Provider>
  );
}

export default App;
