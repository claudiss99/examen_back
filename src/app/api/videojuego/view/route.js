import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aprhtzdgbamhqhbedxmk.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwcmh0emRnYmFtaHFoYmVkeG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5Nzc0MTcsImV4cCI6MjA1MzU1MzQxN30.4Ip9feHbQstzfuWFD7tBxalJdESfrBe8-tI3E8JcWl8"
const supabase = createClient(supabaseUrl, supabaseKey)

//Vista individual del videojuego
export async function GET(request) {
    const {searchParams} = new URL(request.url);
    const id = searchParams.get("id");
    const { data: videojuego, error} = await supabase
        .from("videojuego")
        .select("*")
        .eq("id", id)
        .single();

        return new Response (JSON.stringify(videojuego), {status:200});
}

//Modificar el videojuego
export async function PUT(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    const { titulo, plataforma, genero, fecha_lanzamiento, completado } = await request.json();
  
    if (!titulo) {
      return new Response(
        JSON.stringify({
          error: "El titulo es un campo obligatorio",
        }),
        { status: 400 }
      );
    }

    if (!plataforma) {
    return new Response(
        JSON.stringify({
        error: "La plataforma es un campo obligatorio",
        }),
        { status: 400 }
    );
    }

    if (!genero) {
    return new Response(
        JSON.stringify({
        error: "El género es un campo obligatorio",
        }),
        { status: 400 }
    );
    }

    if (!fecha_lanzamiento) {
    return new Response(
        JSON.stringify({
        error: "La fecha de lanzamiento es un campo obligatorio",
        }),
        { status: 400 }
    );
    }
  
    const { data, error } = await supabase
      .from("videojuegos")
      .update({
        titulo,
        plataforma,
        genero,
        fecha_lanzamiento,
        completado      
        })
      .eq("id", id);
  
    if (error) {
      console.error("Error en la actualización:", error.message);
      return new Response(
        JSON.stringify({ error: "Hubo un error al modificar el videojuego" }),
        { status: 400 }
      );
    }
  
    return new Response(
      JSON.stringify({ success: "Videojuego modificado con éxito" }),
      { status: 200 }
    );
}