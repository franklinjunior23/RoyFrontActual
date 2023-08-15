import Listsection from "./components/Listsection";
import { A11y, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { GetEmpresas } from "../../services/ApiGets";
import { useEffect, useState } from "react";
import { ColorConteners } from "../../assets/DataDefault";
import ItSection from "../Navbar/components/ItSection";
import { useQuery } from "@tanstack/react-query";

function ItemSection() {
  const {
    isLoading,
    data: DataEmpresas,
    isError,
    error,
  } = useQuery({
    initialData: [],
    queryKey: ["Empresas"],
    queryFn: GetEmpresas,
  });

  

  return (
    <section className="py-4 mt-8">
      <header className=" flex  lg:hidden justify-between items-center mb-6">
        <div>
          <h3 className="text-Slet font-bold text-xl">Empresas</h3>
        </div>
        <ItSection />
      </header>

      <Swiper
        modules={[A11y, Autoplay, EffectFade]}
        spaceBetween={"100px"}
        autoplay={{ delay: 4000 }}
        grabCursor={true}
        breakpoints={{
          // Cuando el ancho de la pantalla sea menor o igual a 640px, mostrar 1 elemento
          260: {
            slidesPerView: 1,
          },
          350: {
            slidesPerView: 1.5,
          },
          474: {
            slidesPerView: 2,
          },
          // Cuando el ancho de la pantalla sea mayor que 640px pero menor o igual a 768px, mostrar 2 elementos
          768: {
            slidesPerView: 3,
          },
          // Cuando el ancho de la pantalla sea mayor que 768px pero menor o igual a 1024px, mostrar 3 elementos
          1024: {
            slidesPerView: 3,
          },
          // Por defecto, cuando el ancho de la pantalla sea mayor que 1024px, mostrar 4 elementos
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        <section className="">
          {DataEmpresas.map((value, index) => (
            <SwiperSlide key={index} className="m">
              <Listsection
                datos={value}
                color={ColorConteners[index % ColorConteners.length].name}
              />
            </SwiperSlide>
          ))}
          <SwiperSlide></SwiperSlide>
        </section>
      </Swiper>
    </section>
  );
}

export default ItemSection;
