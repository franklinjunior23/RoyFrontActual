import { useQuery } from "@tanstack/react-query";
import ItemSucursal from "./ItemSucursal";
import { GetSucursalesbyEmpresa } from "@/services/ApiGets";
import BranchSkeleton from "@/pages/empresa/components/BranchSkeleton";

function ListSucursales({ empresa }) {
  const { isLoading, data } = useQuery({
    initialData: [],
    queryKey: ["Sucursales"],
    queryFn: () => GetSucursalesbyEmpresa(empresa),
  });

  // Verifica si isLoading es verdadero y renderiza un componente de carga
  if (isLoading) {
    return <BranchSkeleton/>;
  }

  return (
    <main className="">
      <section className="grid grid-cols-2  md:grid-cols-4  gap-4">
       
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
