import Buttom from "@Components/Buttons/Buttom/Buttom";
import Proptypes from "prop-types";
import {useNavigate} from "react-router-dom"
function NotRegistred({ Title, href }) {
  const  navi = useNavigate()
  return (
    <article  className="shadow-2xl grid p-6 gap-2">
      <h3 className="text-xl text-center">{Title}</h3>
      <img src="/Figures/NotRegistredUser.webp" alt="" className="w-[400px]" />
      <Buttom
        onClick={() => navi(`${href}`)}
        className=""
        label="Registrar Usuario"
      />
    </article>
  );
}

export default NotRegistred;
NotRegistred.propTypes = {
  Title: Proptypes.string,
  href: Proptypes.string,
};
