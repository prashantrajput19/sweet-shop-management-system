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

describe('Inventory Routes', () => {
    let adminToken;
    let userToken;
    let sweetId;

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

        // Create Sweet
        const sweetRes = await request(app)
            .post('/api/sweets')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                name: 'Test Sweet',
                price: 100,
                category: 'Test',
                description: 'Test Desc',
                stock: 10,
                image: 'img'
            });
        sweetId = sweetRes.body.data._id;
    });

    describe('POST /api/sweets/:id/purchase', () => {
        it('should purchase a sweet and decrease stock', async () => {
            const res = await request(app)
                .post(`/api/sweets/${sweetId}/purchase`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({ quantity: 2 });

            expect(res.statusCode).toBe(200);

            // Verify stock by fetching sweets list
            const listRes = await request(app)
                .get('/api/sweets')
                .set('Authorization', `Bearer ${userToken}`);
            const updatedSweet = listRes.body.data.find(s => s._id === sweetId);
            expect(updatedSweet).toHaveProperty('stock', 8);
        });

        it('should return error if insufficient stock', async () => {
            const res = await request(app)
                .post(`/api/sweets/${sweetId}/purchase`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({ quantity: 20 });

            expect(res.statusCode).toBe(400);
        });
    });

    describe('POST /api/sweets/:id/restock', () => {
        it('should restock a sweet', async () => {
            const res = await request(app)
                .post(`/api/sweets/${sweetId}/restock`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ stock: 20 }); // Corrected: send stock, not quantity

            expect(res.statusCode).toBe(200);

            // Verify
            const listRes = await request(app)
                .get('/api/sweets')
                .set('Authorization', `Bearer ${adminToken}`);
            const updatedSweet = listRes.body.data.find(s => s._id === sweetId);
            expect(updatedSweet).toHaveProperty('stock', 20);
        });
    });
});
