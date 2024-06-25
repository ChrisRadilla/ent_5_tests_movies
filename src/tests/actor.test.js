const request = require('supertest')
const app = require('../app')

const actor = {
    firstName: 'Jim ',
    lastName: 'Carrey',
    nationality: 'Canadian',
    image: 'https://cdn.britannica.com/86/200586-050-F88ED9BA/Jim-Carrey-Cameron-Diaz-The-Mask.jpg',
    birthday: '1962-01-17'
}

const BASE_URL = '/api/v1/actors'

let actorId

//Create
test("POST -> 'BASE_URL', should return status code 201 and res.body.firstName === actor.firstName", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(actor)
    actorId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});

//GetAll
test("GET -> 'BASE_URL', should return status code 200, res.body[0].firstName === actor.firstName and res.body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].firstName).toBe(actor.firstName)
});

//GetOne
test("GET -> 'BASE_URL/:id', should return status code 200 and res.body.firstName === actor.firstName", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${actorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});

//Update
test("PUT -> 'BASE_URL/:id', should return status code 200 and res.body.firstName === actorUpdate.firstName", async() => {
    const actorUpdate = {
        firstName: 'Tobey',
        lastName: 'Maguire',
        nationality: 'American',
        image: 'https://i.blogs.es/d9b845/tobey-maguire-spidermna-no-way-home/1366_2000.jpeg',
        birthday: '1975-06-27'
    }

    const res = await request(app)
        .put(`${BASE_URL}/${actorId}`)
        .send(actorUpdate)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
});

//Delete
test("DELETE -> 'BASE_URL/:id', should return status code 204", async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${actorId}`)

    expect(res.statusCode).toBe(204)
});