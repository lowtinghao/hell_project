const request = require('supertest');
const express = require('express');
const clientRouter = require('../routes/Client');
const WorkshopController = require('../handlers/WorkshopController');

// Set up the Express app
const app = express();
app.use(express.json());
app.use('/client', clientRouter);

// Mock WorkshopController methods
jest.mock('../handlers/WorkshopController');
const { getWorkshopsById, submitWorkshopRequest } = WorkshopController;

// Reset mocks before each test
beforeEach(() => {
    jest.resetAllMocks();
});

describe('Client Routes', () => {
    test('should respond with "Hello Client!" on GET /client', async () => {
        const response = await request(app).get('/client/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello Client!');
    });

    test('should fetch workshops and respond with data on GET /client/workshops', async () => {
        // Mock the implementation of getWorkshopsById
        WorkshopController.getWorkshopsByClientId.mockResolvedValueOnce([{ id: 1, name: 'Workshop 1' }]);

        const response = await request(app)
            .get('/client/workshops')
            .send({ client_id: 1 });

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, name: 'Workshop 1' }]);
        expect(WorkshopController.getWorkshopsByClientId).toHaveBeenCalledWith(1);
    });

    test('should handle errors when fetching workshops on GET /client/workshops', async () => {
        // Mock the implementation of getWorkshopsById to reject with an error
        WorkshopController.getWorkshopsByClientId.mockRejectedValueOnce(new Error());

        const response = await request(app)
            .get('/client/workshops')
            .send({ client_id: 123 });

        expect(response.status).toBe(201);
        expect(response.text).toBe('Unable to fetch workshops');
    });

    test('should submit a workshop request and respond with success on POST /client/workshops', async () => {
        // Mock the implementation of submitWorkshopRequest
        WorkshopController.submitWorkshopRequest.mockResolvedValueOnce();

        const response = await request(app)
            .post('/client/workshops')
            .send({ name: 'New Workshop' });

        expect(response.status).toBe(201);
        expect(response.text).toBe('Successful Post Request to Workshops');
        expect(WorkshopController.submitWorkshopRequest).toHaveBeenCalled();
    });

    test('should handle errors when submitting a workshop request on POST /client/workshops', async () => {
        // Mock the implementation of submitWorkshopRequest to reject with an error
        WorkshopController.submitWorkshopRequest.mockRejectedValueOnce(new Error());

        const response = await request(app)
            .post('/client/workshops')
            .send({ name: 'New Workshop' });

        expect(response.status).toBe(500);
        expect(response.text).toBe('Failed Post Request to Workshops');
    });
});