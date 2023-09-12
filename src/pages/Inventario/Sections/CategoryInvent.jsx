import { useParams } from "react-router-dom";
import CreateDisp from "../Forms/CreateDisp";
import GeneralSect from "./GeneralSect";
import PCSect from "./PCSect";
import RedSect from "./RedSect";
import LaptopSect from "./LaptopSect";
import ServidorSect from "./ServidorSect";
import ImpresoraSect from "./ImpresoraSect";

function CategoryInvent() {
  const { CategoryInventario } = useParams();

  switch (CategoryInventario) {
    case "General":
      return <GeneralSect/>;
    case "Pc":
      return <PCSect/>;
    case "Laptop":
      return <LaptopSect/>;
    case "Servidores":
      return <ServidorSect/>;
    case "Red":
      return <RedSect/>;
    case "Impresora":
      return <ImpresoraSect/>;
    case "create":
      return <CreateDisp />;
  }
}
export default CategoryInvent;
