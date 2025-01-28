"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";


//4. Editar un contacto
export default function EditVideojuego() {
  const [videojuego, setVideojuego] = useState({
    titulo: "",
    plataforma: "",
    genero: "",
    fecha_lanzamiento: "",
    completado: "",
  });
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchVideojuego = async () => {
      try {
        const response = await fetch(`/api/videojuego/view?id=${id}`);
        const data = await response.json();
        setVideojuego(data);
      } catch (error) {
        console.error("Error al cargar los datos del videojuego:", error);
      }
    };

    fetchVideojuego();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/videojuego/view?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videojuego),

      });

      const responseData = await response.json();

      if (response.ok) {
        alert("Videojuego actualizado exitosamente");
      } else {
        alert(responseData.error || "Error al actualizar el videojuego");
      }
    } catch (error) {
      console.error("Error al actualizar el videojuego:", error);
      alert("Hubo un problema al actualizar el videojuego");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideojuego((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Detalle y Edición del Videojuego</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          name="titulo"
          value={videojuego.titulo}
          onChange={handleChange}
          required
        />
        <br />
        <label>Plataforma:</label>
        <input
          type="text"
          name="plataforma"
          value={videojuego.plataforma}
          onChange={handleChange}
          required
        />
        <br />
        <label>Género:</label>
        <input
          type="text"
          name="genero"
          value={videojuego.genero}
          onChange={handleChange}
          required
        />
        <br />
        <label>Fecha lanzamiento:</label>
        <input
          type="date"
          name="fecha_lanzamiento"
          value={videojuego.fecha_lanzamiento}
          onChange={handleChange}
          required
        />
        <br />
        <label>Completado:</label>
        <input
          type="checkbox"
          name="completado"
          value={videojuego.completado}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}