import { IconDots } from "@tabler/icons-react";
import clsx from "clsx";
import { useState } from "react";
import PropTypes from "prop-types";

function ButtomDots({ ClassName, TitleOption, Options, OptionDownload }) {
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
            "p-1.5  rounded-md hover:bg-black/20 transition-all duration-200 ",
            ClassName
          )}
        >
          <IconDots className="dark:text-white " />
        </button>
        {ActiveButton && (
          <aside className="absolute right-0 top-12 rounded-md dark:bg-[#262626] bg-white text-sm  z-50 p-2 w-[160px] shadow-md dark:text-white grid gap-1">
            <h4 className="pl-3 font-semibold py-1">
              {TitleOption ?? "Opciones"}
            </h4>
            {OptionDownload && (
              <button
                onClick={() => HandleOption}
                className="text-left hover:bg-neutral-400/20 dark:hover:bg-white/20 pl-3 py-1.5 rounded-md"
              >
                <OptionDownload/>
              </button>
            )}

            {Options.map((item, index) => (
              <button
                key={index}
                onClick={() => HandleOption(item.Function)}
                className="text-left hover:bg-neutral-400/20 dark:hover:bg-white/20 pl-3 py-1.5 rounded-md"
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
  OptionDownload: PropTypes.node,
};

export default ButtomDots;
