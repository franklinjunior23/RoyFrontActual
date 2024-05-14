import { useQuery } from "@tanstack/react-query";
import { PDFDownloadLink } from "@react-pdf/renderer";
// import ItemDisp from "./ItemDisp";
import { Link, Outlet, useParams } from "react-router-dom";
import HeadCategory from "@Components/Section/components/HeadCategory";

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
import { useState } from "react";
import { IconDevicesPc, IconDots, IconEye } from "@tabler/icons-react";

import { DataFindIdDevice } from "./Utils/FindId";
import TruncateText from "@/utils/TruncateTeaxt";

import PdfDevices from "@Components/pdf/users/pdf-devices.total";
import { UsecontextAuth } from "@/context/provider-auth";
import { TimeFromPeruvian } from "@/helpers/utils/conver-day-ddmmyy";
import { DeleteDevice } from "./Utils/Device-services";
import { Input } from "@/componentUI/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/componentUI/ui/table";
import { Button, buttonVariants } from "@/componentUI/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/componentUI/ui/dropdown-menu";
import PageCreateArea from "../Area/PageCreate";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { IconFileText } from "@tabler/icons-react";
import { MessageSquare, Users2 } from "lucide-react";

function GeneralSect({ data }) {
  const [TextFilter, setTextFilter] = useState("");
  const { nombreE, sucursalN, idDisp } = useParams();
  const { RoleUser } = UsecontextAuth();
  const { mutate } = DeleteDevice();

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
            info.getValue() === "Activo"
              ? "border-green-500  text-green-400 "
              : "border-blue-500 text-blue-500"
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
      header: "Actualizado",

      cell: (ValueAgent) => {
        const DataId = data?.find(
          (item) => item.updatedAt === ValueAgent.getValue()
        );
        return (
          <span className="text-xs">
            {TimeFromPeruvian(
              DataId?.DetalleDispositivo?.updatedAt ?? "No hay Componentes"
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
          <IconEye className="p-1 text-white bg-black rounded-md " size={35} />
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
        const SoporteOption = [
          { label: "Editar", Function: () => console.log("Editando") },
          { label: "Eliminar", Function: () => mutate(IdItem.getValue()) },
          {
            label: "Reporte PDF",
            Function: null,
            component: Options_Downloads,
          },
        ];
        const AdminOptions = [
          { label: "Editar", Function: () => console.log("Editando") },
          { label: "Eliminar", Function: () => mutate(IdItem.getValue()) },
          {
            label: "Reporte PDF",
            Function: null,
            component: Options_Downloads,
          },
        ];
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" size="icon">
                  <IconDots className="text-black dark:text-white " size={22} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {RoleUser === "Soporte" &&
                  SoporteOption.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => item.Function()}
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                {RoleUser === "Administrador" &&
                  AdminOptions.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => item.Function()}
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>{" "}
          </>
        );
      },
    }),
  ];

  const Tabledata = useReactTable({
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
  const BUttonVarin = buttonVariants({ variant: "default", size: "sm" });

  return (
    <>
      <main className="pb-5 ">
        <header className="flex justify-between items-center gap-2 pt-5 relative dark:text-white mb-5">
          <div>
            <Input
              value={TextFilter}
              onChange={(e) => setTextFilter(e.target.value)}
              placeholder="Buscar"
              className={"md:w-[300px]"}
            />
          </div>
          <div className="flex  items-end gap-2">
            <Link to={"create"} className={BUttonVarin}>
              <IconDevicesPc className="mr-2" />
              Crear Dispositivo
            </Link>
            <PageCreateArea />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button size="icon" variant="secondary">
                  <DotsVerticalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <IconFileText className="mr-2 h-4 w-4" />
                    <span>Reportes</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <IconDevicesPc className="mr-2 h-4 w-4" />
                        <PDFDownloadLink
                          document={
                            <PdfDevices
                              data={data}
                              ompany={nombreE}
                              branch={sucursalN}
                            />
                          }
                          fileName={`Lista-devices-${nombreE}/${sucursalN}`}
                        >
                          Lista de Dispositivos
                        </PDFDownloadLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Message</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <section className="rounded-xl border ">
          <Table>
            <TableHeader>
              {Tabledata.getHeaderGroups().map((HeaderGroup) => (
                <TableRow key={HeaderGroup.id}>
                  {HeaderGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="py-1.5 px-3 text-center text-gray-500 dark:text-gray-300 font-medium"
                    >
                      {header.column.columnDef.header}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            {data?.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center h-[350px]"
                  >
                    No hay datos
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {Tabledata.getRowModel()?.rows.map((row, index) => (
                  <TableRow
                    key={index}
                    className="text-black border-t border-gray-200 dark:border-gray-100/10 dark:text-white dark:hover:bg-black/20 hover:bg-black/5"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={
                          "py-1.5 px-1 text-sm text-center  border-b dark:border-gray-100/10"
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
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </section>
        <footer className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {Tabledata.getFilteredSelectedRowModel().rows.length} of{" "}
            {Tabledata.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => Tabledata.previousPage()}
              disabled={!Tabledata.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => Tabledata.nextPage()}
              disabled={!Tabledata.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </footer>
      </main>
    </>
  );
}

export default GeneralSect;
