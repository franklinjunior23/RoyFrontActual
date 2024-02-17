import { Outlet, useParams } from "react-router-dom";
import ItemSection from "@Components/Section/ItemSection";
import { useQuery } from "@tanstack/react-query";

import Header from "./components/Header";
import { ToggleActive } from "@/store/Dashboard/ActiveNotifi";
import clsx from "clsx";
import { GetsInfoDash } from "@/services/ApiGets";
import ListNotify from "./components/ListNotify";
import ItemView from "../empresa/components/ItemView";

function Home() {
  const { nombreE } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryFn: GetsInfoDash,
    queryKey: ["DataInfoHome"],
  });
  return (
    <>
      {nombreE ? (
        <Outlet />
      ) : (
        <main className="md:h-full  md:pb-0 ">
          <section>
            <Header />

            <ItemSection />
          </section>
          <article className="grid mt-2 md:grid-cols-3 gap-6">
           
            <article className="grid grid-cols-2 gap-6 grid-rows-2 h-fit ">
              <ItemView
                Count={data?.Dispositivo?.LaptopCount}
                Title={"Tickets"}
                Color={"#1c58f4"}
              />
              <ItemView
                Count={data?.Dispositivo?.PcCount}
                Title={"Pc"}
                Color={"#f60842"}
              />
              <ItemView
                Count={data?.Dispositivo?.ServidoresCount}
                Title={"Laptops"}
                Color={"#17d07a"}
              />
              <ItemView
                Count={data?.Ticket?.TicketCount}
                Title={"Servidores"}
                Color={"#f5ac0f"}
              />
            </article>
            <article className=""></article>
            <ListNotify />
          </article>

          {/* <aside>
              Notificaciones
            </aside> */}
        </main>
      )}
    </>
  );
}
export default Home;
