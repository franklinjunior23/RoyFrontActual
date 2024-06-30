import { useEffect } from "react";
import Head from "./_components/Head";
import Sign from "./_components/Sign";
import { UsecontextAuth } from "@/context/provider-auth";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const { LogedAuth } = UsecontextAuth();
  const navi = useNavigate();
  useEffect(() => {
    if (LogedAuth) {
     setTimeout(() => {
       navi("dashboard/home");
     }, 1000);
    }
  }, [LogedAuth, navi]);
  return (
    <main className="w-screen h-screen bg-slate-50/50 grid md:grid-cols-2">
      <Head />
      <Sign />
    </main>
  );
}

export default SignIn;
