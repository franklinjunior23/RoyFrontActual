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
import { IconTrash } from "@tabler/icons-react";
import { TimeFromPeruvian } from "@/helpers/utils/conver-day-ddmmyy";
import { Card } from "antd";
import { CardContent, CardFooter, CardTitle } from "@/componentUI/ui/card";
import { Button } from "@/componentUI/ui/button";
import {
  GetBranchsDelete,
  RemoveDefine,
  RestaureBranch,
} from "@/page/branch/actions/UseBranchDelete";

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
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4 mt-4">
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
  const { mutate, isLoading: LoadingRestaure } = RestaureBranch();
  const { mutate: RemoveBranch, isLoading: LoadingRemove } = RemoveDefine();
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
            Lista de las sucursales eliminadas
          </SheetDescription>
        </SheetHeader>
        <section className=" gap-2 mt-5 ">
          {data?.data.map((value) => (
            <Card key={value?.id} className=" text-sm">
              <CardTitle>
                <h3 className="capitalize">{value?.nombre}</h3>
              </CardTitle>
              <CardContent className="p-0 mt-2">
                <h3>Creado : {TimeFromPeruvian(value.createdAt)}</h3>
                <h3>Eliminado : {TimeFromPeruvian(value.deletedAt)} </h3>
              </CardContent>
              <CardFooter className="p-0 mt-5 grid grid-cols-2 gap-2">
                <Button
                  onClick={() => mutate(value?.id)}
                  disabled={LoadingRestaure}
                >
                  {LoadingRestaure ? "Restaurando" : "Restaurar"}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => RemoveBranch(value?.id)}
                  disabled={LoadingRemove}
                >
                  {LoadingRemove ? "Eliminando" : "Eliminar"}
                </Button>
              </CardFooter>
            </Card>
          ))}
          {data?.length === 0 && (
            <h1 className="dark:text-white">No tiene sucursales</h1>
          )}
        </section>
      </SheetContent>
    </Sheet>
  );
}
