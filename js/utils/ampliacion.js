console.log(window.location.search);
let parametros = new URLSearchParams(window.location.search);
console.log(parametros.get("id"));
let idAmpliar = parametros.get("id");

const obtenerPeliculaAmpliada = (id) => {
    return fetch(`https://imdb-top-100-movies.p.rapidapi.com/${id}`, {
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

const imprimirPeliculaAmpliada = (pelicula) => {
    document.getElementById("nombre").textContent = pelicula.title; 
    document.getElementById("img").setAttribute("src", `${pelicula.image}`);
    document.getElementById("genero").textContent = pelicula.genre;
    document.getElementById("año").textContent = pelicula.year;
    document.getElementById("descripcion").textContent = pelicula.description;
    document.getElementById("trailer").setAttribute("href", pelicula.imdb_link);

}

obtenerPeliculaAmpliada(idAmpliar)
.then((data) => imprimirPeliculaAmpliada(data))