import axiosInstance from "@/helpers/config/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export function GetBsID() {
  const { id } = useParams();
  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get(`BaseConocimiento/${id}`);
      return data;
    },
    queryKey: ["BaseConocimientoById"],
  });
}

export function GetKnowledge() {
  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get("BaseConocimiento");
      return data;
    },
    queryKey: ["BaseConocimiento"],
  });
}
export function CreateKnowledge() {
  const { folder } = useParams();
  return useMutation({
    mutationFn: async (datos) => {
      const formd = new FormData();

      formd.append("Titulo", datos.Titulo);
      formd.append("Categoria", JSON.stringify(datos.Categoria));
      formd.append("Contenido", datos.Contenido);

      for (const file of datos.image) {
        formd.append("image", file);
      }

      const { data } = await axiosInstance.post(
        `BaseConocimiento/${folder}/article`,
        formd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    onSuccess: ({ create, message }) => {
      if (create) {
        toast.success("Documento creado con exito");
      }
      return toast.error(`Error al crear documento | ${message}`);
    },
    onError: (error) => {
      toast.error(error.message ?? "Error al crear documento");
    },
  });
}
export function UseCreateFolder({ funct }) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (datos) => {
      const { data } = await axiosInstance.post(
        "BaseConocimiento/folder",
        datos
      );
      return data;
    },
    onSuccess: ({ create, message }) => {
      if (create) {
        toast.success("Carpeta creada con exito");
        funct();
        return client.invalidateQueries("BaseConocimiento");
      }
      return toast.error(`Error al crear carpeta | ${message}`);
    },
    onError: (error) => {
      toast.error(error.message ?? "Error al crear carpeta");
    },
  });
}

export function UpdateKnowledge() {
  const { id } = useParams();

  return useMutation({
    mutationFn: async (datos) => {
      const formd = new FormData();
      formd.append("Titulo", datos.Titulo);
      formd.append("Categoria", JSON.stringify(datos.Categoria));
      formd.append("Contenido", datos.Contenido);
      formd.append("imageAfter", datos.imageAfter);

      for (const file of datos.image) {
        formd.append("image", file);
      }

      const { data } = await axiosInstance.put(
        `BaseConocimiento/article/${id}`,
        formd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    onSuccess: ({ ok, message }) => {
      if (ok) {
        return toast.success("Documento actualizado con exito");
      }
      return toast.error(`Error al actualizar documento | ${message}`);
    },
    onError: (error) => {
      toast.error(error.message ?? "Error al actualizar documento");
    },
  });
}
