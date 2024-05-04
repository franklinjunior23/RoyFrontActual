import { useQuery } from "@tanstack/react-query";
import ItemSucursal from "./ItemSucursal";
import { GetSucursalesbyEmpresa } from "@/services/ApiGets";
import BranchSkeleton from "@/pages/empresa/components/BranchSkeleton";
import { useParams } from "react-router-dom";
import { UsecontextAuth } from "@/context/provider-auth";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/componentUI/ui/sheet";
import { TrashIcon } from "@radix-ui/react-icons";
import { IconTrash } from "@tabler/icons-react";
import { GetBranchsDelete } from "@/page/branch/actions/UseBranchs";

function ListSucursales() {
  const { nombreE } = useParams();
  const { RoleUser } = UsecontextAuth();
  const { isLoading, data, isFetching } = useQuery({
    initialData: [],
    queryKey: ["Sucursales"],
    queryFn: () => GetSucursalesbyEmpresa(nombreE),
  });

  // Verifica si isLoading es verdadero y renderiza un componente de carga
  if (isLoading && isFetching) {
    return <BranchSkeleton />;
  }
  if (isFetching) return <BranchSkeleton />;
  return (
    <main className="">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {data?.map((value) => (
          <ItemSucursal key={value.id} value={value} />
        ))}
        {data?.length === 0 && (
          <h1 className="dark:text-white">No tiene sucursales</h1>
        )}
      </section>
      {RoleUser === "Administrador" && (
        <div className="fixed bg-blue-400 bottom-6 right-6">
          <BranchsDeleting />
        </div>
      )}
    </main>
  );
}

export default ListSucursales;

function BranchsDeleting() {
  const { data, isLoading } = GetBranchsDelete();
  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <IconTrash size={30} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sucursales Eliminadas</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {data?.data.map((value) => (
            <>
             <h3 className="capitalize">{value?.nombre}</h3>
            </>
          ))}
          {data?.length === 0 && (
            <h1 className="dark:text-white">No tiene sucursales</h1>
          )}
        </section>
      </SheetContent>
    </Sheet>
  );
}
