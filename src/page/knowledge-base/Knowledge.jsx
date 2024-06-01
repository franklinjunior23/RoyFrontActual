import { useState } from "react";
import Header from "./components/Header";
import ListContent from "./components/ListContent";


function PageKnowledge() {
  const [Search, setSearch] = useState("");
  return (
    <main>
      <Header setValue={setSearch} Value={Search} />
     
      <ListContent text={Search} setText={setSearch} />
    </main>
  );
}

export default PageKnowledge;
