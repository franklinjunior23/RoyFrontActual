import { Route, Routes } from "react-router-dom"
import DashboardPage from "../pages/dashboard/DashboardPage"


function AdminRoutes() {
  return (
    <Routes>
      <Route  element={<DashboardPage/>} />
      <Route index path="/" element={<h1>HOLA</h1>} />
    </Routes>
  )
}

export default AdminRoutes