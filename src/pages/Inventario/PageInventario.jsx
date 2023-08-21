import { Outlet, useParams } from "react-router-dom";
import SectionInventario from "../../components/Section/components/SectionInventario";
import HeadInventario from "../../components/User/components/HeadInventario";

function PageInventario() {
  const { CategoryInventario } = useParams();

  return (
    <>
      <HeadInventario />
      <main>{!CategoryInventario ? <SectionInventario /> : <Outlet />}</main>
    </>
  );
}
export default PageInventario;
