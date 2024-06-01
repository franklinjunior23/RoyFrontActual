import { TimeFromPeruvian } from "@/helpers/utils/conver-day-ddmmyy";
import TruncateText from "@/helpers/utils/truncate-text";
import { generateSummary } from "@/pages/Inventario/Forms/utils/compare-objects";
import { GetHistory } from "./services/Get-history-device";
import PropTypes from "prop-types";
import clsx from "clsx";
import { TypeStyles } from "../const/type-changes-item";

export default function History() {
  const { data, isLoading } = GetHistory();
  if (isLoading) return <h2>Cargando...</h2>;
  return (
    <div className="grid gap-2">
      {data?.map((value, index) => <ItemHistory key={index} {...value} />) ?? (
        <h2>No hay historial</h2>
      )}
      {data?.length === 0 && <h2>No hay historial</h2>}
    </div>
  );
}

function LabelCategory({ title }) {
  return (
    <span className="bg-blue-600 font-semibold text-white  text-xs px-1.5 rounded-md py-0.5">
      {title}
    </span>
  );
}

LabelCategory.propTypes = {
  title: PropTypes.string.isRequired,
};

function ItemHistory({ action, createdAt }) {
  return (
    <section className="w-full p-3 border dark:border-white/20 rounded-xl">
      <header className="flex items-center justify-between">
        <h4 className="my-1 font-semibold capitalize">
          {TimeFromPeruvian(createdAt)}
        </h4>{" "}
        <span
          className={clsx(
            "text-xs text-white  font-semibold px-2 py-0.5 rounded-lg ",
            TypeStyles[action?.type] ?? TypeStyles.add
          )}
        >
          Modified
        </span>
      </header>
      <p className="text-sm break-all ">
        <TruncateText
          text={generateSummary(action)}
          maxLength={120}
          ComponentNext={() => <></>}
        />
      </p>

      <ul className="flex flex-wrap gap-1.5 text-sm mt-2">
        {action?.map((value, index) => (
          <LabelCategory key={index} title={value?.field} />
        )) ?? <h2></h2>}
      </ul>
    </section>
  );
}

ItemHistory.propTypes = {
  action: PropTypes.any,
  createdAt: PropTypes.string,
  type: PropTypes.string,
};
