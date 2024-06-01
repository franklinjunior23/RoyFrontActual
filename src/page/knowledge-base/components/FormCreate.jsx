import { Badge } from "@/componentUI/ui/badge";
import { Button } from "@/componentUI/ui/button";
import {
  Form,
  FormControl,
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
import { CreateKnowledge, UpdateKnowledge } from "../action/Useknowledge";
import { SendHorizonal } from "lucide-react";
import { Label } from "@/componentUI/ui/label";
import { Switch } from "@/componentUI/ui/switch";
import { useEffect } from "react";
import ButtonFIles from "./ButtonFIles";
import { useState } from "react";

function FormCreate({ data }) {
  const [PastedFile, setPastedFile] = useState([]);
  const formdata = useForm();
  const navi = useNavigate();

  const { mutate, isLoading } = CreateKnowledge();
  const { mutate: UpdateKnow, isLoading: LoadingUpdate } = UpdateKnowledge();
  useEffect(() => {
    if (data) {
      formdata.setValue("Contenido", data.Contenido);
      formdata.setValue("Titulo", data.Titulo);
      formdata.setValue("Categoria", data.Categoria);
      if (data?.Archivos?.length > 0) setPastedFile([...data?.Archivos]);
      else {
        setPastedFile([]);
      }
    }
  }, [data, formdata]);
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
  function handleFormSubmit(datos) {
    const datanewupdate = {
      ...datos,
      imageAfter: JSON.stringify(PastedFile.filter((file) => !file?.file)),
      image: PastedFile.filter((file) => file?.file).map(
        (file) => file.file ?? null
      ),
    };
    if (data) {
      UpdateKnow(datanewupdate);
    } else {
      const datanewcreate = {
        ...datos,
        image: PastedFile.map((file) => file.file) ?? null,
      };

      mutate(datanewcreate);
    }
  }
  return (
    <Form {...formdata}>
      <form onSubmit={formdata.handleSubmit(handleFormSubmit)}>
        <main className="lg:grid lg:grid-cols-[1fr_400px] gap-5 mt-5">
          <div className="">
            <header className="grid   lg:grid-cols-2 gap-2">
              <FormField
                control={formdata.control}
                name="Titulo"
                rules={{
                  required: true,
                  minLength: 5,
                }}
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
                rules={{ required: true, minLength: 1 }}
                render={({ field }) => (
                  <FormItem className="grid ">
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        mode="tags"
                        size=""
                        maxTagCount="responsive"
                        className="w-[100%] h-full py-2 text-xs"
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
            </header>
            <div className="mt-2">
              <Badge variant="outline">
                {DateTime.now()
                  .setZone("America/Lima")
                  .toISODate()
                  .toLocaleString()}
              </Badge>
            </div>
            <section className="full mt-4  gap-5">
              <FormField
                control={formdata.control}
                name="Contenido"
                rules={{
                  required: true,
                  minLength: 5,
                }}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Descripcion</FormLabel>
                    <FormControl>
                      <ReactQuill
                        className={``}
                        value={field.value}
                        placeholder={"Escribe aqui"}
                        readOnly={false}
                        preserveWhitespace={false}
                        style={{
                          height: "350px",
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
              <div className="md:flex justify-between items-start">
                <ButtonFIles
                  PastedFile={PastedFile}
                  setPastedFile={setPastedFile}
                />
                <footer className="flex ">
                  {data ? (
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        onClick={() => {
                          navi(-1);
                        }}
                        className="mr-2 px-5"
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" size="sm" disabled={LoadingUpdate}>
                        {LoadingUpdate ? (
                          "Actualizando ..."
                        ) : (
                          <>
                            Actualizar Articulo{" "}
                            <SendHorizonal className="ml-2 w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        onClick={() => {
                          navi(-1);
                        }}
                        className="mr-2 px-5"
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" size="sm" disabled={isLoading}>
                        {isLoading ? (
                          "Creando ..."
                        ) : (
                          <>
                            Crear Articulo{" "}
                            <SendHorizonal className="ml-2 w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </footer>
              </div>
            </section>
          </div>
          <div>
            <div className="grid w-[100px]">
              <Label>Publico</Label>
              <Switch className="mt-2" />
            </div>
          </div>
        </main>
      </form>
    </Form>
  );
}

export default FormCreate;
