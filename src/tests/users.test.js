import app from '../app.js'
import request from 'supertest'

describe('GET /users', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/users').send()
        expect(response.statusCode).toBe(200)
    })
})

describe('GET /users/:query', () => {
    describe('get only one user', () => {
        test('should respond with status code 200', async () => {
            const query = 'ivan.armolla@gmail.com'
            const response = await request(app).get(`/users/${query}`).send()
            expect(response.statusCode).toBe(200)
        })
    })
})

describe('POST /users', () => {
    describe('given a new user', () => {
        test('should respond with a status code 204 ', async () => {
            const response = await request(app).post('/users')
                .set({ 'x-access-token': await getToken() })
                .send({
                    "name": "usernametest",
                    "lastname": "usernametest",
                    "salary": 330000,
                    "type": 1,
                    "email": `usernametest${Math.random(40, 800)}@gmail.com`,
                    "password": "Pa$$w0rd"
                })
            expect(response.statusCode).toBe(204)
        })
    })
    describe('when an email exists', () => {
        test('should respond with a status code 401 ', async () => {
            const response = await request(app).post('/users')
                .set({ 'x-access-token': await getToken() })
                .send({
                    "name": "melanie",
                    "lastname": "melanie",
                    "salary": 330000,
                    "type": 1,
                    "email": "randommail@gmail.com",
                    "password": "Pa$$w0rd"
                })
            expect(response.statusCode).toBe(401)
        })
    })
})

describe('DELETE /users/:id', () => {
    describe('delete user by the received id', () => {
        test('should respond with a status code 204', async () => {
            const response = await request(app).delete(`/users/${2}`).set({ 'x-access-token': await getToken() }).send()
            expect(response.statusCode).toBe(204)
        })
    })
})

describe('PUT /users', () => {
    describe('update user', () => {
        test('should respond with a status code 204', async () => {
            const response = await request(app).put('/users').set({ 'x-access-token': await getToken() }).send({
                "id": 32,
                "name": "test",
                "lastname": "test",
                "salary": 330000,
                "type": 1,
                "email": `test${Math.random(40, 800)}@gmail.com`,
                "password": "Pa$$w0rd"
            })
            expect(response.statusCode).toBe(204)
        })
    })
})

describe('PATCH /users', () => {
    describe('update only the properties received', () => {
        test('should respond with a status code 204', async () => {
            const response = await request(app).patch('/users').set({ 'x-access-token': await getToken() }).send({
                "id": 5,
                "name": "pablito",
                "lastname": "armolla",
                "salary": 125,
            })
            expect(response.statusCode).toBe(204)
        })
    })
})

const getToken = async () => {
    const { _body } = await request(app).post('/login').send({
        "email": "iarmolla1@hotmail.com",
        "password": "iarmolla1@hotmail.com"
    })
    return _body.token
}