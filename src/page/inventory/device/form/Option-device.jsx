import { Switch } from "antd";
function Optiondevice() {
  return (
    <div className="bg-slate-400/30 p-4 rounded-lg mt-2">
      <h2 className="text-center font-semibold text-xl">Vincular</h2>
      <main className="grid grid-cols-2 text-center">
        <section>
          <h3>Usuario</h3>
          <Switch  className=" bg-black/30" />
        </section>

        <section>
          <h3>Area</h3>
          <Switch className=" bg-black/30" />
        </section>
      </main>
    </div>
  );
}

export default Optiondevice;
