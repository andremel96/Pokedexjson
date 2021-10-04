const url = 'http://localhost:5000/';
var arrayGenres = [];


const fillObject = (obj) => {
    return {
        conversation: {
            memory: {
                pokemon: obj
            }
        }

    }
}

const generateRequest = (value, path, requestType) => {
    return fetch(url + path, {
        method: requestType,
        body: JSON.stringify(fillObject(value)),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
}


const getPokemonInformations = () => {
    const pokename = document.getElementById("pokename");
    let pokemonName = pokename.value;
    if (pokemonName) {
        generateRequest(
            { value: pokemonName },
            'pokemon-informations',
            'POST')
            .then((res) => res.json())
            .then((data) => {
                generateTable(data)
            });
    } else {
        alert('Llenar el campo de busqueda')
    }
}

const generateTable = (data) => {
    const table = document.getElementById("descripciones");
    table.innerHTML = "";
    const img = document.getElementById("pokeImage");
    data.replies.forEach(e => {
        let type = e.type;
        if (type === 'error') {
            alert('pokemon no encontrado')
        } else {
            let row = table.insertRow();
            let date = row.insertCell(0);
            date.innerHTML = type;
            let name = row.insertCell(1);
            name.innerHTML = e.content;
            if (type === 'Imagen') {
                img.src = e.content;
            }
        }
    })
    fillEvolutions(data);
}

const fillEvolutions=(data)=>{
    if(data.evolutions){
        const evo = document.getElementById("evo");
        data.evolutions.forEach((e)=>{
            let div= document.createElement('div');
            div.className="column";
            let img= document.createElement('img');
            img.src=e.image;
            div.appendChild(img);
            let h3= document.createElement('h3');
            h3.className='black-back';
            h3.innerHTML=e.name;
            div.appendChild(h3);
            evo.appendChild(div);
        })
    }
}

const createMovieCard = (pokemon) => {
    let div = document.createElement('div')
    let img = document.createElement('img')
    let span = document.createElement('span');
    let spanDate = document.createElement('span');
    spanDate.innerHTML = pokemon.base_experience;
    span.innerHTML = pokemon.name + "<br/>";
    span.classList.add('movie__title');
    div.classList.add('movie__card');
    spanDate.classList.add('movie_date');
    img.src = pokemon.image;
    img.classList.add('movie__image');
    div.appendChild(img);
    div.appendChild(span);
    div.appendChild(spanDate);
    return div
}


const getPokemonTypes = () => {
    const pokeType = document.getElementById("pokeType");
    let pokemonType = pokeType.value;
    if (pokemonType) {
        generateRequest(
            { value: pokemonType },
            'pokemon-types',
            'POST')
            .then((res) => res.json())
            .then((data) => {
                generateTableFilter(data)
            });
    } else {
        alert('Llenar el campo de busqueda')
    }

}

const generateTableFilter = (data) => {
    const table = document.getElementById("pokefilter");
    table.innerHTML = "";
    data.replies[0].content.forEach(e => {
        let row = table.insertRow();
        let date = row.insertCell(0);
        let img= document.createElement('img');
        img.src=e.image;
        date.appendChild(img)
        let name = row.insertCell(1);
        name.innerHTML = e.name;
        let description = row.insertCell(2);
        description.innerHTML = e.description;
        let base_experience = row.insertCell(3);
        base_experience.innerHTML = e.base_experience;
        let height = row.insertCell(4);
        height.innerHTML = e.height;
        let weight = row.insertCell(5);
        weight.innerHTML = e.weight;
    })
}



const fechtPokemonExperience = () => {
    const minVal = document.getElementById("minVal").value;
    const maxVal = document.getElementById("maxVal").value;
    if (minVal&& maxVal) {
        generateRequest(
            { valueMin: minVal, valueMax: maxVal },
            'pokemon-base_experience',
            'POST')
            .then((res) => res.json())
            .then((data) => {
                generateTableFilter(data)
            });
    } else {
        alert('Termine de llenar los input')
    }
}

const fechtPokemonHeight = () => {
    fetch('http://localhost:5000/')
    generateRequest(
        { valueMin: minVal, valueMax: maxVal },
        'pokemon-height',
        'POST')
        .then((res) => res.json())
        .then((data) => {
            generateTableFilter(data)
        });
}

const fechtPokemonWeight = () => {
    //pokemon-weight
    generateRequest(
        { valueMin: minVal, valueMax: maxVal },
        'pokemon-weight',
        'POST')
        .then((res) => res.json())
        .then((data) => {
            generateTableFilter(data)
        });
}