import { Link } from "react-router-dom";
import { CategoryInventaio } from "../../../assets/DataDefault";

function SectionInventario() {
  return (
    <header className="grid mt-7">
      <section className="grid grid-cols-2 gap-3 md:grid-cols-3 ">
        {CategoryInventaio.map((value, index) => (
          <Link to={value.name} className="bg-[#BDB76B] py-5 md:py-8 rounded-md text-center" key={index}>
            {value.name}
          </Link>
        ))}
      </section>
    </header>
  );
}
export default SectionInventario;
