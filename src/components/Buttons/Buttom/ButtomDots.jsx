import { IconDots } from "@tabler/icons-react";
import clsx from "clsx";
import { useState } from "react";
import PropTypes from "prop-types";
function ButtomDots({ ClassName, Title, Options, OptionDownload, Icon }) {
  const [ActiveButton, setActiveButton] = useState(false);
  function HandleOpen() {
    setActiveButton(!ActiveButton);
  }

  function HandleOption(FuntionOption, IsLoading) {
    HandleOpen();
    if (FuntionOption) {
      FuntionOption();
      // Ejecutar la función solo si no está en proceso de carga (IsLoading !== true)
      if (!IsLoading) {
        FuntionOption();
      }
    }
  }
  function HandleDownload(Func){
    Func();
    HandleOpen();
    
  }
  return (
    <>
      <div className="relative">
        <button
          onClick={HandleOpen}
          className={clsx(
            "p-1.5 px-2  rounded-md  hover:bg-black/10 transition-all duration-200 ",
            ClassName
          )}
        >
          {Icon ? (
            Icon
          ) : (
            <IconDots className="text-black dark:text-white " size={22} />
          )}
        </button>
        {ActiveButton && (
          <aside className="absolute AsideDots right-0 top-12 z-50  text-sm   w-[160px]  dark:text-white grid gap-1">
            {Title && (
              <h4 className="pl-3 text-black dark:text-white font-semibold py-1.5 text-left">
                {Title ?? "Opciones"}
              </h4>
            )}
            {OptionDownload && (
              <button
                onClick={() => OptionDownload}
                className="py-2 pl-3 text-left rounded-md hover:bg-neutral-400/20 dark:hover:bg-white/20"
              >
                <OptionDownload />
              </button>
            )}

            {Options.map((item, index) => (
              <button
                key={index}
                onClick={() => HandleOption(item.Function, item?.IsLoading)}
                className="py-2 pl-3 text-left text-black rounded-md dark:text-white hover:bg-neutral-400/20 dark:hover:bg-white/20"
              >
                {item?.IsLoading ? "Cargando ..." : item.label}
              </button>
            )) ?? "Colocar las Opciones"}
          </aside>
        )}
      </div>
      {ActiveButton && (
        <div
          className="fixed top-0 right-0 z-30 w-screen h-screen overflow-hidden"
          onClick={HandleOpen}
        ></div>
      )}
    </>
  );
}

ButtomDots.propTypes = {
  ClassName: PropTypes.string,
  Title: PropTypes.string,
  Options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      Function: PropTypes.func,
      IsLoading: PropTypes.bool,
    })
  ),
  OptionDownload: PropTypes.any,
  TitleActive: PropTypes.bool,
  Icon: PropTypes.any,
};

export default ButtomDots;
