const InfoTicket = ({name,date}) => {
  return (
    <section className="dark:bg-DarkComponent rounded-md border dark:border-none ">
      <div className="text-center py-3  px-2 md:p-4 dark:text-white">
        <h3 className="text-Slet font-bold text-lg">{name}</h3>
        <p className="font-bold pt-2 text-2xl">{date}</p>
      </div>
    </section>
  );
};

export default InfoTicket;
