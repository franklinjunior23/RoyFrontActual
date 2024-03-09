import { Outlet } from "react-router-dom";
import ListCategoy from "@Components/Section/components/ListCategoy";
import AsideBar from "./components/AsideBar";
import { useParams } from "react-router-dom";

function CategoryS() {
  const { idDisp } = useParams();
  return (
    <section>
      {!idDisp && (
        <div className="mb-4 md:mb-6 ">
          <ListCategoy />
        </div>
      )}
      <main className="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-[1fr_340px] gap-6">
        <div>
          <Outlet />
        </div>
        <AsideBar />
      </main>
    </section>
  );
}
export default CategoryS;
