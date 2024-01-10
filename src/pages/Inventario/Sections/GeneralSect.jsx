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

function GeneralSect() {
  const [TextFilter, setTextFilter] = useState("");
  const { nombreE, sucursalN, idDisp } = useParams();
  const queryKey = ["GetDisp"];

  const { data, isLoading, isError } = useQuery(queryKey, async () => {
    const { data } = await axiosInstance.get(
      `Dispositivos/?empresa=${nombreE}&sucursal=${sucursalN}`
    );
    return data;
  });

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
          className={` px-4 py-0.5  font-bold rounded-lg text-xs text-white  ${
            info.getValue() === "Activo" ? "bg-green-600 " : "bg-blue-700"
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
            {TimeFromPeruvian(DataId?.DetalleDispositivos[0]?.updatedAt ?? 'No hay Componentes')}
          </span>
        );
      },
    }),
    ColumnDate.accessor((row) => row.id, {
      id: "ViewMaquina",
      header: "Ver Dispositivo",
      cell: (ValueAgent) => (
        <Link to={`${ValueAgent.getValue()}`}>
          <span className="bg-black text-white px-2 py-1.5 rounded-lg text-xs">
            Ver Dispositivo
          </span>
        </Link>
      ),
    }),
    ColumnDate.accessor((row) => row.id, {
      id: "id",
      header: "",
      cell: (IdItem) => {
        const Options_Downloads = () => {
          const DataId = data?.find((item) => item.id === IdItem.getValue());
          const DataDisp = { data: { ...DataId } };
          return (
            <PDFDownloadLink
              fileName={`${DataId?.nombre}&${DataId?.tipo ?? "Disp"}`}
              document={<PDF_PC data={DataDisp} />}
            >
              Reporte PDF
            </PDFDownloadLink>
          );
        };
        const ColumnsOption = [
          {
            label: "Editar",
            Function: () => console.log(`Estas Editando ${IdItem.getValue()}`),
          },
        ];

        return (
          <ButtomDots
            TitleOption={"Acciones"}
            Options={ColumnsOption}
            OptionDownload={Options_Downloads}
          />
        );
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

      <main className="mt-5 pb-5">
        {/* <section className="grid grid-cols-2 md:grid-cols-3  gap-5 ">
          {data?.map((value) => (
            <ItemDisp value={value} key={value.id} />
          ))}
        </section> */}
        <header className="mb-5">
          <input
            type="text"
            placeholder="Buscar"
            value={TextFilter}
            className="bg-black/30 rounded-lg py-1.5 px-2 text-white focus:outline-none placeholder:text-white"
            onChange={(e) => setTextFilter(e.target.value)}
          />
        </header>
        <section className="rounded-2xl border border-gray-200/60  dark:border-gray-100/10">
          <table className=" border-collapse   md:w-full dark:bg-DarkComponent   rounded-2xl text-white">
            <thead>
              {Table.getHeaderGroups().map((HeaderGroup) => (
                <tr key={HeaderGroup.id}>
                  {HeaderGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-3 text-base text-gray-500 dark:text-gray-300 font-semibold"
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
                  className=" border-t border-gray-200 dark:border-gray-100/10 dark:text-white text-black "
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={"p-3 text-center text-sm "}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
        <Outlet />
      </main>
    </>
  );
}

export default GeneralSect;
