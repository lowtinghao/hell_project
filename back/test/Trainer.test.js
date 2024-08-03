const request = require('supertest');
const express = require('express');
const trainersRouter = require('../routes/Trainer');
const WorkshopController = require('../handlers/WorkshopController');

const app = express();
app.use(express.json());
app.use('/trainers', trainersRouter);

jest.mock('../handlers/WorkshopController');

describe('GET /trainers/workshops', () => {
    test('should respond with "Hello Trainer!" on GET /trainers/', async () => {
        const response = await request(app).get('/trainers/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello Trainer!');
    });

    /*

    test('should return a list of workshops assigned to a trainer', async () => {
        const mockWorkshops_output = [
            { id: 1, name: 'Workshop 1' },
            { id: 2, name: 'Workshop 2' }
        ];
        WorkshopController.getworkshopsAssignedToTrainer.mockResolvedValue(mockWorkshops_output);

        const response = await request(app)
            .get('/trainers/workshops')
            .send({ trainer_id: 1 });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockWorkshops_output);
    });

    test('should return an error if something goes wrong', async () => {
        const errorMessage = 'Something went wrong';
        const mockError = new Error(errorMessage);
        WorkshopController.getworkshopsAssignedToTrainer.mockRejectedValue(mockError);

        const response = await request(app)
            .get('/trainers/workshops')
            .send({ trainer_id: 1 });

        expect(response.status).toBe(201);
        expect(response.text).toEqual(errorMessage); // Check response.text for string error message
    });
    */


    test('should successfully return a list of all workshops', async () => {
        const mockWorkshops_output = [
            { id: 1, name: 'Workshop 1' },
            { id: 2, name: 'Workshop 2' }
        ];
        WorkshopController.getAllWorkshops.mockResolvedValue(mockWorkshops_output);

        const response = await request(app).get('/trainers/workshops');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockWorkshops_output);
    });

    test('should return an error if something goes wrong', async () => {
        const errorMessage = 'Something went wrong';
        const mockError = new Error(errorMessage);
        WorkshopController.getAllWorkshops.mockRejectedValue(mockError);

        const response = await request(app).get('/trainers/workshops');

        expect(response.status).toBe(201);
        expect(response.text).toEqual(`Unable to fetch workshops due to error: ${errorMessage}`); // Check response.text for string error message
    });
});