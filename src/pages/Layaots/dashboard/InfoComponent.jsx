import { IconCloudLock, IconDownload } from "@tabler/icons-react";
import {
  IconBrandGithubCopilot,
  IconInfoCircle,
  IconPalette,
  IconUserCircle,
} from "@tabler/icons-react";
import { useState } from "react";
import { UseContextLoged } from "@Contexts/AuhtLoged";

function InfoComponent() {
  const { LogedAuth } = UseContextLoged();

  const ItemConfig = [
    {
      Icon: IconUserCircle,
      Component: () => (
        <>
          <h3 className="text-center font-semibold text-xl">Tu Informacion</h3>
          <ul className="mt-4  text-center">
            <li>Nombre : {LogedAuth?.nombre}</li>
            <li>Apellido : {LogedAuth?.apellido}</li>
            <li>Rol : {LogedAuth?.rol}</li>
          </ul>
        </>
      ),
    },
    {
      Icon: IconPalette,
      Component: () => <h2>Componente2</h2>,
    },
    {
      Icon: IconCloudLock,
      Component: () => (
        <header className="grid grid-rows-2">
          <a href="https://github.com/franklinjunior23/AppAgentInti/archive/refs/tags/v1.0.1.zip">
            <IconDownload size={25} className="mx-auto" />
          </a>

          <span className="text-sm text-center mt-2 font-semibold">
            Descargar Agente
          </span>
        </header>
      ),
    },
    {
      Icon: IconInfoCircle,
      Component: () => <>
      
      <h3 className="text-xl font-semibold text-center">Información</h3>
      <ul className="mt-2">
        <li>Empresa : Intiscorp</li>
        <li>Version : 1.1.4</li>
        <li className="text-center text-xs mt-3 font-bold">Copyright ©DevF</li>
      </ul>
      </>,
    },
  ];
  return (
    <article className="invisible md:visible bottom-8 left-8 fixed w-12 h-12 bg-black/10 rounded-full dark:bg-white/60 cursor-pointer group">
      <div className="relative w-full h-full p-2.5">
        <IconBrandGithubCopilot className="w-full h-full text-black group-hover:animate-bounce" />
        <section className="absolute left-0 bottom-20 dark:bg-white/60 bg-black/10 rounded-md px-2 py-4 opacity-0 translate-y-8 transform transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
          <nav>
            <ul role="list" className="flex flex-col gap-3.5">
              {ItemConfig.map((item, index) => (
                <ItemHeadInfo
                  key={index}
                  IconItem={item.Icon}
                  Component={item.Component}
                />
              ))}
            </ul>
          </nav>
        </section>
      </div>
    </article>
  );
}

export default InfoComponent;

const ItemHeadInfo = ({ IconItem, Component }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSectionHovered, setIsSectionHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!isSectionHovered) {
        setIsHovered(false);
      }
    }, 200); // Puedes ajustar el tiempo según tus necesidades
  };

  const handleSectionMouseEnter = () => {
    setIsSectionHovered(true);
  };

  const handleSectionMouseLeave = () => {
    setIsSectionHovered(false);
    setIsHovered(false);
  };

  return (
    <li
      className={`relative `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <IconItem size={25} />
      {isHovered && (
        <section
          className={`absolute left-10 p-4
 -top-2 rounded-md w-[300px] group shadow-md  bg-white`}
          onMouseEnter={handleSectionMouseEnter}
          onMouseLeave={handleSectionMouseLeave}
        >
          <Component />
        </section>
      )}
    </li>
  );
};
