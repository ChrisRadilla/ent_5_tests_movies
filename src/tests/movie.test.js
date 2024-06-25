require('../models')
const request = require('supertest')
const app = require('../app')

const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')

const movie = {
    name: 'Ace Ventura',
    image: 'https://resizing.flixster.com/XWKAuKM9PjgcSLnNEmJfKztmk38=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p15388_v_h9_ar.jpg',
    synopsis: 'Pet detective....',
    releaseYear: 1994
}

const BASE_URL = '/api/v1/movies'

let movieId

let actor
let director
let genre

afterAll(async () => {
    await actor.destroy()  //deleting actor at the end
    await director.destroy()  //deleting director at the end
    await genre.destroy()  //deleting genre at the end
})

//Create
test("POST -> 'BASE_URL', should return status code 201 and res.body.name === movie.name", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(movie)

    movieId = res.body.id

    //console.log(res.body)
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});

//GetAll
test("GET -> 'BASE_URL', should return status code 200, res.body.length = 1 and res.body[0].name === movie.name", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].name).toBe(movie.name)
});

//GetOne
test("GET -> 'BASE_URL/:id', should return status code 200 and res.body.name === movie.name", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${movieId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});

//Update
test("PUT ->  'BASE_URL/:id', should return status code 200 and res.body.name === movieUpdate.name", async () => {
    const movieUpdate = {
        name: 'The Batman',
        image: 'https://i.blogs.es/638a6a/the-batman-movie-review/1366_2000.jpg',
        synopsis: 'batman saving gotham',
        releaseYear: 2022
    }

    const res = await request(app)
        .put(`${BASE_URL}/${movieId}`)
        .send(movieUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)
});

//SetActor
test("POST -> 'BASE_URL/:id/actors', should return status code 200 and res.body.length = 1", async () => {

    actor = await Actor.create({
        firstName: 'Robert',
        lastName: 'Pattinson',
        nationality: 'English',
        image: 'https://miro.medium.com/v2/resize:fit:1033/1*K183PmgCVnuBdI74s4kHBw.png',
        birthday: '1986-05-13'
    })

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/actors`)
        .send([actor.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].movieActor.movieId).toBeDefined()
    expect(res.body[0].movieActor.movieId).toBe(movieId)

    expect(res.body[0].movieActor.actorId).toBeDefined()
    expect(res.body[0].movieActor.actorId).toBe(actor.id)
});

//SetDirector
test("POST -> 'BASE_URL/:id/directors', should return status code 200 and res.body.length = 1", async () => {
    director = await Director.create({
        firstName: 'Matt',
        lastName: 'Reeves',
        nationality: 'American',
        image: 'https://www.koimoi.com/wp-content/new-galleries/2021/07/robert-pattinson-doesnt-want-to-work-with-the-batman-director-matt-reeves-again-001.jpg',
        birthday: '1966-04-27'
    })

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/directors`)
        .send([director.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].movieDirector.movieId).toBeDefined()
    expect(res.body[0].movieDirector.movieId).toBe(movieId)
    
    expect(res.body[0].movieDirector.directorId).toBeDefined()
    expect(res.body[0].movieDirector.directorId).toBe(director.id)
});

//SetGenre
test("POST -> 'BASE_URL/:id/genres', should return status code 200 and res.body.length = 1",  async() => {
    genre = await Genre.create({
        name: 'Action'
    })

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/genres`)
        .send([genre.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].movieGenre.movieId).toBeDefined()
    expect(res.body[0].movieGenre.movieId).toBe(movieId)

    expect(res.body[0].movieGenre.genreId).toBeDefined()
    expect(res.body[0].movieGenre.genreId).toBe(genre.id)
});

//Delete
test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${movieId}`)

    expect(res.statusCode).toBe(204)
});