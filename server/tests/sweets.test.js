import request from 'supertest';
import app from '../server.js';
import { connect, closeDatabase, clearDatabase } from './setup.js';

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('Sweets Routes', () => {
    let adminToken;
    let userToken;

    beforeEach(async () => {
        // Register Admin
        const adminRes = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'password123',
                role: 'admin'
            });
        adminToken = adminRes.body.data.accessToken;

        // Register User
        const userRes = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Normal User',
                email: 'user@example.com',
                password: 'password123',
                role: 'user'
            });
        userToken = userRes.body.data.accessToken;
    });

    describe('POST /api/sweets', () => {
        it('should create a new sweet if admin', async () => {
            const res = await request(app)
                .post('/api/sweets')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    name: 'Kaju Katli',
                    price: 500,
                    category: 'Milk Sweets',
                    description: 'Delicious yummy sweet',
                    stock: 100,
                    image: 'https://example.com/kaju.jpg'
                });
            expect(res.statusCode).toBe(200); // Changed to 200
            expect(res.body.data).toHaveProperty('name', 'Kaju Katli');
        });
    });

    describe('GET /api/sweets', () => {
        it('should get all sweets', async () => {
            await request(app)
                .post('/api/sweets')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    name: 'Laddu',
                    price: 200,
                    category: 'Traditional',
                    description: ' Round',
                    stock: 50,
                    image: 'img'
                });

            const res = await request(app)
                .get('/api/sweets')
                .set('Authorization', `Bearer ${userToken}`);
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data.length).toBeGreaterThan(0);
        });
    });

    describe('GET /api/sweets/search', () => {
        it('should search sweets by name', async () => {
            await request(app)
                .post('/api/sweets')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    name: 'Gulab Jamun',
                    price: 300,
                    category: 'Syrup',
                    description: 'Sweet',
                    stock: 50,
                    image: 'img'
                });

            const res = await request(app)
                .get('/api/sweets/search?q=Gulab') // Changed query to q
                .set('Authorization', `Bearer ${userToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.data[0]).toHaveProperty('name', 'Gulab Jamun');
        });
    });
});
