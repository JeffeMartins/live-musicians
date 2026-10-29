const Dev = require('../models/Dev');
const ParseStringAsArray = require('./../utils/ParseStringAsArray');

module.exports = {
    async index(request, response) {

        const {latitude, longitude, techs} = request.query;

        const techsArray = ParseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: require('../utils/validateCoordinates')(latitude, longitude),
                    },
                    $maxDistance: 10000,
                }
            }
        })

        return response.json({devs});
    }
}
