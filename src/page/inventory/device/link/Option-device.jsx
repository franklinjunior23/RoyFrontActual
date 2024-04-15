import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import LinkUser from "./Link-user";
import LinkArea from "./Link-area";
import LinkCreate from "./Link-create";
import clsx from "clsx";

function Optiondevice({ watch, control }) {
  const [idUser, setidUser] = useState(undefined);

  const [AreaData, setAreaData] = useState(undefined);
  const dataUser = watch("User");

  useEffect(() => {
    (() => {
      setidUser(watch("IdUser"));
      setAreaData(watch("Area"));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("IdUser"), watch("Area")]);

  return (
    <div className="">
      {!idUser && !AreaData && <LinkCreate control={control} />}
      <main
        className={clsx(
          "md:h-full", 
          "h-fit w-full",
          "rounded-lg",
          (AreaData || idUser) && "bg-slate-400/30 dark:bg-white"
        )}
      >
        {AreaData &&
          AreaData.map((area) => <LinkArea {...area} key={area.name} />)}
        {idUser && <LinkUser dataUser={dataUser} />}
      </main>
    </div>
  );
}

export default Optiondevice;

Optiondevice.propTypes = {
  control: PropTypes.any,
  watch: PropTypes.any,
};
