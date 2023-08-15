import { useLocation, useNavigate } from "react-router-dom";


function RetrocederItem() {
  const { pathname } = useLocation();
  const navi = useNavigate();


  return (
    <section className="flex justify-between items-center mb-6">
      <div>
        <span className=""></span>
      </div>
      <div>
        <button
          className="px-4 text-white text-base rounded-md lg:text-lg bg-black py-1"
          onClick={() => navi(-1)}
        >
          Regresar
        </button>
      </div>
    </section>
  );
}

export default RetrocederItem;