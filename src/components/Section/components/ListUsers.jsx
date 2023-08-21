import { useQuery } from "@tanstack/react-query";
import { GetUserByEmpresaAndSucursal } from "../../../services/ApiGets";
import { useParams } from "react-router-dom";
import ItemUsers from "./ItemUsers";

function ListUsers() {
  const { nombreE, sucursalN } = useParams();
 
  const { data, isError,isLoading } = useQuery({
    initialData: [],
    queryKey: ["UsersSucur"],
    queryFn: () => GetUserByEmpresaAndSucursal(nombreE, sucursalN),
  });
  if(isLoading) return <h3 className="text-center"> Cargando ...</h3>
  if (isError) return <h1>A sucedido un error</h1>;

  return (
    <main className="mt-8 ">
      {data.length === 0 ? (
        <h2>No Existe Ningun Usuario</h2>
      ) : (
        <main className="grid gap-y-2 md:grid-cols-2 md:gap-x-5">
          {
            data.map((dato) => (
              <ItemUsers dato={dato} key={dato.id} />
            ) )
          }
        </main>
      )}
    </main>
  );
}
export default ListUsers;
