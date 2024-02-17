import { useState } from "react";

import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/services/ConfigApi";
import TruncateText from "@/utils/TruncateTeaxt";

function ItemNotify({
  Description,
  UserCreate,
  Hora,
  isRead,
  idNotify,
  colorSeleccionado,
}) {
  const [isReadNotify, setIsReadNotify] = useState(isRead);
  const [ViewMoreText, setViewMoreText] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.put(`/Notifications/${idNotify}`, {
        Read: true,
      });
      return res.data;
    },
    onSuccess: () => {
      setIsReadNotify(true);
      queryClient.invalidateQueries("notifications");
    },
  });

  function HandleViewMoreText() {
    setViewMoreText(!ViewMoreText);
    if (isRead === false) {
      return mutate();
    }
  }

  function ButtonViewDescription() {
    return (
      <>
        <button
          className="mt-1 invisible group-hover/notify:visible ml-0 text-gray-700 bg-slate-300 dark:bg-blue-400 dark:text-white font-semibold px-2 rounded-md flex justify-center items-center"
          onClick={HandleViewMoreText}
        >
          {ViewMoreText ? (
            <>
              Leer menos <IconChevronUp size={18} />
            </>
          ) : (
            <>
              Leer mas <IconChevronDown size={18} />
            </>
          )}
        </button>

        {/* <button className="mt-1 invisible group-hover/notify:visible ml-0 text-gray-700 bg-slate-300 px-2 rounded-md flex justify-center items-center">
          Marcar leido
        </button> */}
      </>
    );
  }

  return (
    <article
      className={`grid grid-cols-[80px_5.5px_1fr] dark:bg-DarkComponent border border-white/20 dark:text-white ${
        isReadNotify ? "bg-white" : "bg-slate-100"
      }  text-black gap-3 hover:bg-slate-100 group/notify  rounded-md p-2 mb-2`}
      style={{ height: ViewMoreText ? "auto" : "110px" }}
    >
      <span className="self-center break-words text-2xl text-center tracking-wide	 ">
        {Hora?.substring(0, 5)}
      </span>
      <span
        className="h-full  w-full rounded-md"
        style={{ backgroundColor: colorSeleccionado }}
      ></span>
      <header>
        <span className="text-xs font-semibold bg-black/70 py-0.5  text-white px-2.5 rounded-md ">
          {UserCreate}
        </span>
        <p className="text-sm mt-1">
          {ViewMoreText === false ? (
            <TruncateText
              text={Description ?? "Reportar Error NTFD-23 "}
              maxLength={46}
              ComponentNext={() => <ButtonViewDescription />}
            />
          ) : (
            <>
              {Description} <ButtonViewDescription />
            </>
          )}
        </p>
      </header>
    </article>
  );
}

export default ItemNotify;

ItemNotify.propTypes = {
  Description: PropTypes.string,
  UserCreate: PropTypes.string,
  Hora: PropTypes.string,
  isRead: PropTypes.bool,
  idNotify: PropTypes.string,
  colorSeleccionado: PropTypes.string,
};

// Compare this snippet from src/pages/Home/components/TicketItem.jsx:
