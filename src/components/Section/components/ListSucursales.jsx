import { useQuery } from "@tanstack/react-query";
import { GetSucursalesbyEmpresa } from "../../../services/ApiGets";
import { Link } from "react-router-dom";

function ListSucursales({ empresa }) {
  const { isLoading, data } = useQuery({
    initialData: [],
    queryKey: ["Sucursales"],
    queryFn: () => GetSucursalesbyEmpresa(empresa),
  });
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3  lg:gap-x-4">
      {isLoading ?? <h1>Cargando ...</h1>}

      {data.length == 0 ? (
        <h1>No tiene sucursales</h1>
      ) : (
        data.map((value) => (
          <div
            key={value.id}
            className="bg-slate-800 rounded-md text-white py-10 px-6 text-center"
          >
            <Link to={value.nombre} className="capitalize">{value.nombre}</Link>
          </div>
        ))
      )}
    </div>
  );
}
export default ListSucursales;
