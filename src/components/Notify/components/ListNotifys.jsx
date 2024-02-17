import { useState } from "react";
import PropTypes from "prop-types";
import ItemNotify from "./ItemNotify";
import { ColorConteners } from "../../../assets/DataDefault";
function ListNotifys({ pages, data, LabelList }) {
  const ITEMS_PER_PAGE = pages ?? 2;
  const [itemsToShow, setItemsToShow] = useState(ITEMS_PER_PAGE);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setItemsToShow((prev) => prev + ITEMS_PER_PAGE);
    setShowMore(true);
  };
  const handleShowLess = () => {
    setItemsToShow(ITEMS_PER_PAGE);
    setShowMore(false);
  };

  if (data.length === 0) return "";
  return (
    <main className="">
      <h3 className="font-bold text-black/50 dark:text-white mb-4">{LabelList}</h3>

      {data?.slice(0, itemsToShow).map((item, index) => (
        <ItemNotify
          key={index}
          idNotify={item?.id}
          Description={item?.Message}
          UserCreate={item?.UserAction}
          Hora={item?.Hora}
          colorSeleccionado={ColorConteners[index % ColorConteners.length].name}
          isRead={item?.notifications_reads[0]?.Read}
        />
      ))}
      <section className="my-4">
        {data?.length > itemsToShow && (
          <button
            onClick={handleShowMore}
            className="text-blue-500 cursor-pointer dark:bg-white/20 px-3 py-1 dark:text-white font-medium text-sm rounded-lg "
          >
            Mostrar más
          </button>
        )}
        {showMore && (
          <button
            onClick={handleShowLess}
            className="text-blue-500 dark:bg-white/20 px-2 py-1 dark:text-white font-medium text-sm rounded-lg  cursor-pointer  ml-4"
          >
            Mostrar menos
          </button>
        )}
      </section>
    </main>
  );
}

export default ListNotifys;

// Compare this snippet from src/components/Notify/components/ItemNotify.jsx:

ListNotifys.propTypes = {
  pages: PropTypes.number,
  data: PropTypes.array,
  LabelList: PropTypes.string,
};
