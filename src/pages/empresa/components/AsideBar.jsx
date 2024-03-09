import Count from "@Components/Charts/Counts.jsx/Count";
import PropTypes from "prop-types";

function AsideBar() {
  return (
    <aside className="dark:bg-DarkComponent bg-white rounded-xl p-4 hidden border dark:border-none lg:block ">
      <main>
        <section>
          <Count />
        </section>
        <section className="grid grid-cols-2 mt-5 gap-5">
          <ItemCount Data={20} Title={"Usuarios"} />
          <ItemCount Data={3} Title={"Areas"} />
        </section>
      </main>
      <section className="mt-5 grid gap-5 ">
        <ItemAdd label="Agregar Usuario" />
        <ItemAdd label="Agregar Area" />
      </section>
    </aside>
  );
}

export default AsideBar;

function ItemCount({ Data, Title }) {
  return (
    <article className="dark:bg-DarkComponent dark:border-none border shadow-md p-6 text-center rounded-2xl">
      <span className="text-5xl font-bold">{Data}</span>
      <h3 className="mt-3 font-semibold">{Title}</h3>
    </article>
  );
}
ItemCount.propTypes = {
  Data: PropTypes.number,
  Title: PropTypes.string,
};

function ItemAdd({ label }) {
  return (
    <article className="p-4 shadow-md rounded-2xl border dark:border-none">
      <button className="w-full text-center text-sm">{label}</button>
    </article>
  );
}
ItemAdd.propTypes = {
  label: PropTypes.string,
};
