import { Route, Routes } from "react-router-dom";
import { PageDetalle, PageIdBC, PageBaseConocimiento } from "@Pages/BaseConoc";
import PageCreate from "@Pages/BaseConoc/PageCreate";
import PageKnowledge from "@/page/knowledge-base/Knowledge";
import KnowledgeeCreate from "@/page/knowledge-base/KnowledgeeCreate";
function RouteKnowledge() {
  return (
    <Routes>
        <Route path="/" element={<PageKnowledge />} />
        <Route path="create" element={<KnowledgeeCreate />} />
        <Route path="/:id" element={<PageIdBC />} />
        <Route path="/:id/detalle" element={<PageDetalle />} />
    </Routes>
  )
}

export default RouteKnowledge