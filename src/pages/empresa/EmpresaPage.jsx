import ItemSection from "@Components/Section/ItemSection";
import ItemView from "./components/ItemView";
import { useQuery } from "@tanstack/react-query";
import { ColorConteners } from "../../assets/DataDefault";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import FormEmpresa from "./components/FormEmpresa";
import { GetEmpresas } from "../../services/ApiGets";
import Listbusiness from "@/page/home/components/List-Company";
import AddCompany from "@/page/home/components/AddCompany";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/componentUI/ui/breadcrumb";
import { Link } from "react-router-dom";

function EmpresaPage() {
  // eslint-disable-next-line no-undef
  const [UserSearchEmpresa, setUserSearchEmpresa] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["EmpresasDataPage"],
    queryFn: GetEmpresas,
  });

  if (isLoading) return <h2 className="text-center">Cargando ...</h2>;
  return (
    <>
      <header className="mb-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink >
                <Link to={"/Dashboard"}>Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>Empresas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <Listbusiness />

      <main className="grid gap-4 mt-6 md:grid-cols-2">
        <section className="grid gap-4 md:grid-cols-2">
          {Object.keys(data?.details).map((item, index) => {
            return (
              <ItemView
                key={index}
                Color={ColorConteners[index].name}
                Title={item}
                Count={data?.details[item]}
              />
            );
          })}
        </section>
        <section className="">
          <header className="flex items-center justify-end gap-2 px-2 py-2 rounded-md shadow-md dark:bg-DarkComponent">
            <input
              type="text"
              value={UserSearchEmpresa}
              onChange={(e) => setUserSearchEmpresa(e.target.value)}
              className="w-full bg-transparent indent-1 dark:text-white focus:outline-none"
            />
            <IconSearch className="dark:text-white" />
          </header>
          <FormEmpresa />
        </section>
      </main>
    </>
  );
}
export default EmpresaPage;
