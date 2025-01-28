"use client"

import { useEffect, useState } from "react"
import Link from "next/link";

export default function VideojuegoPage(){
    const[videojuegos, setVideojuegos] = useState([]);

    //1.Obtener lista de videojuegos al cargar la pagina
    async function fetchVideojuegos() {
        const response = await fetch("/api/videojuego", {method: "GET"
            
        });
            const body= await response.json();
            setVideojuegos(body);
    }

    useEffect(() => {
        fetchVideojuegos();
    }, []);

    //1.2 Eliminar juego
    async function deleteVideojuego(deleteId) {
        if(window.confirm("Desea eliminar este juego")){
            const response= await fetch("api/videojuego/", {
                method: "DELETE",
                headers: {"Content-Type": "application-json"},
                body: JSON.stringify({id: deleteId}),
            });
            fetchVideojuegos();
        }
    }
    return(
        <>
            <h1>Lista de videojuegos</h1>
            <ul>
                {videojuegos.map((videojuego) => (
                    <li key={videojuego.id}>
                        <Link href={"/videojuego/" + videojuego.id}>
                            <h4>Titulo: {videojuego.titulo}</h4>
                            <p>Plataforma: {videojuego.plataforma}</p>
                        </Link>
                        
                        <button onClick={()=> deleteVideojuego(videojuego.id)}>
                            Eliminar
                        </button>
                    </li>
                ))}
                <Link href={"/videojuego/add"}>
                    <button>Agregar videojuego</button>
                </Link>
            </ul>
        </>
    )
}