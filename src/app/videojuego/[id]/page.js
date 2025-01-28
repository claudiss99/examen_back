"use client"

import {useEffect, useState } from "react";
import { useParams } from "next/navigation";


//Editar un videojuego

export default function EditVideojuegoForm({params}){
    const { id } = useParams();
    const[titulo, setTitulo] = useState("");
    const[plataforma, setPlataforma] = useState("");
    const[genero, setGenero] = useState("");
    const[fecha_lanzamiento, setFechaLanzamiento] = useState("");
    const[completado, setCompletado] = useState(false);
    const[mensaje, setMensaje] = useState("");

//2. Vista individual 
useEffect(() => {
    async function fetchVideojuegoDetail() {
      const response = await fetch(`/api/videojuego/view?id=${id}`);
      const data = await response.json();

      setTitulo(data.titulo);
      setPlataforma(data.plataforma);
      setGenero(data.genero);
      setFechaLanzamiento(data.fecha_lanzamiento);
      setCompletado(data.completado);
    }

    fetchVideojuegoDetail();
  }, [id]);

  // Función para actualizar el videojuego
  async function actualizarVideojuego(e) {
    e.preventDefault();

    if (!titulo.trim()) {
      alert("Por favor, complete el titulo");
      return;
    }

    if (!plataforma.trim()) {
      alert("Por favor, complete la plataforma");
      return;
    }

    if (!genero.trim()) {
        alert("Por favor, complete el genero");
        return;
    }

    if (!fecha_lanzamiento.trim()) {
        alert("Por favor, complete la fecha");
        return;
    }

    const response = await fetch(`/api/videojuego/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo: titulo,
        plataforma: plataforma,
        genero: genero,
        fecha_lanzamiento: fecha_lanzamiento,
        completado: completado,
      }),
    });

    if (response.ok) {
      setMensaje("Videojuego actualizado correctamente");
    } else {
      setMensaje("Hubo un error al actualizar el videojuego");
    }
  }

  return (
    <div>
      <h1>Editar Videojuego</h1>
      <form onSubmit={actualizarVideojuego}>
        <label>Título:</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <br />
        <label>Plataforma:</label>
        <input
          type="text"
          value={plataforma}
          onChange={(e) => setPlataforma(e.target.value)}
          required
        />
        <br />

        <label>Género:</label>
        <input
          type="text"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        />
        <br />

        <label>Fecha lanzamiento:</label>
        <input
          type="date"
          value={fecha_lanzamiento}
          onChange={(e) => setFechaLanzamiento(e.target.value)}
          required
        />
        <br />

        
        {/* Checkbox para el estado "completado" */}
        <label>
          ¿Está completado?
          <input
            type="checkbox"
            checked={completado}
            onChange={() => setCompletado(!completado)} // Cambiar el estado de "completado"
          />
        </label>
        <br />
        
        <input type="submit" value="Actualizar videojuego" />
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}