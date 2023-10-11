import QuillComponent from "../../components/ReactQuill/QuillComponent";

function PageCreate() {
  return (
    <main className="md:grid md:grid-cols-2 ">
      <section className="h-[300px]">
        <QuillComponent />
      </section>
      <section></section>
    </main>
  );
}

export default PageCreate;
