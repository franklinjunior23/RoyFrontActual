import { FormateDayD } from "@/helpers/utils/conver-day-ddmmyy";
import Button from "@Components/Input/Button";
import PropTypes from "prop-types";
import { UnclikArea } from "../form/utils/unlick";

function LinkArea({ name, createdAt, id }) {
  const { mutate } = UnclikArea();
  return (
    <section
      key={name}
      className=" p-4 mt-4  rounded-lg text-sm text-black"
    >
      <header className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-medium">{name} </h3>
          <span className="bg-black py-0.5 px-2 rounded-md text-xs text-white">
            Area
          </span>
        </div>
        <span className="text-xs text-slate-500">{FormateDayD(createdAt)}</span>
      </header>

      <footer className="mt-5">
        <Button type="button" onClick={() => mutate(id)} variant="danger">
          Desvincular
        </Button>
      </footer>
    </section>
  );
}

export default LinkArea;

LinkArea.propTypes = {
  name: PropTypes.string,
  createdAt: PropTypes.string,
  id: PropTypes.string,
};
