import  { useState } from "react";

function App() {
  const [imagenes, setImagenes] = useState([]);

  const manejarPegado = (e) => {
    // Verificar si el evento de pegado contiene datos de imagen
    if (e.clipboardData && e.clipboardData.items) {
      const nuevasImagenes = [];
      const items = e.clipboardData.items;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const imagenPegada = items[i].getAsFile();
          nuevasImagenes.push(URL.createObjectURL(imagenPegada));
        }
      }

      // Agregar las nuevas imágenes al estado
      setImagenes([...imagenes, ...nuevasImagenes]);
    }
  };

  const eliminarImagen = (index) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes.splice(index, 1);
    setImagenes(nuevasImagenes);
  };

  return (
    <div>
      <h1>Pegar Imágenes desde el Portapapeles</h1>
      <div
        onPaste={manejarPegado}
        style={{ border: "1px solid #ccc", minHeight: "200px" }}
      >
        Pegue imágenes aquí.
      </div>
      {imagenes.map((imagen, index) => (
        <div key={index}>
          <img
            src={imagen}
            alt={`Imagen Pegada ${index}`}
            style={{objectFit:"cover"}}
            width={300}
            height={300}
          />
          <button onClick={() => eliminarImagen(index)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default App;
