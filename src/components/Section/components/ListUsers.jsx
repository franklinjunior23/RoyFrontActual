import { useQuery } from "@tanstack/react-query";
import { GetUserByEmpresaAndSucursal } from "../../../services/ApiGets";
import { useParams } from "react-router-dom";
import ItemUsers from "./ItemUsers";

function ListUsers() {
  const { nombreE, sucursalN } = useParams();

  const { data, isError, isLoading } = useQuery({
    initialData: [],
    queryKey: ["UsersSucur"],
    queryFn: () => GetUserByEmpresaAndSucursal(nombreE, sucursalN),
  });
  if (isLoading) return <h3 className="text-center"> Cargando ...</h3>;
  if (isError) return <h1>A sucedido un error</h1>;
  if (data?.length === 0)
    return <h2 className="mt-10 text-center">No hay Usuarios Registrados</h2>;
  return (
    <main className="mt-8 ">
      <main className="grid gap-y-3  md:grid-cols-2 md:gap-x-3">
        {data.map((dato) => (
          <ItemUsers dato={dato} key={dato.id} />
        ))}
      </main>
    </main>
  );
}
export default ListUsers;
