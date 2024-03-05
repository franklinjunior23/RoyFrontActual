import ListCategoy from "@Components/Section/components/ListCategoy";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
function LayaotInventory() {
  const { idDisp ,idUsuario} = useParams();
  return (
    <main>
      {!idDisp && !idUsuario && (
        <div className="mb-4 md:mb-6 ">
          <ListCategoy />
        </div>
      )}
      <Outlet />
    </main>
  );
}

export default LayaotInventory;
