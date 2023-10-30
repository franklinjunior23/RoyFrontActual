import { IconBrandElastic } from "@tabler/icons-react";

function ItemView({ Title, Color, Count }) {
  return (
    <section className="md:max-w-[220px] relative h-[124px] rounded-xl shadow-lg px-5 py-3 flex flex-col justify-between dark:bg-DarkComponent dark:text-white" >
      <header className="flex gap-3 items-center">
        <IconBrandElastic  style={{ color:Color ?? 'white' }} size={35}  />
        <h3 className="text-lg truncate  text-[#747373] dark:text-white/80 ">{Title}</h3>
      </header>
      <span className="font-extrabold text-4xl">{Count}</span>
      <span className="before:absolute w-3/4 bg-slate-50 h-1 " style={{ background:Color }}></span>

    </section>
  );
}

export default ItemView;
