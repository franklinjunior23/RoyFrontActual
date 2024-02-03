import ItemSection from "@Components/Section/ItemSection";
import ItemView from "./components/ItemView";
import { useQuery } from "@tanstack/react-query";
import { ColorConteners } from "../../assets/DataDefault";
import {  IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import FormEmpresa from "./components/FormEmpresa";
import { GetEmpresas } from "../../services/ApiGets";

function EmpresaPage() {
  // eslint-disable-next-line no-undef
  const [UserSearchEmpresa, setUserSearchEmpresa] = useState("");

  const {data,isLoading} = useQuery({ queryKey: ["EmpresasDataPage"], queryFn: GetEmpresas });


  if (isLoading) return <h2 className="text-center">Cargando ...</h2>;
  return (
    <>
      <ItemSection LinkDate={true} />
      <main className="grid gap-4 md:grid-cols-2 mt-4">
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
          <header className="flex gap-2 dark:bg-DarkComponent px-2 rounded-md py-2  items-center justify-end shadow-md">
            <input
              type="text"
              value={UserSearchEmpresa}
              onChange={(e) => setUserSearchEmpresa(e.target.value)}
              className=" w-full indent-1   bg-transparent dark:text-white  focus:outline-none"
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
