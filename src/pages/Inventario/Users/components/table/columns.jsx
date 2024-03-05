import { Link } from "react-router-dom";

import { createColumnHelper } from "@tanstack/react-table";

import { IconBatteryFilled, IconEye } from "@tabler/icons-react";
import clsx from "clsx";
import ItemInput from "@Components/Input/InputCopy/ItemInput";

const ColumnDate = createColumnHelper();

export const ColumnsUsers = [
  { header: "#", accessorFn: (row, index) => index + 1 },
  { header: "Nombre", accessorFn: (row) => `${row.nombre} ${row.apellido}` },
  { header: "Genero", accessorKey: "genero" },
  ColumnDate.accessor((row) => row.Dispositivo, {
    id: "Dispositivo",
    header: "Asignado",
    cell: (row) => (
        <Link
        to={`/${
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
