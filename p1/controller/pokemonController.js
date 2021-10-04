var pokeModel = require('../model/pokemonModel')

exports.getPokemonInformations = (req, res) => {
    console.log(req.body)
    const pokemon = req.body.conversation.memory.pokemon;
    let pokemonInfos = pokeModel.findPokemonByName(pokemon.value);
    if (!pokemonInfos) {
        res.json({
            replies: [
                {
                    type: "error",
                    content: `no conozco el pokemon llamado ${pokemon} :(`,
                },
            ],
        });
    } else {
        let pokeEvo=pokemonInfos.evo;
        pokemonInfos=pokemonInfos.data;
        console.log("no hizo nada")
        res.json({
            replies: [
                { type: "Nombre", content: `*${pokemonInfos.name}*` },
                {
                    type: "Tipo",
                    content: `${pokemonInfos.types.join(" y ")}`,
                },
                {
                    type: "Altura",
                    content: `${pokemonInfos.height}`,
                },
                {
                    type: "Peso",
                    content: `${pokemonInfos.weight}`,
                },
                {
                    type: "Experiencia base:",
                    content: `${pokemonInfos.base_experience}`,
                },
                { type: "Descripción", content: pokemonInfos.description },
                { type: "Imagen", content: pokemonInfos.image },
            ],
            evolutions:pokeEvo
        });
    }
};

exports.getPokemonEvolutions = (req, res) => {
    const pokemon = req.body.conversation.memory.pokemon;
    const pokemonInfos = pokeModel.findPokemonByName(pokemon.value);
    if (!pokemonInfos) {
        res.json({
            replies: [
                {
                    type: "text",
                    content: `no conozco el pokemon llamado ${pokemon} :(`,
                },
            ],
        });
    } else if (pokemonInfos.evolutions.length === 1) {
        res.json({
            replies: [
                { type: "text", content: `${pokemonInfos.name} has no evolutions.` },
            ],
        });
    } else {
        res.json({
            replies: [
                { type: "text", content: `${pokemonInfos.name} family` },
                {
                    type: "text",
                    content: pokemonInfos.evolutions

                },
                {
                    type: "card",
                    content: {
                        title: "Ver mas de este",
                        buttons: pokemonInfos.evolutions
                            .filter((p) => p.id !== pokemonInfos.id) // Remove initial pokemon from list
                            .map((p) => ({
                                type: "postback",
                                title: p.name,
                                value: `Dime mas de ${p.name}`,
                            })),
                    },
                },
            ],
        });
    }
};

exports.getPokemonTypes = (req, res) => {
    const pokemon = req.body.conversation.memory.pokemon;
    const pokemonInfos = pokeModel.getPokemonTypes(pokemon.value);
    if (pokemonInfos) {
        res.json({
            replies: [
                {
                    type: "text",
                    content: pokemonInfos,
                },
            ],
        });
    } 
    else {
        res.json({
            replies: [
                { type: "text", content: `${pokemon} no tiene de base de experiencia ${pokemonInfos.types}` },
                {
                    type: "text",
                    content: pokemonInfos.types

                },
                {
                    type: "card",
                    content: {
                        title: "Ver mas de este",
                        buttons: pokemonInfos.types
                    },
                },
            ],
        });
    }
};


exports.getPokemonExperience = (req, res) => {
    let min = req.body.conversation.memory.pokemon.valueMin;
    let max = req.body.conversation.memory.pokemon.valueMax;
    const pokemonInfos = pokeModel.getPokemonExperience(min, max);
    if (pokemonInfos) {
        res.json({
            replies: [
                {
                    type: "text",
                    content: pokemonInfos,
                },
            ],
        });
    } 
    else {
        res.json({
            replies: [
                { type: "text", content: `${pokemon} no tiene de base de experiencia ${pokemonInfos.base_experience}` },
                {
                    type: "text",
                    content: pokemonInfos.base_experience

                },
                {
                    type: "card",
                    content: {
                        title: "Ver mas de este",
                        buttons: pokemonInfos.base_experience
                    },
                },
            ],
        });
    }
};

exports.getPokemonHeight = (req, res) => {
    const pokemon = req.body.conversation.memory.pokemon;
    const pokemonInfos = pokeModel.getPokemonHeight(pokemon.value);
    if (pokemonInfos) {
        res.json({
            replies: [
                {
                    type: "text",
                    content: pokemonInfos,
                },
            ],
        });
    } 
    else {
        res.json({
            replies: [
                { type: "text", content: `${pokemon} no tiene de base de experiencia ${pokemonInfos.height}` },
                {
                    type: "text",
                    content: pokemonInfos.height

                },
                {
                    type: "card",
                    content: {
                        title: "Ver mas de este",
                        buttons: pokemonInfos.height
                    },
                },
            ],
        });
    }
};

exports.getPokemonWeight = (req, res) => {
    const pokemon = req.body.conversation.memory.pokemon;
    const pokemonInfos = pokeModel.getPokemonWeight(pokemon.value);
    if (pokemonInfos) {
        res.json({
            replies: [
                {
                    type: "text",
                    content: pokemonInfos,
                },
            ],
        });
    } 
    else {
        res.json({
            replies: [
                { type: "text", content: `${pokemon} no tiene de base de experiencia ${pokemonInfos.weight}` },
                {
                    type: "text",
                    content: pokemonInfos.weight

                },
                {
                    type: "card",
                    content: {
                        title: "Ver mas de este",
                        buttons: pokemonInfos.weight
                    },
                },
            ],
        });
    }
};

