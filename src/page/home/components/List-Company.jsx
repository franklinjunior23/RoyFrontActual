import { GetEmpresas } from "@/services/ApiGets";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectFade } from "swiper/modules";
import CompanyItem from "./card-company";
import AddCompany from "./AddCompany";

function Listbusiness() {
  // llamada a la api
  const { data, isLoading, isError } = useQuery({
    initialData: [],
    queryKey: ["Empresas"],
    queryFn: GetEmpresas,
  });
  if (isLoading) return <h2>Cargando...</h2>;
  if (isError) return <h2>Ha sucedido un error</h2>;
  return (
    <>
      <section className="min-w-full h-fit max-w-full flex gap-4">
        <AddCompany />
        <Swiper
          className="w-full flex gap-5"
          modules={[A11y, EffectFade]}
          spaceBetween={1}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 1.2,
              spaceBetween: 40,
            },
            640: {
              slidesPerView: 1.7,
              spaceBetween: 40,
            },
            700: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1000: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            1400: {
              slidesPerView: 2.1,
              spaceBetween: 60,
            },
            1500: {
              slidesPerView: 2.1,
              spaceBetween: 60,
            },
            1700: {
              slidesPerView: 2.7,
              spaceBetween: 80,
            },
          }}
        >
          {data?.data?.map((company, index) => (
            <SwiperSlide key={index}>
              <CompanyItem {...company} key={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}

export default Listbusiness;
