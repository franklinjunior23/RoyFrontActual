const InfoTicket = ({name,date}) => {
  return (
    <section className="dark:bg-Component rounded-md border dark:border-none ">
      <div className="text-center py-3  px-2 md:p-4 dark:text-white">
        <h3 className="text-Slet">{name}</h3>
        <p className="font-bold pt-2">{date}</p>
      </div>
    </section>
  );
};

export default InfoTicket;
