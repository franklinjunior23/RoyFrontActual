import { Link, Outlet, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetsInfoDash } from "@/services/ApiGets";
import Header from "@/pages/Home/components/Header";
import ItemView from "@/pages/empresa/components/ItemView";
import ListNotify from "@/pages/Home/components/ListNotify";
import Listbusiness from "./components/List-Company";
import { IconBuilding } from "@tabler/icons-react";
import PropTypes from "prop-types";
import { Card } from "@/componentUI/ui/card";
import { Calendar } from "@/componentUI/ui/calendar";
import { useState } from "react";
import Earing from "./components/EaringComponent";

function Home() {
  const { nombreE } = useParams();
  const [date, setDate] = useState(() => new Date());

  const { data, isLoading } = useQuery({
    queryFn: GetsInfoDash,
    queryKey: ["DataInfoHome"],
  });

  if (nombreE) return <Outlet />;

  return (
    <>
      <Header />
      <main className="mt-4">
        <section className="grid md:grid-cols-[1fr_320px] gap-5 h-fit  overflow-hidden">
          <Listbusiness />
          <section className="grid h-full grid-rows-2 gap-1">
            <ItemAll text="Empresas total" count={data?.company?.count} />
            <ItemAll text="Sucursales total" count={data?.brands?.count} />
          </section>
        </section>
      </main>

      <article className="lg:grid-cols-[1fr_1fr_auto] gap-4 grid mt-6">
        <article></article>

        <main className="lg:grid  gap-4">
          <article className="flex flex-col md:flex-row justify-between gap-4">
            <div className="grid grid-cols-2 gap-4 w-full">
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
                Count={data?.Dispositivo?.LaptopCount}
                Title={"Tickets"}
                Color={"#1c58f4"}
              />
          
              <ItemView
                Count={data?.Ticket?.TicketCount}
                Title={"Servidores"}
                Color={"#f5ac0f"}
              />
            </div>
            <div className="w-fit">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className=" border rounded-xl h-full"
              />
            </div>
          </article>
         <Earing/>
        </main>
      </article>
    </>
  );
}
export default Home;

function ItemAll({ count, text }) {
  return (
    <Card className="flex items-center justify-between p-5 py-3  text-white bg-black rounded-xl">
      <span className="flex items-center gap-4 text-sm">
        {text} <IconBuilding size={28} />
      </span>
      <span className="font-bold">{count}</span>
    </Card>
  );
}

ItemAll.propTypes = {
  count: PropTypes.number,
  text: PropTypes.string,
};
