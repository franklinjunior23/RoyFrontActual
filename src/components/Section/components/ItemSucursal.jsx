import { Link } from "react-router-dom";
import ItemInput from "@Components/Input/InputCopy/ItemInput";
import TruncateText from "@Helpers/TruncateTeaxt";
import PropTypes from "prop-types";
import ButtomDots from "@Components/Buttons/Buttom/ButtomDots";
import { UsecontextAuth } from "@/context/provider-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/helpers/config/axios-instance";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/componentUI/ui/dropdown-menu";
import { IconDots } from "@tabler/icons-react";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

// ...

function DeleteBranch() {
  const queryClint = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosInstance.delete(`/sucursales/${id}`);
      return data;
    },
    onSuccess: ({ succes }) => {
      if (succes) {
        toast.success("Sucursal eliminada");
        return queryClint.invalidateQueries("Sucursales");
      }
      toast.error("Error al eliminar la sucursal");
    },
    onError: (error) => {
      alert("Error al eliminar la sucursal");
      console.log(error);
    },
  });
}

function ItemSucursal({ value }) {
  const { nombre, id, Token } = value;
  const { RoleUser } = UsecontextAuth();
  const { mutate } = DeleteBranch();

  const OptionsSoporte = [
    {
      label: "Editar",
      icon: Pencil1Icon,
      Function: () => console.log(`Estais Editando ${id}`),
    },
    {
      label: "Eliminar",
      icon: TrashIcon,
      Function: () => mutate(id),
    },
  ];
  const OptionsAdministrador = [
    {
      label: "Editar",
      icon: Pencil1Icon,
      Function: () => console.log(`Estais Editando ${id}`),
    },
    {
      label: "Eliminar",
      icon: TrashIcon,
      Function: () => mutate(id),
    },
  ];

  return (
    <section className="relative h-[170px]  shadow-md border  dark:border-none rounded-lg text-white dark:bg-DarkComponent pt-10 pb-5 px-3 text-center">
      <div className="grid items-end h-full">
        <Link to={`${nombre}/Usuarios`} className="h-full capitalize">
          <h3 className="text-base font-semibold text-black md:text-xl dark:text-white">
            <TruncateText
              text={nombre}
              maxLength={14}
              ComponentNext={() => {
                <></>;
              }}
            />
          </h3>
        </Link>
        <ItemInput Value={Token} Message={`Token Copeado`} className={"mt-5"} />
      </div>
      <aside className="absolute top-3 right-5 ">
        {RoleUser === "Soporte" && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <IconDots className="text-black dark:text-white " size={25} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {OptionsSoporte.map((item, index) => (
                <DropdownMenuItem key={index} onClick={item.Function}>
                  {item.icon && <item.icon className="mr-2" />}
                  {item.label}
                </DropdownMenuItem>
              )) ?? "Colocar las Opciones"}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {RoleUser === "Administrador" && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <IconDots className="text-black dark:text-white " size={25} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {OptionsAdministrador.map((item, index) => (
                <DropdownMenuItem key={index} onClick={item.Function}>
                  {item.icon && <item.icon className="mr-2" />}
                  {item.label}
                </DropdownMenuItem>
              )) ?? "Colocar las Opciones"}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </aside>
    </section>
  );
}

export default ItemSucursal;

ItemSucursal.propTypes = {
  value: PropTypes.shape({
    nombre: PropTypes.string,
    id: PropTypes.number,
    Token: PropTypes.string,
  }),
};
