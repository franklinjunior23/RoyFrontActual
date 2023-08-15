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
    <div className="grid grid-cols-2 gap-3  lg:gap-10">
      {isLoading ?? <h1>Cargando ...</h1>}

      {data.length == 0 ? (
        <h1>No tiene sucursales</h1>
      ) : (
        data.map((value) => (
          <Link 
          to={value.nombre}
            key={value.id}
            className="bg-slate-800 rounded-md text-white py-4 px-6 text-center"
          >
            {value.nombre}
          </Link>
        ))
      )}
    </div>
  );
}
export default ListSucursales;
