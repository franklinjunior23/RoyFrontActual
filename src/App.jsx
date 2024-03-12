import { Route, Routes } from "react-router-dom";
import RolesOpcion from "./middleware/RolesOpcion";
import PageDispositivo from "@Pages/Layaots/Dispositivo/PageDispositivo";
import { AuthProvider } from "./context/provider-auth";
import Login from "./page/Login";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard/*" element={<RolesOpcion />} />
          <Route path="/Dispositivo/:id" element={<PageDispositivo />} />
          <Route path="*" element={<h2>Error 404</h2>} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
