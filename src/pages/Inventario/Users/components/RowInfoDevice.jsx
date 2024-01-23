import { IconDevices2 } from "@tabler/icons-react";
import PropTypes from "prop-types";

export default function RowInfoDevice({ data }) {
  const { nombre, tipo, codigo_dispositivo } = data;
  return (
    <article className="bg-gray-400 text-white dark:bg-gray-400/30 px-8 py-4 rounded-md mt-5 grid grid-cols-[1fr_100px]">
      <section>
        <h4 className="font-extrabold  text-lg">{nombre}</h4>
        <span className="block text-sm font-semibold">
          Codigo : {codigo_dispositivo}
        </span>

        <p className="text-lg">{tipo}</p>
      </section>
      <IconDevices2 size={60} className="text-white  place-self-center" />
    </article>
  );
}
RowInfoDevice.propTypes = {
  data: PropTypes.object.isRequired,
};
