import { VITE_VERSION_APLICATION } from "../../../services/ConfigApi";
function InfoVersion() {
  const VersionAplication = VITE_VERSION_APLICATION;
  return (
    <section className="w-full mt-2  rounded-lg relative h-[130px] dark:bg-slate-500/20 p-4 overflow-hidden shadow-lg ">
    <h3 className="dark:text-white font-bold text-xl">
      Inventory TI
    </h3>
    <span className="dark:text-white">V.{VersionAplication}</span>
    <div className="absolute rounded-lg bg-[url('/Images/image_FranxUser.png')] bg-center bg-cover w-[130px] top-0 right-0 h-[100%]" />
  </section>
  )
}
export default InfoVersion