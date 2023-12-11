import { Outlet, useParams } from "react-router-dom";
import ItSection from "../../components/Navbar/components/ItSection";
import ItemSection from "../../components/Section/ItemSection";
import { UseContextLoged } from "../../context/AuhtLoged";
import ListTickets from "./components/ListTickets";
import ListDetail from "./components/ListDetail";
import { useQuery } from "@tanstack/react-query";
import { GetsInfoDash } from "../../services/ApiGets";
import ListUserActive from "./components/ListUserActive";

function formatDate(date) {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("es-PE", options);
}

function Home() {
  const { nombreE } = useParams();
  const { LogedAuth } = UseContextLoged();
  const today = new Date();
  const Format = formatDate(today);
  const { data, isLoading, isError } = useQuery({
    queryFn: GetsInfoDash,
    queryKey: ["DataInfoHome"],
  });

  return (
    <>
      {nombreE ? (
        <Outlet />
      ) : (
        <main className="pb-10 md:pb-0">
          <header className="flex justify-between">
            <section>
              <h4 className="text-Slet text-2xl font-bold capitalize">
                Bienvenido {LogedAuth.nombre}
              </h4>
              <p className="text-Chiqui capitalize dark:text-white pb-2 mt-1  ">
                {Format}
              </p>
            </section>
            <div className="self-end">
              <ItSection dato={true} />
            </div>
          </header>
          <ItemSection />
          <article className="grid mt-2 md:grid-cols-2 gap-6 ">
            {isLoading && (
              <>
                <h2 className="dark:text-white">Cargando .....</h2>
                <h2 className="dark:text-white">Cargando .....</h2>
              </>
            )}
            {isError && (
              <h2 className="dark:text-white">Error al cargar los datos</h2>
            )}
            <ListTickets TicketsData={data?.Ticket} />
            <ListDetail DetailData={data?.Dispositivo} />
            {/* <ListUserActive /> */}
          </article>
        </main>
      )}
    </>
  );
}
export default Home;
