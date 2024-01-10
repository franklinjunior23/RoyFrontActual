import { IconFilter, IconFilterOff } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";
import { StateUsers } from "@States/UsersAdmin/StateUsers";

function Filters() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { SearchUser, setSearchUser } = StateUsers();
  const handleReset = () => {
    const newSearchParams = new URLSearchParams(useSearchParams);
    newSearchParams.delete("Search");
    setSearchParams("");
    setSearchUser("");
  };
  return (
    <article className="mt-5">
      <footer className="w-full flex justify-start  gap-3">
        <CustomButtonsFilter label={<IconFilter />} OnckTock={handleReset} />
        <CustomButtonsFilter label={<IconFilterOff />} />
        <CustomButtonsFilter label={"Administradores"} />
        <CustomButtonsFilter label={"Soportes"} />
        <CustomButtonsFilter label={"Visitantes"} />
      </footer>
    </article>
  );
}

export default Filters;

const CustomButtonsFilter = ({ label, OnckTock }) => {
  return (
    <button
      className="bg-DarkComponent text-white text-sm px-4 py-1 rounded-md"
      onClick={OnckTock}
    >
      {label}
    </button>
  );
};
