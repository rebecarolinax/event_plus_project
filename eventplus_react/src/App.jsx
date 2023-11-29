import Rotas from "./route";
import { UserContext } from "./Context/AuthContext";

import "./App.css";
import { UseContext, useState } from "react";

function App() {
  const [userData, setUserData] = useState({});

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Rotas />
    </UserContext.Provider>
  );
}

export default App
