import { useParams } from "react-router-dom";
import CreateDisp from "../Forms/CreateDisp";

function CategoryInvent() {
  const { CategoryInventario } = useParams();

  switch (CategoryInventario) {
    case "General":
      return <h1>Gemerañ</h1>;
    case "Pc":
      return <h2>pces</h2>;
    case "Laptop":
      return <h2>Laptop</h2>;
    case "Servidores":
      return <h2>servidores</h2>;
    case "Red":
      return <h2>Redes dispositivos</h2>;
    case "Impresora":
      return <h2>Impresoras</h2>;
    case "Create":
      return <CreateDisp />;
  }
}
export default CategoryInvent;
