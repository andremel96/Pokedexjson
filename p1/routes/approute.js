'use strict';
var pokeController = require('../controller/pokemonController')

module.exports = function (app) {
    app.route('/pokemon-informations')
        .post(pokeController.getPokemonInformations)

    app.route('/pokemon-evolutions')
        .post(pokeController.getPokemonEvolutions)

    app.route('/pokemon-base_experience')
        .post(pokeController.getPokemonExperience)

    app.route('/pokemon-height')
        .post(pokeController.getPokemonHeight)

    app.route('/pokemon-weight')
        .post(pokeController.getPokemonWeight)

    app.route('/errors')
        .post(function (req, res) {
            console.error(req.body, res);
            res.sendStatus(200);
        });

    app.route('/pokemon-types')
        .post(pokeController.getPokemonTypes)

}
