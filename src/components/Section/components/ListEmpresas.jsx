import { useQuery } from "@tanstack/react-query";
import { A11y, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Listsection from "./Listsection";
import { useEffect, useState } from "react";
import { DataListDashboard } from "@/store/Dashboard/DataDash";
import { ColorConteners } from "@/assets/DataDefault";
import { GetEmpresas } from "@/services/ApiGets";


function ListEmpresas({LinkDate}) {
  const [spaceBetween, setSpaceBetween] = useState(140);
  const {AddDataList} = DataListDashboard();
  const {
    isLoading,
    data: DataEmpresas,
    isError,
  } = useQuery({
    initialData: [],
    queryKey: ["Empresas"],
    queryFn: GetEmpresas,
  });
  useEffect(() => {
    const handleResize = () => {
      // Obtener el ancho de la pantalla actual
      const windowWidth = window.innerWidth;
      // Definir valores de spaceBetween según el ancho de la pantalla
      if (windowWidth <= 260) {
        setSpaceBetween(0); // Cambia a lo que quieras para dispositivos con ancho menor o igual a 260px
      } else if (windowWidth <= 350) {
        setSpaceBetween(30); // Cambia a lo que quieras para dispositivos con ancho entre 260px y 350px
      } else if (windowWidth <= 474) {
        setSpaceBetween(10); // Cambia a lo que quieras para dispositivos con ancho entre 350px y 474px
      } else if (windowWidth <= 1600) {
        setSpaceBetween(280); // Valor por defecto para pantallas más grandes
      }else{
        setSpaceBetween(160);
      }
    };
    if(DataEmpresas){
      AddDataList(DataEmpresas)
    }
    // Agregar el oyente de evento de redimensionamiento para actualizar spaceBetween
    window.addEventListener('resize', handleResize);

    // Llamada inicial para configurar spaceBetween
    handleResize();

    // Limpiar el oyente de evento al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  if (isLoading) return <h2 className="text-center">Cargando ...</h2>;
  if (isError) return <h2 className="text-center">Ha sucedido un error</h2>;

  if (DataEmpresas.data?.length === 0)
    return <h2 className="mt-10 text-center">No Existe Ninguna Empresa</h2>;




  
  return (
    <div>
      <Swiper
        modules={[A11y, EffectFade]}
        spaceBetween={`${spaceBetween}px`}
       
        
        grabCursor={true}
        breakpoints={{
          // Cuando el ancho de la pantalla sea menor o igual a 640px, mostrar 1 elemento
          260: {
            slidesPerView: 1.3,
          },
          350: {
            slidesPerView: 1.1
,
          },
          474: {
            slidesPerView: 3,
          },
          // Cuando el ancho de la pantalla sea mayor que 640px pero menor o igual a 768px, mostrar 2 elementos
          768: {
            slidesPerView: 2.3,
          },
          // Cuando el ancho de la pantalla sea mayor que 768px pero menor o igual a 1024px, mostrar 3 elementos
          1024: {
            slidesPerView: 2.9,
          },
          // Por defecto, cuando el ancho de la pantalla sea mayor que 1024px, mostrar 4 elementos
          1200: {
            slidesPerView: 5,
          },
        }}
      >
        <section className="">
          {DataEmpresas.data?.map((value, index) => (
            <SwiperSlide key={index}>
              <Listsection
                datos={value}
                LinkDate={LinkDate}
                color={ColorConteners[index % ColorConteners.length].name}
              />
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div className="w-[300px">
              
            </div>
          </SwiperSlide>
        </section>
      </Swiper>
    </div>
  );
}
export default ListEmpresas;
