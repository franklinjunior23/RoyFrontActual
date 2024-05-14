import { Outlet, useParams } from "react-router-dom";
import RetrocederItem from "@Components/Navlinks/components/RetrocederItem";
import ListSucursales from "@Components/Section/components/ListSucursales";
import Setting from "./section/Setting";
import { IconBuilding } from "@tabler/icons-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/componentUI/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/componentUI/ui/popover";

import { Button } from "@/componentUI/ui/button";
import FormBranch from "./section/FormBranch";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/helpers/config/axios-instance";
import { Skeleton } from "@/componentUI/ui/skeleton";
import { FormateDayD } from "@/helpers/utils/conver-day-ddmmyy";

function BranchsPage() {
  const { nombreE, sucursalN } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["GetEmpresaByiD"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/empresas/${nombreE}`);
      return data;
    },
  });


  return (
    <main>
      <RetrocederItem />

      {sucursalN ? (
        <Outlet />
      ) : (
        <>
          <div className="border-b pb-3 flex justify-between items-end gap-2">
            <div>
              <h3 className="flex  items-center gap-3 text-2xl capitalize font-bold mb-3">
                {nombreE?.toLowerCase()} <IconBuilding size={30} />{" "}
              </h3>
              <footer className="text-sm">
                {isLoading ? (
                  <div className="grid gap-2">
                    <Skeleton className="w-[120px] h-[10px] rounded-full" />
                    <Skeleton className="w-[180px] h-[10px] rounded-full" />
                  </div>
                ) : (
                  <ul>
                    <li>Lugar : {data?.body?.data?.lugar} </li>
                    <li>Creado : {FormateDayD(data?.body?.data?.createdAt)}</li>
                  </ul>
                )}

               
              </footer>
            </div>
            <div className="flex gap-2 items-center">
              <Popover>
                <PopoverTrigger>
                  <Button>Crear Sucursal</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <h3 className="text-center mb-2">Crear Sucursal</h3>
                  <FormBranch />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <main className="mt-5 ">
            <Tabs defaultValue="list" className="">
              <TabsList>
                <TabsTrigger value="list">Lista</TabsTrigger>
                <TabsTrigger value="config">Configuracion</TabsTrigger>
              </TabsList>
              <TabsContent value="list">
                <ListSucursales />
              </TabsContent>
              <TabsContent value="config">
                <Setting />
              </TabsContent>
            </Tabs>
          </main>
        </>
      )}
    </main>
  );
}
export default BranchsPage;
