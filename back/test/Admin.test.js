const request = require('supertest');
const express = require('express');
const adminRouter = require('../routes/Admin');

// Set up the Express app
const app = express();
app.use(express.json());
app.use('/admin', adminRouter);

// Mock TrainerController.createTrainer
jest.mock('../handlers/TrainerController');
const TrainerController = require('../handlers/TrainerController');
const { createTrainer } = TrainerController;

// Reset mocks before each test
beforeEach(() => {
    jest.resetAllMocks();
});

describe('Admin Routes', () => {
    test('should respond with "Hello Admin!" on GET /admin', async () => {
        const response = await request(app).get('/admin/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello Admin!');
    });

    test('should create a trainer and respond with "Success" on POST /admin/trainers', async () => {
        // Mock the implementation of createTrainer
        createTrainer.mockResolvedValueOnce();

        const response = await request(app)
            .post('/admin/trainers')
            .send({ name: 'John Doe', expertise: 'Coding' });

        expect(response.status).toBe(200);
        expect(response.text).toBe('Success');
        expect(createTrainer).toHaveBeenCalledWith({
            name: 'John Doe',
            expertise: 'Coding',
            assigned_trainers: []
        });
    });

    test('should respond with an error message if createTrainer fails', async () => {
        // Mock the implementation of createTrainer to reject with an error
        var error_msg = 'Failed to create trainer'
        createTrainer.mockRejectedValueOnce(new Error(error_msg));

        const response = await request(app)
            .post('/admin/trainers')
            .send({ name: 'Jane Doe', expertise: 'Cooking' });

        expect(response.status).toBe(500);
        expect(response.text).toBe(`Error: ${error_msg}`);
    });
});
