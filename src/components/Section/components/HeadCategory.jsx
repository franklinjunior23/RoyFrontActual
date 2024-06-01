import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ButtomDots from "@Components/Buttons/Buttom/ButtomDots";
import { useState } from "react";
import PageCreateArea from "@Pages/Inventario/Area/PageCreate";
import { Input } from "@/componentUI/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/componentUI/ui/popover";
import { Button } from "@/componentUI/ui/button";

function HeadCategory({ title, PdfList }) {
  const navi = useNavigate();
  const Options = [
    {
      label: "Crear Usuario",
      Function: () => {
        const currentPath = window.location.pathname;
        if (!currentPath.includes("Usuarios")) {
          const newPath = currentPath.replace(
            "/Inventario",
            "/Usuarios/create"
          );

          // Ahora, puedes navegar a la nueva ruta
          return navi(`${newPath}`);
        }
        return navi("create");
      },
      more: [
        {
          label: "Reporte ",
        },
      ],
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
    return <PdfList />;
  };
  return (
    <header className="flex gap-2 items-end  text-sm">
      <Button
        className="bg-black py-1.5  text-sn font-medium  text-white px-4 rounded-lg"
        onClick={() => navi("create")}
      >
        Crear {title}
      </Button>
      <Popover>
        <PopoverTrigger>
          <Button>Crear Area</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PageCreateArea />
        </PopoverContent>
      </Popover>

      <ButtonOpenMod Modal={PageCreateArea}>Crear Area</ButtonOpenMod>

      <ButtomDots
        Title={"Acciones"}
        Options={Options}
        OptionDownload={OptionsDownloads}
      />
    </header>
  );
}
export default HeadCategory;
HeadCategory.propTypes = {
  title: PropTypes.string.isRequired,
  PdfList: PropTypes.any,
};
function ButtonOpenMod({ children, Modal }) {
  const [StatusSide, setStatusSide] = useState(false);
  function handleClick() {
    setStatusSide(!StatusSide);
  }
  return (
    <>
      <div className="relative font-medium">
        <button
          className="bg-black py-1.5  text-white px-4 rounded-lg"
          onClick={handleClick}
        >
          {children}
        </button>
        {StatusSide && (
          <Modal Handle={handleClick} TitleModal={"Creacion de Area"} />
        )}
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
