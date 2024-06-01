import { Route, Routes } from "react-router-dom";
import { PageDetalle, PageIdBC, PageBaseConocimiento } from "@Pages/BaseConoc";
import PageCreate from "@Pages/BaseConoc/PageCreate";
import PageKnowledge from "@/page/knowledge-base/Knowledge";
import KnowledgeeCreate from "@/page/knowledge-base/KnowledgeeCreate";
import FindKnowledge from "@/page/knowledge-base/FindKnowledge";
function RouteKnowledge() {
  return (
    <Routes>
      <Route path="/" element={<PageKnowledge />} />
      <Route path="/:folder/create-article" element={<KnowledgeeCreate />} />
      <Route path="/article/:id" element={<FindKnowledge />} />
      <Route path="/:id/detalle" element={<PageDetalle />} />
    </Routes>
  );
}

export default RouteKnowledge;
