import { useState } from "react";
import { Link } from "react-router-dom";
import ModalSection from "./ModalSection";
import { IconEmpresa } from "../../../assets/DataDefault";
import PropTypes from "prop-types";
// eslint-disable-next-line react/prop-types
function Listsection({ datos, color }) {
  const { nombre } = datos;
  const IconEdit = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="32"
        viewBox="0 0 9 32"
        fill="none"
      >
        <path
          d="M9.00113 27.4125C9.00113 29.9001 6.98815 31.9131 4.50057 31.9131C2.01298 31.9131 0 29.9001 0 27.4125C0 24.9249 2.01298 22.912 4.50057 22.912C6.98815 22.912 9.00113 24.9249 9.00113 27.4125ZM2.45485 27.4125C2.45485 28.5418 3.37133 29.4582 4.50057 29.4582C5.6298 29.4582 6.54628 28.5418 6.54628 27.4125C6.54628 26.2833 5.6298 25.3668 4.50057 25.3668C3.37133 25.3668 2.45485 26.2833 2.45485 27.4125Z"
          fill="white"
        />
        <path
          d="M9.00113 4.50065C9.00113 6.98824 6.98815 9.00122 4.50057 9.00122C2.01298 9.00122 0 6.98824 0 4.50065C0 2.01307 2.01298 8.7738e-05 4.50057 8.7738e-05C6.98815 8.7738e-05 9.00113 2.01307 9.00113 4.50065ZM2.45485 4.50065C2.45485 5.62989 3.37133 6.54637 4.50057 6.54637C5.6298 6.54637 6.54628 5.62989 6.54628 4.50065C6.54628 3.37142 5.6298 2.45494 4.50057 2.45494C3.37133 2.45494 2.45485 3.37142 2.45485 4.50065Z"
          fill="white"
        />
        <path
          d="M9.00113 15.9565C9.00113 18.4441 6.98815 20.457 4.50057 20.457C2.01298 20.457 0 18.4441 0 15.9565C0 13.4689 2.01298 11.4559 4.50057 11.4559C6.98815 11.4559 9.00113 13.4689 9.00113 15.9565ZM2.45485 15.9565C2.45485 17.0857 3.37133 18.0022 4.50057 18.0022C5.6298 18.0022 6.54628 17.0857 6.54628 15.9565C6.54628 14.8272 5.6298 13.9108 4.50057 13.9108C3.37133 13.9108 2.45485 14.8272 2.45485 15.9565Z"
          fill="white"
        />
      </svg>
    );
  };
  
  const [IsActiveMod, setIsActiveMod] = useState(false);
  const HandleActiveMod = () => {
    setIsActiveMod(!IsActiveMod);
  };
  return (
    <aside
      className={`px-7 py-9 h-[250px] w-[250px] rounded-3xl relative `} 
      style={{ background:color }}
    >
      <Link to={nombre}>
        <span>
          <IconEmpresa />
        </span>
        <h4
         className="mt-4 text-white font-extrabold text-xl"
          >{nombre}</h4>
      </Link>
      <div className="absolute right-4 top-8 z-20 px-4" onClick={HandleActiveMod}>
        <IconEdit />
      </div>
      {
        IsActiveMod && ( <ModalSection datos={datos}  />)
      }
    </aside>
  );
}

export default Listsection;

 Listsection.propTypes = {
    datos: PropTypes.shape({
      nombre: PropTypes.string.isRequired,
      // add any other required props here
    }).isRequired,
    color: PropTypes.string.isRequired,
  };
