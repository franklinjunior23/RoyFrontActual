import Head from "./_components/Head";
import Sign from "./_components/Sign";

function SignIn() {
  return (
    <main className="w-screen h-screen bg-slate-50/50 grid md:grid-cols-2">
      <Head />
      <Sign/>
    </main>
  );
}

export default SignIn;
