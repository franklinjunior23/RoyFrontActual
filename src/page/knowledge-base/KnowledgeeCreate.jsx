import {
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/componentUI/ui/breadcrumb";

import FormCreate from "./components/FormCreate";
import Header from "./components/Header";
function KnowledgeeCreate() {
  return (
    <div>
      <Header>
        <BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Crear</BreadcrumbPage>
        </BreadcrumbItem>
      </Header>
      <main className="mt-5">
        <FormCreate />
      </main>
    </div>
  );
}

export default KnowledgeeCreate;
