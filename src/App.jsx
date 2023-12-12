import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPag/Login";
import { ContextoAuth } from "./context/AuhtLoged";

import RolesOpcion from "./middleware/RolesOpcion";

function App() {
  
  return (
    <>
      <ContextoAuth>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard/*" element={<RolesOpcion/>} />
          <Route path="/Dispositivo/:id" element={<h1>hola Dispositivo</h1>} />
          <Route path="*" element={<h2>Error 404</h2>}
           />
        </Routes>
      </ContextoAuth>
    </>
  );
}

export default App;
