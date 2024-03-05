import { TimeFromPeruvian } from "@/utils/FechaConvert";
import { IconEye } from "@tabler/icons-react";
import {
    createColumnHelper,
  } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { DataFindIdDevice } from "../../Sections/Utils/FindId";

export const SoporteOption = [
  { label: "Editar", Function: () => console.log("Editando") },
];
export const AdminOptions = [
  { label: "Editar", Function: () => console.log("Editando") },
  { label: "Eliminar", Function: () => console.log("Eliminar") },
];
export const ColumnDate = createColumnHelper();
export const ColumnDevice = [
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
  /** ColumnDate.accessor((row) => row.updatedAt, {
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
    }), */
  ColumnDate.accessor((row) => row.updatedAt, {
    id: "UpdateAt",
    header: "Update",
    cell: (ValueAgent) => (
      <span className="text-xs">
        {TimeFromPeruvian(
          ValueAgent?.getValue()?.DetalleDispositivos[0]?.updatedAt ??
            "No hay Componentes"
        )}
      </span>
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
