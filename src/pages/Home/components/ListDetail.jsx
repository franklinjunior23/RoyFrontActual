import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from "prop-types";

function ListDetail({ DetailData }) {
  return (
    <main className="max-w-full">
      <section>
        <h4 className="text-Slet text-2xl font-bold capitalize">Estadistica</h4>
      </section>
      <section className="w-[325px] m-auto  md:m-0 lg:w-full cursor-pointer">
        <Swiper
          spaceBetween={25}
          breakpoints={{
            // Cuando el ancho de la pantalla sea menor o igual a 640px, mostrar 1 elemento
            260: {
              slidesPerView: 1,
            },
            350: {
              slidesPerView: 1,
            },
            474: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          <SwiperSlide>
            <ItemList name={"PC"} Value={DetailData?.PcCount} />
          </SwiperSlide>
          <SwiperSlide>
            <ItemList name={"Laptop"} Value={DetailData?.LaptopCount} />
          </SwiperSlide>
          <SwiperSlide>
            <ItemList name={"Servidores"} Value={DetailData?.ServidoresCount} />
          </SwiperSlide>
        </Swiper>
      </section>
    </main>
  );
}
function ItemList({ name, Value }) {
  return (
    <section className="dark:bg-DarkComponent my-4 shadow-lg md:w-[130px] grid justify-center text-ellipsis  rounded-xl p-5 text-center">
      <header className="grid gap-6">
        <h4 className=" text-Slet font-extrabold text-xl">{name}</h4>
        <span className="dark:text-white font-extrabold tracking-wide	 text-3xl ">{Value}</span>
      </header>
    </section>
  );
}
export default ListDetail;


ItemList.propTypes = {
  name: PropTypes.string,
  Value: PropTypes.number,
};



ListDetail.propTypes = {
  DetailData: PropTypes.object,
};
