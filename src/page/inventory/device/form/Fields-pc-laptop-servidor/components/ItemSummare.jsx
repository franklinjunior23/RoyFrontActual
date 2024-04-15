import clsx from "clsx";

function ItemSummare({ children, status, icon }) {
  return (
    <section className="border  p-3 pl-5 relative h-[100px] rounded-lg dark:border-white/20 shadow-md">
      <section className="flex justify-between h-full">
        {children}
        <div className="self-center">{icon}</div>
      </section>
      <div className="absolute w-1.5 h-full top-0 left-0 flex  items-center">
        <div
          className={clsx(
            "w-full rounded-md h-3/4",
            status ? "bg-green-600" : "bg-red-600"
          )}
        />
      </div>
    </section>
  );
}

export default ItemSummare;

export function ItemOffline() {
  return <ItemSummare status={false}></ItemSummare>;
}
