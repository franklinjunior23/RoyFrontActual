import { Badge } from "@/componentUI/ui/badge";
import { Button } from "@/componentUI/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/componentUI/ui/form";
import { Input } from "@/componentUI/ui/input";
import { Select } from "antd";
import { DateTime } from "luxon";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { CreateKnowledge } from "../action/Useknowledge";

function FormCreate() {
  const formdata = useForm();
  const navi = useNavigate();

  const {mutate,isLoading} = CreateKnowledge();
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      ["blockquote", "code-block"],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      [{ table: [] }],
      ["link"],
      ["clean"],
    ],
  };
  function handleFormSubmit(data) {
    mutate(data)
  }
  return (
    <Form {...formdata}>
      <form onSubmit={formdata.handleSubmit(handleFormSubmit)}>
        <div className="flex md:flex-row flex-col gap-2">
          <FormField
            control={formdata.control}
            name="Titulo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulo</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Titulo del documento"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formdata.control}
            name="Categoria"
            render={({ field }) => (
              <FormItem className="grid md:justify-start">
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    mode="tags"
                    size=""
                    maxTagCount='responsive'
                    className="md:w-[560px] w-full h-full py-2 text-xs"
                    placeholder="Categoria"
                    options={[
                      { value: "Seguridad", label: "Seguridad" },
                      { value: "Redes", label: "Redes" },
                      { value: "Programacion", label: "Programacion" },
                      { value: "Base de datos", label: "Base de datos" },
                      {
                        value: "Sistemas operativos",
                        label: "Sistemas operativos",
                      },
                      { value: "Herramientas", label: "Herramientas" },
                      { value: "Hardware", label: "Hardware" },
                      { value: "Software", label: "Software" },
                      { value: "sql", label: "sql" },
                      { value: "Windows Server", label: "Windows Server" },
                      { value: "Linux", label: "Linux" },
                      { value: "virtualizacion", label: "virtualizacion" },
                      {
                        value: "copia de seguridad",
                        label: "copia de seguridad",
                      },
                      { value: "optimizacion", label: "optimizacion" },
                      { value: "Instalacion", label: "Instalacion" },
                      { value: "Configuracion", label: "Configuracion" },
                    ]}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-2">
          <Badge variant="outline">
            {DateTime.now()
              .setZone("America/Lima")
              .toISODate()
              .toLocaleString()}
          </Badge>
        </div>
        <section className="md:grid grid-cols-[1fr_300px] mt-4  gap-5">
          <FormField
            control={formdata.control}
            name="Contenido"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Descripcion</FormLabel>
                <FormControl>
                  <ReactQuill
                    className={``}
                    placeholder={"Escribe aqui"}
                    readOnly={false}
                    preserveWhitespace={false}
                    style={{
                      height: "300px",
                      marginBottom: "80px",
                    }}
                    theme="snow"
                    modules={modules}
                    
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="bg-black rounded-lg text-white text-center p-4  mb-[40px] ">
            <div className="flex md:block items-center justify-center">
              <h3>Subir Archivos</h3>
              <img
                src="/Images/EmptyImage.webp "
                className=" w-[100px] md:w-[70%] mx-auto object-cover mt-4"
              />
            </div>
            <input
              type="file"
              name=""
              className="w-full p-2 text-gray-700 md:mt-8 text-xs text-inherit border rounded-lg"
              multiple
              id=""
            />
          </div>
        </section>
        <div className="">
          <Button type="submit" disabled={isLoading}>{isLoading ? 'Creando ...' :'Crear'} </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              navi(-1);
            }}
            className="ml-1"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default FormCreate;
