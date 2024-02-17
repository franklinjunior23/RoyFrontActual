import { useQuery } from "@tanstack/react-query";
import { PDFDownloadLink } from "@react-pdf/renderer";
// import ItemDisp from "./ItemDisp";
import { Link, Outlet, useParams } from "react-router-dom";
import HeadCategory from "@Components/Section/components/HeadCategory";
import axiosInstance from "@Services/ConfigApi";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  createColumnHelper,
  getFilteredRowModel,
} from "@tanstack/react-table";
import ButtomDots from "@Components/Buttons/Buttom/ButtomDots";
import PDF_PC from "@Components/pdf/Pc/PDF_PC";
import { TimeFromPeruvian } from "@Helpers/FechaConvert";
import { useState } from "react";
import { IconEye } from "@tabler/icons-react";
import { UseContextLoged } from "@/context/AuhtLoged";
import { DataFindIdDevice } from "./Utils/FindId";
import TruncateText from "@/utils/TruncateTeaxt";

function GeneralSect() {
  const [TextFilter, setTextFilter] = useState("");
  const { nombreE, sucursalN, idDisp } = useParams();
  const queryKey = ["GetDisp"];
  const { RoleUser } = UseContextLoged();
  const { data, isLoading, isError } = useQuery(queryKey, async () => {
    const { data } = await axiosInstance.get(
      `Dispositivos/?empresa=${nombreE}&sucursal=${sucursalN}`
    );
    return data;
  });

  const SoporteOption = [
    { label: "Editar", Function: () => console.log("Editando") },
  ];
  const AdminOptions = [
    { label: "Editar", Function: () => console.log("Editando") },
    { label: "Eliminar", Function: () => console.log("Eliminar") },
  ];
  const ColumnDate = createColumnHelper();
  const columns = [
    { header: "#", accessorFn: (row, index) => index + 1 },
    { header: "Nombre", accessorKey: "nombre" },
    { header: "Tipo", accessorKey: "tipo" },
    { header: "Tipo Disposito", accessorKey: "tipo_Disp" },
    ColumnDate.accessor((row) => row.estado, {
      id: "Estado",
      header: "Estado",
      cell: (info) => (
        <span
          className={` px-4 py-0.5  font-semibold rounded-lg text-xs  border  ${
            info.getValue() === "Activo" ? "border-green-500  text-green-400 " : "border-blue-500 text-blue-500"
          }`}
        >
          {info.getValue()}{" "}
        </span>
      ),
    }),
    ColumnDate.accessor((row) => row.Agent, {
      id: "Agente",
      header: "Agente",
      cell: (ValueAgent) => <span>{ValueAgent.getValue() ? "Si" : "No"}</span>,
    }),
    ColumnDate.accessor((row) => row.IdUser, {
      id: "IdUser",
      header: "En Uso",
      cell: (UseItem) => {
        return <span>{UseItem.getValue() ? "Si" : "No"}</span>;
      },
    }),
    ColumnDate.accessor((row) => row.updatedAt, {
      id: "UpdateAt",
      header: "Update",

      cell: (ValueAgent) => {
        const DataId = data?.find(
          (item) => item.updatedAt === ValueAgent.getValue()
        );
        return (
          <span className="text-xs">
            {TimeFromPeruvian(
              DataId?.DetalleDispositivos[0]?.updatedAt ?? "No hay Componentes"
            )}
          </span>
        );
      },
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
    ColumnDate.accessor((row) => row.id, {
      id: "id",
      header: "",
      cell: (IdItem) => {
        const Options_Downloads = () => {
          const DataDevice = DataFindIdDevice({ data, IdItem });
          const DataDisp = { data: { ...DataDevice } };

          return (
            <PDFDownloadLink
              fileName={`${DataDevice?.codigo_dispositivo ?? "Disp"}`}
              document={<PDF_PC key={1} data={DataDisp} />}
            >
              Reporte PDF
            </PDFDownloadLink>
          );
        };

        if (RoleUser === "Soporte") {
          return (
            <ButtomDots
              Title={"Acciones"}
              Options={SoporteOption}
              OptionDownload={Options_Downloads}
            />
          );
        } else if (RoleUser === "Administrador") {
          return (
            <ButtomDots
              Title={"Acciones"}
              Options={AdminOptions}
              OptionDownload={Options_Downloads}
            />
          );
        }
      },
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

  if (isLoading) return <h2>Cargando ....</h2>;

  if (isError) return <h2>Hubo un error , recargue la pagina ....</h2>;

  if (data.length == 0)
    return (
      <>
        {idDisp === "create" ? (
          <Outlet />
        ) : (
          <>
            <HeadCategory data={"Dispositivo"} />
            <h2 className="mt-10 text-center">No hay Dispositos. crea uno</h2>
          </>
        )}
      </>
    );

  if (idDisp) return <Outlet />;

  return (
    <>
      <HeadCategory data={"Dispositivo"} />

      <main className="mt-3 pb-5">
        <header className="mb-5">
          <input
            type="text"
            placeholder="Buscar"
            value={TextFilter}
            className="bg-black/30 rounded-lg py-1.5 px-2 text-white focus:outline-none placeholder:text-white"
            onChange={(e) => setTextFilter(e.target.value)}
          />
        </header>
        <section className="rounded-2xl border  border-collapse border-gray-200/60  dark:border-gray-100/10 h-[575px] dark:bg-DarkComponent">
          <table className="table text-center    md:w-full dark:bg-DarkComponent   rounded-2xl text-white">
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
                  className=" border-t border-gray-200 dark:border-gray-100/10 dark:text-white dark:hover:bg-black/20 hover:bg-black/5 text-black "
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={"py-2 px-1 text-sm text-center  border-b dark:border-gray-100/10"}>
                      {
                         cell.column.columnDef.cell && (
                          <TruncateText
                            text={flexRender(cell.column.columnDef.cell, cell.getContext())}
                            ComponentNext={() => <></>}
                            maxLength={5}
                          />
                        )
                      }
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
       
      </main>
    </>
  );
}

export default GeneralSect;
