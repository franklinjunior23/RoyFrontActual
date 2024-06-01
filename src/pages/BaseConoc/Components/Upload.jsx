import axiosInstance from "@/helpers/config/axios-instance";
import { useForm } from "react-hook-form";


export default function Upload() {
  const { register,watch, handleSubmit } = useForm();
    console.log(watch('image'))
  const onSubmit = async (data) => {
    const formData = new FormData();
    for (let i = 0; i < data.image.length; i++) {
      formData.append("image", data.image[i]);
    }
    try {
      const response = await axiosInstance.post("BaseConocimiento", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" {...register("image")} multiple />
      <input type="submit" />
    </form>
  );
}
