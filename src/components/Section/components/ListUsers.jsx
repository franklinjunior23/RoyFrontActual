import { useQuery } from "@tanstack/react-query";
import { GetUserByEmpresaAndSucursal } from "../../../services/ApiGets";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Link, useParams } from "react-router-dom";

import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { IconBatteryFilled, IconEye } from "@tabler/icons-react";
import clsx from "clsx";
import ItemInput from "@Components/Input/InputCopy/ItemInput";

import NotRegistred from "@/pages/Inventario/Users/components/NotRegistred";
import PDFUSERTOTAL from "@Components/pdf/users/pdf-user-total";

function ListUsers() {
  const { nombreE, sucursalN } = useParams();
  const [TextFilter, setTextFilter] = useState("");
  const { data, isError, isLoading } = useQuery({
    initialData: [],
    queryKey: ["UsersSucur"],
    queryFn: () => GetUserByEmpresaAndSucursal(nombreE, sucursalN),
  });

  const ColumnDate = createColumnHelper();
  const columns = [
    { header: "#", accessorFn: (row, index) => index + 1 },
    { header: "Nombre", accessorFn: (row) => `${row.nombre} ${row.apellido}` },
    { header: "Genero", accessorKey: "genero" },
    ColumnDate.accessor((row) => row.Dispositivo, {
      id: "Dispositivo",
      header: "Asignado",
      cell: (row) => (
        <Link
          to={`/Dashboard/Home/${nombreE}/${sucursalN}/Inventario/${
            row.getValue()?.id
          }`}
        >
          <div
            className={clsx(
              ` px-2 py-0.5  font-semibold rounded-lg text-xs border border-blue-500 text-blue-500 w-fit flex mx-auto items-center gap-2 `
            )}
          >
            <IconBatteryFilled size={14} />{" "}
            <span className="capitalize">
              {row.getValue()?.nombre ?? "no tiene"}
            </span>
          </div>
        </Link>
      ),
    }),
    ColumnDate.accessor((row) => row.estado, {
      id: "Estado",
      header: "Estado",
      cell: (info) => (
        <span
          className={` px-4 py-0.5  font-semibold rounded-lg text-xs  border  ${
            info.getValue() === "Activo"
              ? "border-green-400  text-green-400 "
              : "border-red-400 text-red-400"
          }`}
        >
          {info.getValue()}{" "}
        </span>
      ),
    }),
    ColumnDate.accessor((row) => row.anydesk_id, {
      id: "anydesk_id",
      header: "Anydesk Id",
      cell: (row) => (
        <div className="w-fit mx-auto">
          <ItemInput
            Hide={true}
            Message={"Anydesk Id copeado correctamente"}
            Value={row.getValue()}
          />
        </div>
      ),
    }),
    ColumnDate.accessor((row) => row.id, {
      id: "ViewMaquina",
      header: "",
      cell: (ValueAgent) => (
        <Link
          to={`${ValueAgent.getValue()}`}
          className="grid place-content-center"
        >
          <IconEye className="bg-black p-1 rounded-md text-white " size={35} />
        </Link>
      ),
    }),
  ];
  const Table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: TextFilter,
    },
    onGlobalFilterChange: setTextFilter,
  });
  if (isLoading) return <h3 className="text-center"> Cargando ...</h3>;
  if (isError) return <h1>A sucedido un error</h1>;
  if (data?.length === 0)
    return (
      <main className="grid place-content-center py-20">
        <NotRegistred Title="No existe usuarios registrados" href="create" />
      </main>
    );
  return (
    <>
      <main className="">
        <header className="mb-5 flex justify-between mt-3">
          <input
            type="text"
            placeholder="Buscar"
            value={TextFilter}
            className="bg-black/30 rounded-lg py-1.5 px-2 text-white focus:outline-none placeholder:text-white"
            onChange={(e) => setTextFilter(e.target.value)}
          />
          <PDFDownloadLink
            fileName={`Lista-Usuarios-${nombreE}/${sucursalN}`}
            document={
              <PDFUSERTOTAL data={data} company={nombreE} branch={sucursalN} />
            }
          >
            <button className="bg-black px-5 rounded-md py-1">
              List Users
            </button>
          </PDFDownloadLink>
        </header>
       
      </main>
    </>
  );
}
export default ListUsers;
