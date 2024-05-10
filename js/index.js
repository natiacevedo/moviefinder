// Cambio de imagen del banner:

let img = ["img/capernaum_1.jpg", "img/lordoftherings.jpg", "img/schindlerlist.jpg", "img/yourname.jpeg"];

function imgRandom() {
   let random = Math.floor(Math.random() * img.length);
   return img[random];
}

function cambiarImagenBanner() {
   let newImg = imgRandom();
   let contenedorImg = document.querySelector("#principal");
   contenedorImg.style.backgroundImage = `url(${newImg})`;
}

setInterval(cambiarImagenBanner, 3000);

/* OBTENER PELÍCULAS*/

import  pelicula from "./utils/pelicula.js";
import { getLocalStorage, imprimir, setLocalStorage } from "./utils/functions.js";

let peliculas = [];
const obtenerPeliculas = () => {
    return fetch('https://imdb-top-100-movies.p.rapidapi.com/', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ea91c5c078mshf5e2989a517edebp189325jsn9b1bab4e0c13',
            'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
    })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error))
}

obtenerPeliculas()
.then((data) => {
    peliculas = data.map((peliculaData) => new pelicula(peliculaData.id, peliculaData.image, peliculaData.title, peliculaData.rating, peliculaData.genre));
    imprimirPeliculas();
})
.catch((error) => {
    console.error('Error obtaining movies:', error);
});

/* GUARDAR Y ELIMINAR FAVORITAS */
const guardarFavoritas = (id) => {
    let peliculaElegida = peliculas.find((pelicula) => 
    pelicula.id === id);
    let peliculasGuardadas = getLocalStorage("peliculasGuardadas") || [];
    peliculasGuardadas.push(peliculaElegida)
    setLocalStorage("peliculasGuardadas", peliculasGuardadas);
    imprimirFavoritas();	
}

const eliminarFavoritas = (id) => {
    let peliculasGuardadas = getLocalStorage("peliculasGuardadas");
    let filtradas = peliculasGuardadas.filter((pelicula) => pelicula.id !== id);

    setLocalStorage("peliculasGuardadas", filtradas);

    imprimirFavoritas();
}

/* IMPRIMIR PELÍCULAS */

const imprimirPeliculas = () => {
    let contenido = peliculas.map((pelicula) => pelicula.generarCard(pelicula,true)).join('');
    imprimir("contenedor", contenido);
    document.querySelectorAll(".guardar-btn").forEach((button)=> button.addEventListener("click", ()=> 
    guardarFavoritas(button.getAttribute("data-id"))))
}


const imprimirFavoritas = () => {
    let favoritas = getLocalStorage("peliculasGuardadas") || [];
    let contenidoFavoritas = [];

     favoritas.forEach((peliculaData) => {
        let peli = new pelicula(peliculaData.id, peliculaData.image, peliculaData.title, peliculaData.rating, peliculaData.genre);
        console.log(peli);
        return (
            contenidoFavoritas.push(peli.generarCard(pelicula,false))
        )
    } )
    console.log(favoritas, contenidoFavoritas);
    imprimir("favoritas", `<h2>Tus películas guardadas</h2>`+ contenidoFavoritas);
    document.querySelectorAll(".eliminar-btn").forEach((button)=> button.addEventListener("click", ()=> 
        eliminarFavoritas(button.getAttribute("data-id"))))
}

imprimirPeliculas();
imprimirFavoritas();

/* FILTRADO POR GENERO */

document.querySelectorAll("#genero button").forEach(button => {
    button.addEventListener("click", filtrarPorGenero);
});

function filtrarPorGenero() {
    const botonSeleccionado = this.id;
    console.log(botonSeleccionado);

    let arrayFiltradoPorGenero = [];

    arrayFiltradoPorGenero = peliculas.filter(pelicula => pelicula.genre.includes(botonSeleccionado));
    
    imprimirPeliculas("peliculas", arrayFiltradoPorGenero);
    console.log(arrayFiltradoPorGenero);
}

/* AMPLIACIÓN */

document.querySelectorAll(".pelicula-link").forEach((enlace) => {
    enlace.addEventListener("click", (event) => {
        event.preventDefault();
        const idPelicula = enlace.dataset.id; 
        window.location.href = `ampliacion.html?id=${idPelicula}`;
    });
})

