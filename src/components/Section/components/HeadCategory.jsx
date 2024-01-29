import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ButtomDots from "@Components/Buttons/Buttom/ButtomDots";
import { useState } from "react";
import PageCreateArea from "@Pages/Inventario/Area/PageCreate";
function HeadCategory({ data }) {
  const navi = useNavigate();
  const Options = [
    {
      label: "Crear Usuario",
      Function: () => {
        const currentPath = window.location.pathname;
        if(!currentPath.includes('Usuarios')){
          const newPath = currentPath.replace("/Inventario", "/Usuarios/create");

          // Ahora, puedes navegar a la nueva ruta
        return  navi(`${newPath}`);
        }
        return navi("create")
      },
      more:[
        {
          label: "Reporte "
        }
      ]
    },
    {
      label: "Crear Dispositivo",
      Function: () => {
        navi("create");
      },
    },
    // {
    //   label: "Crear Area",
    //   Function: () => {
    //     navi("create");
    //   },
    // },
  ];
  const OptionsDownloads = () => {
    return <h2>Reporte PDF</h2>;
  };
  return (
    <header className="flex justify-between items-center gap-2 pt-5 relative dark:text-white">
      <h2 className="text-lg hidden md:block">{data}</h2>
      <header>
        <header className="flex gap-2 items-end  text-sm">
          <button
            className="bg-black py-1.5 font-light  text-white px-4 rounded-lg"
            onClick={() => navi("create")}
          >
            Crear {data}
          </button>
          <button
            className="bg-black py-1.5  text-white px-4 rounded-lg"
            onClick={() => navi("create")}
          >
            Crear Usuario
          </button>
          <ButtonOpenMod Modal={PageCreateArea}>Crear Area</ButtonOpenMod>

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
function ButtonOpenMod({ children, Modal }) {
  const [StatusSide, setStatusSide] = useState(false);
  function handleClick() {
    setStatusSide(!StatusSide);
  }
  return (
    <>
      <div  className="relative">
        <button
          className="bg-black py-1.5  text-white px-4 rounded-lg"
          onClick={handleClick}
        >
          {children}
        </button>
        {StatusSide && <Modal Handle={handleClick} TitleModal={"Creacion de Area"} />}
      </div>
      {StatusSide && (
        <div
          className="fixed w-full h-full top-0 right-0 overflow-hidden z-10 "
          onClick={handleClick}
        ></div>
      )}
    </>
  );
}
ButtonOpenMod.propTypes = {
  children: PropTypes.node,
  Modal: PropTypes.any,
};
