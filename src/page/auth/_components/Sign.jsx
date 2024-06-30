
import FormSign from "./FormSign";

function Sign() {
  return (
    <main className="p-8 h-full  grid place-content-center md:w-[60%] mx-auto">
      <h3 className="text-xl text-center font-semibold">Iniciar Sesion</h3>
      <p className="text-sm mt-3 text-muted-foreground text-center">
        Ingrese su usuario y contraseña para acceder al sistema
      </p>
      <FormSign />
      <p className="px-8 mt-5 text-center text-sm text-muted-foreground">
        Al hacer clic en continuar, acepta nuestros 
        <a
          className="underline underline-offset-4 hover:text-primary"
          href="/terms"
        >
          {" "}Términos de servicio  {" "}
        </a>
        y {" "}
        <a
          className="underline underline-offset-4 hover:text-primary"
          href="/privacy"
        >
          Política de privacidad.
        </a>
        .
      </p>
    </main>
  );
}

export default Sign;
