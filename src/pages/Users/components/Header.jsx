import { IconSearch } from "@tabler/icons-react";
import { StateUsers } from "@States/UsersAdmin/StateUsers";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function Header() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { SearchUser, setSearchUser } = StateUsers();
  const searchValue = searchParams.get("Search") ?? null;
  useEffect(() => {
    if (searchValue !== null && searchValue !== SearchUser) {
      setSearchUser(searchValue);
    }
  }, [searchValue, SearchUser, setSearchUser]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setSearchUser(newValue);
    setSearchParams({ Search: newValue });
  };

  return (
    <header className="flex justify-between items-end">
      <section className="flex gap-2 items-center dark:bg-DarkComponent py-1.5 px-4 dark:border-none border rounded-md">
        <input
          type="text"
          defaultValue={searchParams.get("Search") ?? ''}
          placeholder="Search"
          onChange={handleInputChange}
          className="bg-transparent indent-1 focus:outline-none dark:text-white "
        />
        <IconSearch className="dark:text-white" />
      </section>
      <section>
        <button className="py-1 px-3 bg-black text-white text-sm md:text-base rounded-md">
          Crear Usuario
        </button>
      </section>
    </header>
  );
}

export default Header;
