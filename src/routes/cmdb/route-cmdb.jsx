import PageCmdb from "@/page/cmdb/Index"
import { Route, Routes } from "react-router-dom"

function Routecmdb() {
  return (
    <Routes>
        <Route path="/" element={<PageCmdb/>} />
      
    </Routes>
  )
}

export default Routecmdb
