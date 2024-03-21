import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetsInfoDash } from "@/services/ApiGets";
import Header from "@/pages/Home/components/Header";
import ItemView from "@/pages/empresa/components/ItemView";
import ListNotify from "@/pages/Home/components/ListNotify";
import Listbusiness from "./components/List-Company";
import { IconBuilding } from "@tabler/icons-react";
import PropTypes from "prop-types";
import AddCompany from "./components/AddCompany";

function Home() {
  const { nombreE } = useParams();

  const { data } = useQuery({
    queryFn: GetsInfoDash,
    queryKey: ["DataInfoHome"],
  });

  if (nombreE) return <Outlet />;

  return (
    <>
      <Header />
      <main className="grid grid-rows-2">
        {/** <ItemSection /> */}
        <section className="grid md:grid-cols-[100px_1fr_320px] gap-5 h-fit mt-8">
          <AddCompany/>
          <Listbusiness />
          <section className="grid grid-rows-2 gap-1 h-full">
            <ItemAll text="Empresas total" count={20} />
            <ItemAll text="Sucursales total" count={20} />
          </section>
        </section>
      </main>

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
    </>
  );
}
export default Home;

function ItemAll({ count, text }) {
  return (
    <aside className="flex justify-between items-center p-5 py-3 bg-black rounded-xl text-white">
      <span className="flex items-center gap-4 text-sm">
        {text} <IconBuilding  size={28} />
      </span>
      <span className="font-bold">{count}</span>
    </aside>
  );
}

ItemAll.propTypes = {
  count: PropTypes.number,
  text: PropTypes.string,
};
