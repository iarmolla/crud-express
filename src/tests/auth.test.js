import app from '../app.js'
import request from 'supertest'
import { expect, jest, test } from '@jest/globals';

describe('POST /login', () => {
    test('should respond with a status code 200', async () => {
        const response = await request(app).post('/login').send({
            "email": "davinci@gmail.com",
            "password": "Pa$$w0rd"
        })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
    })
})

describe('POST /register', () => {
    describe('create a new user', () => {
        test('should respond with a status code 200', async () => {
            const response = await request(app).post('/register').send({
                "name": "fesf",
                "lastname": "fsfse",
                "salary": 3432,
                "type": 0,
                "email": `fe${Math.random(40, 800)}@gmail.com`,
                "password": "Pa$$w0rd"
            })
            expect(response.statusCode).toBe(200)
            expect(response.body).toBeInstanceOf(Object)
        })
    })
})

