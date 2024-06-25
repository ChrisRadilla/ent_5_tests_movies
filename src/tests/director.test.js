const request = require('supertest')
const app = require('../app')

const director = {
    firstName: 'Tom',
    lastName: 'Shadyac',
    nationality: 'American',
    image: 'https://i.dailymail.co.uk/i/pix/2013/05/06/article-2320451-19A62D08000005DC-321_634x347.jpg',
    birthday: '1958-12-11'
}

const BASE_URL = '/api/v1/directors'

let directorId

//Create
test("POST -> 'BASE_URL', should return status code 201 and res.body.firstName === director.firstName", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(director)

    directorId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
});

//GetAll
test("GET -> 'BASE_URL', should return status code 200, res.body.length === 1 and res.body[0].firstName === director.firstName", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].firstName).toBe(director.firstName)
});

//GetOne
test("GET -> 'BASE_URL/:id', should return status code 200 and res.body.firstName === director.firstName", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${directorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
});

//Update
test("PUT ->  'BASE_URL/:id', should return status code 200 and res.body.firstName === directorUpdate.firstName", async () => {
    const directorUpdate = {
        firstName: 'Sam',
        lastName: 'Raimi',
        nationality: 'American',
        image: 'https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Flhte8nlpbzt11.jpg',
        birthday: '1959-10-23'
    }

    const res = await request(app)
        .put(`${BASE_URL}/${directorId}`)
        .send(directorUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)
});


//Delete
test("DELETE -> 'BASE_URL/:id' should return status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${directorId}`)

    expect(res.statusCode).toBe(204)
});