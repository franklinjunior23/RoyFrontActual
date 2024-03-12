import { useQuery } from "@tanstack/react-query";
import ItemsUser from "./ItemsUser";
import { UseSearch } from "@States/UsersAdmin/StateUsers";
import axiosInstance from "@/helpers/config/axios-instance";

function ListItems() {
  const { searchParams } = UseSearch();
  const Search = searchParams.get("Search");
  console.log(Search);

  const { data, isLoading } = useQuery({
    queryKey: ["UsersAuth"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("auth/login/userAuth");
      return data;
    },
  });

  if (isLoading) return <h2>Loading ....</h2>;

  return (
    <main className="h-[500px]  mt-10">
      <main className="h-full ">
        <main className="flex flex-wrap gap-4">
          <FilterList data={data} Search={Search} />
        </main>
      </main>
    </main>
  );
}

export default ListItems;

export const FilterList = ({ data, Search }) => {
  if (Search === "" || Search === null) {
    return data?.map((user, index) => <ItemsUser key={index} {...user} />);
  } else {
    return null; // O puedes retornar algo diferente si no quieres renderizar nada en este caso
  }
};
