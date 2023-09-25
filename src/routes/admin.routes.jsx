import { Navigate, Route, Routes } from "react-router-dom"
import DashboardPage from "../pages/dashboard/DashboardPage"


function AdminRoutes() {
  return (
    <Routes>
      <Route  element={<DashboardPage/>} >
      <Route index path="/" element={<Navigate to={"Home"} />} />
      <Route path="/Home" element={<h2>Jpña</h2>} />

      </Route>
      
    </Routes>
  )
}

export default AdminRoutes