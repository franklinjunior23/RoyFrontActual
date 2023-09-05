import { useQuery } from "@tanstack/react-query";
import { GetSucursalesbyEmpresa } from "../../../services/ApiGets";
import { Link } from "react-router-dom";
import ItemSucursal from "./ItemSucursal";

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
          <ItemSucursal key={value.id} value={value} />
        ))
      )}
    </div>
  );
}
export default ListSucursales;
