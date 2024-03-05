import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetUserByEmpresaAndSucursal } from "@/services/ApiGets";
import { ColumnsUsers } from "./columns";
import TruncateText from "@/utils/TruncateTeaxt";
import NotRegistred from "../NotRegistred";
import { useState } from "react";
import PDFUSERTOTAL from "@Components/pdf/users/pdf-user-total";

export function Users() {
  const { nombreE, sucursalN } = useParams();
  const [TextFilter, setTextFilter] = useState("");
  const { data, isError, isLoading } = useQuery({
    initialData: [],
    queryKey: ["UsersSucur"],
    queryFn: () => GetUserByEmpresaAndSucursal(nombreE, sucursalN),
  });
  const Table = useReactTable({
    data,
    columns: ColumnsUsers,
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
          <button className="bg-black px-5 rounded-md py-1">List Users</button>
        </PDFDownloadLink>
      </header>
      <section className="rounded-2xl border  border-collapse border-gray-200/60  dark:border-gray-100/10 min-h-[575px] dark:bg-DarkComponent">
        <table className="table text-center   md:w-full dark:bg-DarkComponent   rounded-2xl text-white">
          <thead>
            {Table.getHeaderGroups().map((HeaderGroup) => (
              <tr key={HeaderGroup.id}>
                {HeaderGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-2.5 px-3 text-base text-gray-500 dark:text-gray-300 font-medium"
                  >
                    {header.column.columnDef.header}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {Table.getRowModel()?.rows.map((row, index) => (
              <tr
                key={index}
                className=" border-t border-gray-200 dark:border-gray-100/10 dark:text-white text-black hover:bg-black/5  dark:hover:bg-black/20"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={
                      "py-2 px-1 text-sm text-center  border-b dark:border-gray-100/10"
                    }
                  >
                    {cell.column.columnDef.cell && (
                      <TruncateText
                        text={flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                        ComponentNext={() => <></>}
                        maxLength={5}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <footer className="flex justify-end mt-5">
        <button
          onClick={() => Table.previousPage()}
          disabled={!Table.getCanPreviousPage()}
          className="bg-black px-3 py-1.5  rounded-lg mx-1 text-white text-sm"
        >
          Retroceder
        </button>
        <button
          onClick={() => Table.nextPage()}
          disabled={!Table.getCanNextPage()}
          className="bg-black px-3 py-1.5  rounded-lg mx-1 text-white text-sm"
        >
          Siguiente
        </button>
      </footer>
    </>
  );
}
