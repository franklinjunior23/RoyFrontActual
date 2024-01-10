import { Route, Routes } from "react-router-dom";
import Login from "@Pages/LoginPag/Login";
import { ContextoAuth } from "@Contexts/AuhtLoged";

import RolesOpcion from "./middleware/RolesOpcion";
import PageDispositivo from "@Pages/Layaots/Dispositivo/PageDispositivo";

function App() {
  return (
    <>
      <ContextoAuth>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard/*" element={<RolesOpcion />} />
          <Route path="/Dispositivo/:id" element={<PageDispositivo />} />
          <Route path="*" element={<h2>Error 404</h2>} />
        </Routes>
      </ContextoAuth>
    </>
  );
}

export default App;
