import { GetEmpresas } from "@/services/ApiGets";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectFade } from "swiper/modules";
import CompanyItem from "./card-company";
import AddCompany from "./AddCompany";
import { Skeleton } from "@/componentUI/ui/skeleton";

function Listbusiness() {
  // llamada a la api
  const { data, isLoading, isError ,isFetching } = useQuery({
    initialData: [],
    queryKey: ["Empresas"],
    queryFn: GetEmpresas,
  });

  return (
    <>
      <section className="min-w-full h-fit max-w-full flex flex-col md:flex-row gap-4">
        <AddCompany />
        {(isLoading | isFetching )? (
          <main className="flex gap-4 ">
            <Skeleton className="w-[360px] h-[140px] p-5 flex flex-col justify-between">
              <Skeleton className="w-[70%] h-5"/><Skeleton className="w-[25%] h-4"/>
            </Skeleton>
            <Skeleton className="w-[360px] h-[140px] p-5 flex flex-col justify-between">
              <Skeleton className="w-[70%] h-5"/><Skeleton className="w-[25%] h-4"/>
            </Skeleton>
            <Skeleton className="w-[360px] h-[140px] p-5 flex flex-col justify-between">
              <Skeleton className="w-[70%] h-5"/><Skeleton className="w-[25%] h-4"/>
            </Skeleton>
           
          </main>
        ) : (
          <Swiper
            className="w-full flex gap-5"
            modules={[A11y, EffectFade]}
            spaceBetween={1}
            breakpoints={{
              320: {
                slidesPerView: 0.7,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 1,
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
        )}
      </section>
    </>
  );
}

export default Listbusiness;
