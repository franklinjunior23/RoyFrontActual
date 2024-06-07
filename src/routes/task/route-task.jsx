import TaskPage from "@/page/tasks/TaskPage";
import { Route, Routes } from "react-router-dom";

export default function TaskRoutes(){
    return (
        <Routes>
            <Route path="/" element={<TaskPage />} />
        </Routes>
    )
}