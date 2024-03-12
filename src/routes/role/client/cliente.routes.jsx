import { Route, Routes } from "react-router-dom";

function ClienteRoutes() {
  return (
    <Routes>
      <Route path="/" index  element={<h1>Hola este es cliente</h1>} />
    </Routes>
  );
}

export default ClienteRoutes;
