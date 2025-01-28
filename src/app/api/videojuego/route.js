import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aprhtzdgbamhqhbedxmk.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwcmh0emRnYmFtaHFoYmVkeG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5Nzc0MTcsImV4cCI6MjA1MzU1MzQxN30.4Ip9feHbQstzfuWFD7tBxalJdESfrBe8-tI3E8JcWl8"
const supabase = createClient(supabaseUrl, supabaseKey)

//Obtener la lista de videojuegos ordenados alfabeticamente
export async function GET(request) {
    const {data: videojuego, error} = await supabase
        .from("videojuego")
        .select("id, titulo, plataforma")   
        .order("titulo", {ascending: true});

        return new Response (JSON.stringify(videojuego), {status:200})
}   

//Eliminar un videojuego
export async function DELETE(request) {
    const body = await request.json();
    const id= body.id;

    const{ data: deleteVideojuego, error } = await supabase
        .from("videojuego")
        .delete()
        .eq("id", id);

    return new Response(JSON.stringify({success: "Eliminado con éxito"}), {
        status:200,
    });
}

//Añadir un videojuego
export async function POST(request) {
    const body = await request.json();
    const videojuego = body.videojuego;

    if(!videojuego.titulo){
        return new Response(
            JSON.stringify({
                error: "El campo titulo es obligatorio"
            }),
            {status:400}
        );
    }

    if(!videojuego.plataforma){
        return new Response(
            JSON.stringify({
                error: "El campo plataforma es obligatorio"
            }),
            {status:400}
        );
    }

    if(!videojuego.genero){
        return new Response(
            JSON.stringify({
                error: "El campo género es obligatorio"
            }),
            {status:400}
        );
    }

    if(!videojuego.fecha_lanzamiento){
        return new Response(
            JSON.stringify({
                error: "El campo fecha de lanzamiento es obligatorio"
            }),
            {status:400}
        );
    }

    const{ data: postData, error} = await supabase
        .from("videojuego")
        .insert(videojuego);
    
    if(!error){
        return new Response(
            JSON.stringify({success: "videojuego agregado con éxito"}),
            {status:201}
        );
    }

    return new Response(
        JSON.stringify({error: "Error al agregar videojuego"}), {status:400}
    );
}