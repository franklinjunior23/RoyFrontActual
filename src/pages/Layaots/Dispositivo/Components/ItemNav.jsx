import { Link } from "react-router-dom";

function ItemNav({ Icon, label, path }) {
  return (
    <Link to={`${path}`} className="flex flex-col items-center">
      {Icon}
      <h3 className="text-white font-semibold text-xs">{label}</h3>
    </Link>
  );
}

export default ItemNav;
