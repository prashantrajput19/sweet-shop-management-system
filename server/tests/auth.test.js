import request from 'supertest';
import app from '../server.js';
import { connect, closeDatabase, clearDatabase } from './setup.js';
import mongoose from 'mongoose';

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('Auth Routes', () => {
    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'password123',
                    role: 'admin'
                });
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toHaveProperty('accessToken');
            expect(res.body.data).toHaveProperty('name', 'Test User');
        });

        it('should not register a user with existing email', async () => {
            await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'password123',
                    role: 'user'
                });

            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Test User 2',
                    email: 'test@example.com',
                    password: 'password123',
                    role: 'user'
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('message', 'User already exists');
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Login User',
                    email: 'login@example.com',
                    password: 'password123',
                    role: 'user'
                });
        });

        it('should login with valid credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'login@example.com',
                    password: 'password123'
                });
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toHaveProperty('accessToken');
        });

        it('should not login with invalid password', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'login@example.com',
                    password: 'wrongpassword'
                });
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toMatch(/Either email or password is incorrect/i);
        });
    });

    describe('GET /api/auth/user', () => {
        let token;

        beforeEach(async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Data User',
                    email: 'data@example.com',
                    password: 'password123',
                    role: 'user'
                });
            token = res.body.data.accessToken;
        });

        it('should get user data with valid token', async () => {
            const res = await request(app)
                .get('/api/auth/user')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toHaveProperty('email', 'data@example.com');
        });

        it('should return 401 if token is missing', async () => {
            const res = await request(app)
                .get('/api/auth/user');
            expect(res.statusCode).toBe(401);
        });
    });
});
