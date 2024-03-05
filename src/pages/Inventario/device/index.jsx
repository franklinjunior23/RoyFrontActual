import HeadCategory from "@Components/Section/components/HeadCategory";
import {  Outlet, useParams } from "react-router-dom";
import GeneralSect from "../Sections/GeneralSect";

export default function DevicePage() {
    const { idDisp } = useParams();
    if (idDisp) return <Outlet />;
  return (
    <main className=" pb-5 md:grid md:grid-cols-[1fr_300px]">
      <section>
        <HeadCategory data={"Device"} className="dark:text-white" />

        <GeneralSect />
      </section>
      <section></section>
    </main>
  );
}
