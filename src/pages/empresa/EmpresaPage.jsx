import { Outlet, useParams } from "react-router-dom";
import ItemSection from "../../components/Section/ItemSection";

function EmpresaPage() {
  // eslint-disable-next-line no-undef
  const { nombreE, sucursalN  } = useParams();

  return (
    <>
      <ItemSection />
      <Outlet />
    </>
  );
}
export default EmpresaPage;
