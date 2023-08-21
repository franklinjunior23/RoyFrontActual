import FormCUser from "./components/FormCUser";

function ContentModal({ handle }) {
  return (
    <main className="fixed z-20 w-screen h-screen bg-slate-800/40 left-0 top-0 grid place-content-center">
      <div>
        <FormCUser handle={handle} />
      </div>
    </main>
  );
}
export default ContentModal;
