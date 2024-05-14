import ListCategoy from "@Components/Section/components/ListCategoy";
import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/componentUI/ui/tabs";

function LayaotInventory() {
  const { idDisp, idUsuario } = useParams();
  return (
    <main>
      
      {!idDisp && !idUsuario && (
        <div className="mb-4 md:mb-4 ">
         
          <Tabs defaultValue="usuarios">
            <TabsList>
              <Link to="Usuarios">
                <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
              </Link>
              <Link to="inventario">
                <TabsTrigger value="inventario">Inventario</TabsTrigger>
              </Link>
            </TabsList>
           
          </Tabs>
        </div>
      )}
      <Outlet />
    </main>
  );
}

export default LayaotInventory;
