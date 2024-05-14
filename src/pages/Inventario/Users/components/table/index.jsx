import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetUserByEmpresaAndSucursal } from "@/services/ApiGets";
import { ColumnsUsers } from "./columns";
import TruncateText from "@/utils/TruncateTeaxt";
import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFUSERTOTAL from "@Components/pdf/users/pdf-user-total";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/componentUI/ui/table";
import { Button, buttonVariants } from "@/componentUI/ui/button";
import { Input } from "@/componentUI/ui/input";
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
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { MessageSquare, Users2 } from "lucide-react";
import { IconBoxMultiple, IconFileText } from "@tabler/icons-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/componentUI/ui/popover";
import PageCreateArea from "@/pages/Inventario/Area/PageCreate";

export function Users() {
  const { nombreE, sucursalN } = useParams();
  const [TextFilter, setTextFilter] = useState("");
  const { data, isError, isLoading } = useQuery({
    initialData: [],
    queryKey: ["UsersSucur"],
    queryFn: () => GetUserByEmpresaAndSucursal(nombreE, sucursalN),
  });
  const tabledata = useReactTable({
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
  const buttonClasses = buttonVariants({ variant: "default", size: "sm" });
  return (
    <>
      <header className="flex justify-between items-end mt-5">
        <header>
          <Input
            value={TextFilter}
            onChange={(e) => setTextFilter(e.target.value)}
            placeholder="Buscar"
            className={"md:w-[300px]"}
          />
        </header>
        <header className="flex items-end gap-2">
          <Link to={"create"} className={buttonClasses}>
            <Users2 className="w-4 h-4 mr-2" />
            Crear Usuario
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
                      <Users2 className="mr-2 h-4 w-4" />
                      <PDFDownloadLink
                        document={
                          <PDFUSERTOTAL
                            company={nombreE}
                            branch={sucursalN}
                            data={data}
                          />
                        }
                        fileName={`List-users-${nombreE}/${sucursalN}`}
                      >
                        Lista de Usuarios Registrados
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
        </header>
      </header>

      <div className="rounded-xl border mt-5">
        <Table className="">
          <TableHeader>
            {tabledata.getHeaderGroups().map((HeaderGroup) => (
              <TableRow key={HeaderGroup.id}>
                {HeaderGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="py-2.5 px-3  text-center text-gray-500 dark:text-gray-300 font-medium"
                  >
                    {header.column.columnDef.header}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {tabledata.getRowModel().rows?.length ? (
              tabledata.getRowModel()?.rows.map((row, index) => (
                <TableRow
                  key={index}
                  className="  border-gray-200 dark:border-gray-100/10 dark:text-white text-black hover:bg-black/5  dark:hover:bg-black/20"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        "py-1.5 px-1 text-sm text-center  dark:border-gray-100/10"
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={ColumnsUsers.length}
                  className="h-52 text-center"
                >
                  No hay datos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {tabledata.getFilteredSelectedRowModel().rows.length} of{" "}
          {tabledata.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => tabledata.previousPage()}
            disabled={!tabledata.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => tabledata.nextPage()}
            disabled={!tabledata.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
