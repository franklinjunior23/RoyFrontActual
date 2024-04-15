import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CompanyImg from "/Figures/company-item.webp";
import { Link } from "react-router-dom";
import { FormateDayD } from "@/helpers/utils/conver-day-ddmmyy";
import TruncateText from "@/helpers/utils/truncate-text";

function CompanyItem({ nombre, createdAt }) {
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [showOptions, setShowOptions] = useState(false);

  function handleContextMenu(e) {
    e.preventDefault();
    
    setMenuPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    setShowOptions(true);
  }

  function handleDocumentClick() {
    setShowOptions(false);
  }

  // Agrega un efecto para escuchar los clics en el documento
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <section
      className="bg-orange-200/90 w-[360px] h-[140px] relative p-3 rounded-lg overflow-hidden shadow-md"
      onContextMenu={handleContextMenu}
    >
      <Link to={nombre}>
        <div className="flex flex-col justify-between h-full px-2 py-1 dark:text-white/80">
          <h3 className="text-[27px] font-extrabold">
            {TruncateText({ text: nombre, maxLength: 20 })}{" "}
          </h3>
          <span className="z-50 block text-sm font-bold">
            {FormateDayD(createdAt) ?? "00/00/00"}
          </span>
        </div>

        <img
          src={CompanyImg}
          alt="Company Head"
          aria-hidden={true}
          className="absolute top-0 left-0 object-cover w-full h-full fill-transparent"
        />
      </Link>
      {/* Renderizado condicional del menú de opciones */}
      {showOptions && (
        <div
          className="absolute z-50 bg-white w-[200px] rounded-lg shadow-lg grid gap-2 company-item-options p-1 "
          style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
        >
          <button className="py-1 rounded-md hover:bg-black/10 ">Editar</button>

          <button className="py-1 rounded-md hover:bg-black/10 ">Eliminar</button>
        </div>
      )}
    </section>
  );
}

CompanyItem.propTypes = {
  nombre: PropTypes.string,
  createdAt: PropTypes.string,
};

export default CompanyItem;
