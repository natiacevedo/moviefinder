class pelicula {
    constructor (id, image, title, rating, genre, year, description, imdb_link) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.rating = rating;
        this.genre = genre;
        this.year = year;
        this.description = description;
        this.imdb_link = imdb_link;
    }
    generarCard(pelicula, guardada) {
        return `
            <div class="col-sm-6 col-md-4 col-lg-3 mb-2">
                <div class="card d-flex flex-column justify-content-between p-3">
                    <a href="ampliacion.html?id=${this.id}" class="pelicula-link" data-id="${this.id}">
                            <img src="${this.image}" alt="Imagen de la pelìcula ${this.title}">
                            <h3 class="mt-2">${this.title}</h3>
                    </a>
                        <p>Rating: ${this.rating}</p>
                        ${guardada ? `<button type="button" id="guardar" class="guardar-btn btn btn-outline-light" data-id="${this.id}">Guardar</button>` 
                        :`<button type="button" id="eliminar" class="eliminar-btn btn btn-outline-light" data-id="${this.id}">Eliminar</button>`}
                    </div>
            </div>`
                
            }
}

export default pelicula;