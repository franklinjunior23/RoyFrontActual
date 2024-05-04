import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetsInfoDash } from "@/services/ApiGets";
import Header from "@/pages/Home/components/Header";
import ItemView from "@/pages/empresa/components/ItemView";
import ListNotify from "@/pages/Home/components/ListNotify";
import Listbusiness from "./components/List-Company";
import { IconBuilding } from "@tabler/icons-react";
import PropTypes from "prop-types";

function Home() {
  const { nombreE } = useParams();

  const { data, isLoading } = useQuery({
    queryFn: GetsInfoDash,
    queryKey: ["DataInfoHome"],
  });

  if (isLoading) return <h2>Cargando...</h2>;

  if (nombreE) return <Outlet />;

  return (
    <>
      <Header />
      <main className="grid grid-rows-2">
        <section className="grid md:grid-cols-[1fr_320px] gap-5 h-fit mt-8">
          <Listbusiness />
          <section className="grid h-full grid-rows-2 gap-1">
            <ItemAll text="Empresas total" count={data?.company?.count} />
            <ItemAll text="Sucursales total" count={data?.brands?.count} />
          </section>
        </section>
      </main>

      <article className="grid gap-6 mt-2 md:grid-cols-3">
        <article className="grid grid-cols-2 grid-rows-2 gap-6 h-fit ">
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
    </>
  );
}
export default Home;

function ItemAll({ count, text }) {
  return (
    <aside className="flex items-center justify-between p-5 py-3 text-white bg-black rounded-xl">
      <span className="flex items-center gap-4 text-sm">
        {text} <IconBuilding size={28} />
      </span>
      <span className="font-bold">{count}</span>
    </aside>
  );
}

ItemAll.propTypes = {
  count: PropTypes.number,
  text: PropTypes.string,
};
