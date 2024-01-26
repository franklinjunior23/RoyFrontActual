import { IconDots } from "@tabler/icons-react";
import clsx from "clsx";
import { useState } from "react";
import PropTypes from "prop-types";

function ButtomDots({
  ClassName,
  TitleOption,
  Options,
  OptionDownload,
  TitleActive,
}) {
  const [ActiveButton, setActiveButton] = useState(false);
  function HandleOpen() {
    setActiveButton(!ActiveButton);
  }
  function HandleOption(FuntionOption) {
    HandleOpen();
    if (FuntionOption) return FuntionOption();
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
          <IconDots className="dark:text-white "  size={22}/>
        </button>
        {ActiveButton && (
          <aside className="absolute modal right-0 top-12   text-sm   w-[160px]  dark:text-white grid gap-1">
            {TitleActive && (
              <h4 className="pl-3 font-semibold py-1.5 text-left">
                {TitleOption ?? "Opciones"}
              </h4>
            )}
            {OptionDownload && (
              <button
                onClick={() => HandleOption}
                className="text-left hover:bg-neutral-400/20 dark:hover:bg-white/20 pl-3 py-2 rounded-md"
              >
                <OptionDownload />
              </button>
            )}

            {Options.map((item, index) => (
              <button
                key={index}
                onClick={() => HandleOption(item.Function)}
                className="text-left hover:bg-neutral-400/20 dark:hover:bg-white/20 pl-3 py-2 rounded-md"
              >
                {item.label}
              </button>
            )) ?? "Colocar las Opciones"}
          </aside>
        )}
      </div>
      {ActiveButton && (
        <div
          className="fixed w-full h-full top-0 right-0 overflow-hidden z-10"
          onClick={HandleOpen}
        ></div>
      )}
    </>
  );
}
ButtomDots.propTypes = {
  ClassName: PropTypes.string,
  TitleOption: PropTypes.string,
  Options: PropTypes.array.isRequired,
  OptionDownload: PropTypes.any,
  TitleActive:PropTypes.bool
};

export default ButtomDots;
