const Movie = require('./Movie');
const Actor = require('./Actor');
const Director = require('./Director');
const Genre = require('./Genre');




Movie.belongsToMany(Actor , {through : 'movieActor'})
Actor.belongsToMany(Movie , {through : 'movieActor'})

Movie.belongsToMany(Director, {through : 'movieDirector'})
Director.belongsToMany(Movie, {through : 'movieDirector'})

Genre.belongsToMany(Movie, {through : 'movieGenre'})
Movie.belongsToMany(Genre, {through : 'movieGenre'})
