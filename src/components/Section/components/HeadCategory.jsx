import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ButtomDots from "@Components/Buttons/Buttom/ButtomDots";
function HeadCategory({ data }) {
  const navi = useNavigate();
  const Options = [
    {
      label: "Crear Usuario",
      Function: () => {
        const currentPath = window.location.pathname;
        const newPath = currentPath.replace("/Inventario", "/Usuarios/create");

        // Ahora, puedes navegar a la nueva ruta
        navi(newPath);
      },
    },
    {
      label: "Crear Dispositivo",
      Function: () => {
        navi("create");
      },
    },
    {
      label: "Crear Area",
      Function: () => {
        navi("create");
      },
    },
  ];
  const OptionsDownloads = () => {
    return <h2>Reporte PDF</h2>;
  };
  return (
    <header className="flex justify-between items-center gap-2 pt-5 relative dark:text-white">
      <h2 className="text-lg hidden md:block">{data}</h2>
      <header>
        <header className="flex gap-2">
          <button
            className="bg-black py-2 text-center text-white px-4 rounded-lg"
            onClick={() => navi("create")}
          >
            Crear {data}
          </button>
          <button
            className="bg-black py-2 text-center text-white px-4 rounded-lg"
            onClick={() => navi("create")}
          >
            Crear Area
          </button>
          <ButtomDots
            TitleOption={"Acciones"}
            Options={Options}
            OptionDownload={OptionsDownloads}
          />
        </header>
      </header>
    </header>
  );
}
export default HeadCategory;
HeadCategory.propTypes = {
  data: PropTypes.string.isRequired,
};
