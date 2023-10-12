import RetrocederItem from "../../../components/Navlinks/components/RetrocederItem";
import PropTypes from "prop-types";


function HeadPage({site}) {
  return (
    <header className="flex justify-between items-start mb-5 md:mb-4 ">
      <div>
        <h3 className="dark:text-white text-sm   md:text-xl border-b pb-2 py-2">
          Base Conocimiento / {site}
        </h3>
      </div>
      <RetrocederItem />
    </header>
  );
}
export default HeadPage;
HeadPage.propTypes = {
  site: PropTypes.string,
};
