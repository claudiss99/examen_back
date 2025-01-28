'use client';
import { useState } from 'react';

//Crear un videojuego nuevo
export default function AddVideojuegoForm() {
  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [genero, setGenero] = useState("");
  const [completado, setCompletado] = useState(false);
  const [fecha_lanzamiento, setFecha_lanzamiento] = useState("");

  async function crearVideojuego(e) {
    e.preventDefault();

    if (!titulo.trim()) {
      alert("Campo obligatorio: complete titulo");
      return;
    }

    if (!plataforma.trim()) {
        alert("Campo obligatorio: complete plataforma");
        return;
    }

    if (!genero.trim()) {
        alert("Campo obligatorio: complete genero");
        return;
    }

    if (!fecha_lanzamiento.trim()) {
        alert("Campo obligatorio: complete fecha de lanzamiento");
        return;
    }

    const response = await fetch("/api/videojuego", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        videojuego: {
          titulo: titulo,
          plataforma: plataforma,
          genero: genero,
          fecha_lanzamiento: fecha_lanzamiento,
          completado: completado,
        },
      }),
    });

    if (response.ok) {
      setTitulo("");
      setPlataforma("");
      setGenero("");
      setFecha_lanzamiento("");
      setCompletado("");
    }
  }

  return (
    <div>
      <h1>Agregar Videojuego</h1>
      <form onSubmit={crearVideojuego}>
        <label>Titulo:</label>
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
        <label>Fecha de lanzamiento:</label>
        <input
          type="date"
          value={fecha_lanzamiento}
          onChange={(e) => setFecha_lanzamiento(e.target.value)}
          required
        />
        <br />
        <label>Completado:</label>
        <input
          type="checkbox"
          value={completado}
          onChange={(e) => setCompletado(e.target.value)}
        />
        <br />
        <input type="submit" value="Agregar Videojuego" />
      </form>
    </div>
  );
}