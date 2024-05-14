import { useForm } from "react-hook-form";
import {
  TYPE_DOC,
  TYPER_USERS,
  ESTATUS_USER,
  LEVEL_RED,
} from "@Data/DataDefault";
import PropTypes from "prop-types";
import clsx from "clsx";
import FieldsEmail from "./FieldsEmail";
import { AddDataForm } from "../Utils";
import { useEffect, useState } from "react";
import RowInfoDevice from "./RowInfoDevice";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/helpers/config/axios-instance";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/componentUI/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/componentUI/ui/select";
import { Input } from "@/componentUI/ui/input";
import { Button } from "@/componentUI/ui/button";
import { CreateUser, UpdateUser } from "../Utils/FunctionsApis/useUsers";

export default function FormUser({ data }) {
  const { idUsuario: UsuarioId, nombreE, sucursalN } = useParams();
  const [Areas, setAreas] = useState(null);
  const { mutate, isLoading: LoadingCreate } = CreateUser();
  const { mutate: mutateUpdate, isLoading: loadingUpdate } = UpdateUser();

  const Navigator = useNavigate();
  const formdata = useForm({
    defaultValues: {
      email: [data?.email ?? { type: "POP" }],
    },
  });
  useEffect(() => {
    if (!UsuarioId) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      data = [];
    }
    async function GetsAreas() {
      try {
        const Response = await axiosInstance.get(
          `Areas?Company=${nombreE}&Branch=${sucursalN}`
        );
        return setAreas(Response?.data.body);
      } catch (error) {
        alert(`Error Form : ${error?.message}`);
      }
    }
    GetsAreas();
    if (data?.length !== 0) AddDataForm({ data, setValue: formdata.setValue });
  }, [data, UsuarioId, nombreE, sucursalN, formdata.setValue]);
  async function handleEnv(datos) {
    if (data?.id || UsuarioId) {
      // PARA ACTUALIZAR USUARIO
      return await mutateUpdate(datos);
    }
    // PARA CREAR USUARIO
    return await mutate(datos);
  }

  return (
    <Form {...formdata}>
      <form onSubmit={formdata.handleSubmit(handleEnv)}>
        <RowColumn className={"gap-5"}>
          <section>
            <h3 className="pb-1 mb-2 border-b dark:text-white">
              Datos Personales
            </h3>
            <FormField
              control={formdata.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formdata.control}
              name="apellido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <RowColumn>
              <FormField
                control={formdata.control}
                name="tipo_doc"
                defaultValue={data?.tipo_doc}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo Doc</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar Documento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TYPE_DOC?.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formdata.control}
                name="doc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formdata.watch("tipo_doc") ?? "doc"}</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre" type="number" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </RowColumn>

            <section>
              <RowColumn className={"mt-0.5"}>
                <FormField
                  control={formdata.control}
                  name="cargo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo</FormLabel>
                      <FormControl>
                        <Input placeholder="Cargo" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formdata.control}
                  defaultValue={data?.tipo_usuario}
                  name="tipo_usuario"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo Usuario</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo de usuario" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TYPER_USERS?.map((item) => (
                            <SelectItem key={item} value={item.value}>
                              {item.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </RowColumn>
              <FormField
                control={formdata.control}
                defaultValue={data?.genero}
                name="genero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genero</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar Genero" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Masculino">Masculino</SelectItem>
                        <SelectItem value="Femenino">Femenino</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <h3 className="pb-1 mt-2 mb-2 border-b dark:text-white">Email</h3>
              <FieldsEmail
                register={formdata.register}
                control={formdata.control}
                watch={formdata.watch}
                error={formdata.formState.errors}
              />
            </section>
          </section>
          <section>
            <h3 className="pb-1 mb-2 border-b dark:text-white">Anydesk</h3>
            <RowColumn>
              <FormField
                control={formdata.control}
                name="anydesk_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Id</FormLabel>
                    <FormControl>
                      <Input placeholder="Id anydesk" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formdata.control}
                name="anydesk_contra"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Id</FormLabel>
                    <FormControl>
                      <Input placeholder="contraseña" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </RowColumn>
            <h3 className="pb-1 mt-5 mb-2 border-b dark:text-white">Estado</h3>
            <FormField
              control={formdata.control}
              name="estado"
              defaultValue={data?.estado}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado del Usuario</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ESTATUS_USER?.map((item) => (
                        <SelectItem key={item} value={item.value}>
                          {item.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <h3 className="pb-1 mt-5 mb-2 border-b dark:text-white">Area</h3>
            <FormField
              control={formdata.control}
              name="IdArea"
              defaultValue={data?.Areas?.[0]?.nombre ?? ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar Area" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Areas ? (
                        Areas?.map((item) => (
                          <SelectItem key={item?.id} value={item?.value}>
                            {item?.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value={"not"}>No hay areas</SelectItem>
                      )}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            {data?.Areas?.length > 0 && (
              <button
                type="button"
                className="w-full py-2 mt-3 text-sm text-center bg-red-400"
              >
                Desvincular Area
              </button>
            )}

            {data?.Areas?.length > 0 && (
              <input type="text" hidden {...formdata.register("IdArea")} />
            )}
            <h3 className="pb-1 mt-5 mb-2 border-b dark:text-white">Red</h3>
            <FormField
              control={formdata.control}
              name="nivel_red"
              defaultValue={data?.estado}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIvel de Red</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar nivel de red" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LEVEL_RED?.map((item) => (
                        <SelectItem key={item} value={item.value}>
                          {item.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <RowColumn className={"mt-2"}>
              <FormField
                control={formdata.control}
                name="usuario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="Usuario" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formdata.control}
                name="contraseña"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input placeholder="Contraseña" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </RowColumn>
            {data?.Dispositivo && <RowInfoDevice data={data?.Dispositivo} />}
            <footer className="grid w-full grid-cols-2 gap-3 mt-5 ">
              <Button type="submit" color={"bg-black"}>
                {UsuarioId &&
                  (loadingUpdate ? "Actualizando ..." : "Actualizar")}

                {!UsuarioId && (LoadingCreate ? "Creando ..." : "Crear")}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  Navigator(-1);
                }}
                variant={"secondary"}
                color={"bg-black"}
              >
                Cancelar
              </Button>
            </footer>
          </section>
        </RowColumn>
      </form>
    </Form>
  );
}

export function RowColumn({ children, className }) {
  return (
    <section className={clsx("grid md:grid-cols-2 gap-2", className)}>
      {children}
    </section>
  );
}
RowColumn.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

FormUser.propTypes = {
  data: PropTypes.any,
};
