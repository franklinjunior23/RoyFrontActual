import { useQuery } from "@tanstack/react-query";
import ItemSucursal from "./ItemSucursal";
import { GetSucursalesbyEmpresa } from "@/services/ApiGets";
import BranchSkeleton from "@/pages/empresa/components/BranchSkeleton";
import { useParams } from "react-router-dom";

function ListSucursales() {
  const { nombreE, } = useParams();
  const { isLoading, data,isFetching } = useQuery({
    initialData: [],
    queryKey: ["Sucursales"],
    queryFn: () => GetSucursalesbyEmpresa(nombreE),
  });

  // Verifica si isLoading es verdadero y renderiza un componente de carga
  if (isLoading && isFetching) {
    return <BranchSkeleton/>;
  }
  if(isFetching)return <BranchSkeleton/>
  return (
    <main className="">
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
    
        {data?.map((value) => (
          <ItemSucursal key={value.id} value={value} />
        ))}
         {data?.length === 0 && (
          <h1 className="dark:text-white">No tiene sucursales</h1>
        )}
      </section>
    </main>
  );
}

export default ListSucursales;
