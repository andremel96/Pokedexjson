'use strict';
const db = require("../../p1/public/pokedex.json");

exports.findPokemonByName = (name) => {
    const data = db.find((p) => p.name.toLowerCase() === name.toLowerCase());
    let evolutions = [];
    if (data) {
        data.evolutions.forEach((e) => {
            let evo = db.find((p) => (p.id === e.id));
            evolutions.push({ name: evo.name, image: evo.image });
        })
    }
    if (!data) {
        return null;
    }
    return { data: data, evo: evolutions };
}

exports.getPokemonTypes = (types) => {
    const data = db.filter((p) => p.types.includes(types));
    console.log(data);
    if (!data) {
        return null;
    }
    return data;
}



exports.getPokemonExperience = (min, max) => {
    let data = db.filter(item => (min >= parseInt(item.base_experience, 10) && parseInt(item.base_experience, 10) <= max))
    console.log(data);
    if (!data) {
        return null;
    }
    return data;
}



exports.getPokemonHeight = (test) => {
    let data = db.sort(dynamicSort("-height"))
    if (!data) {
        return null;
    }
    return data;
}




exports.getPokemonWeight = (test) => {
    let data = db.sort(dynamicSort("-weight"))
    console.log(data);
    if (!data) {
        return null;
    }
    return data;
}


function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        let aProperty = parseInt(a[property])
        let bProperty = parseInt(b[property])
        var result = (aProperty < bProperty) ? -1 : (aProperty > bProperty) ? 1 : 0;
        return result * sortOrder;
    }
}