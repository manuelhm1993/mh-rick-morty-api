// ------------------ Funciones
//
// ------------------ Spinner de carga
const loading = (estado) => {
    const spinner = document.querySelector('.container .cargando');

    if(estado) {
        // Mostrar el spinner de carga
        spinner.classList.remove('d-none');
    }
    else {
        // Ocultar el spinner de carga
        spinner.classList.add('d-none');
    }
};

// ------------------ Interferir el DOM con la data
const manipularData = (data) => {
    const characters = data.results;

    console.table(characters, ['id', 'name', 'species', 'image', 'url']);

    const seccionCards = document.querySelector('#cards-dinamicas');
    const seccionCardsTemplate = document.querySelector('#card-dinamica-tamplate').content;
    const fragmentCards = document.createDocumentFragment();

    seccionCards.textContent = '';

    characters.forEach(character => {
        const clonSeccionCardsTemplate = seccionCardsTemplate.cloneNode(true);

        clonSeccionCardsTemplate.querySelector('.card .card-img-top').src = character.image;
        clonSeccionCardsTemplate.querySelector('.card .card-body .card-title').textContent = character.name;
        clonSeccionCardsTemplate.querySelector('.card .card-body p.lead').textContent = character.species;
        clonSeccionCardsTemplate.querySelector('.card .card-body .btn.btn-primary').href = character.url;

        fragmentCards.appendChild(clonSeccionCardsTemplate);
    });

    seccionCards.appendChild(fragmentCards);

    // Operador de fusión null
    previous.href = (data.info.prev) ?? '#';
    next.href = (data.info.next) ?? '#';
};

// ------------------ Petición a la API de Rick y Morty
const renderCards = async (url) => {
    try {
        loading(true);

        const res = await fetch(url);
        const data = await res.json();
        
        manipularData(data);
    } catch (error) {
        console.log(error);
    } finally {
        loading(false);
    }
};

// ------------------ Paginar
const paginar = () => {
    
};

// Delegación de eventos
//
// ------------------ Cargar el DOM
document.addEventListener('DOMContentLoaded', (e) => {
    // URL de la API
    const url = 'https://rickandmortyapi.com/api/character';

    renderCards(url);
});
