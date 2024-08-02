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
jest.mock('../handlers/WorkshopController');
const WorkshopController = require('../handlers/WorkshopController');

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

    test('should successfully respond with list of all workshops on GET /admin/workshops', async () => {
        const mockedWorkshops_output = [{ id: 1, name: 'Workshop 1' }, { id: 2, name: 'Workshop 2' }];
        WorkshopController.getAllWorkshops.mockResolvedValueOnce(mockedWorkshops_output);

        const response = await request(app).get('/admin/workshops');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockedWorkshops_output);
    });

    test('should result in error on GET /admin/workshops due to mocked error', async () => {
        WorkshopController.getAllWorkshops.mockRejectedValueOnce(new Error());

        const response = await request(app).get('/admin/workshops');

        expect(response.status).toBe(201);
        expect(response.text).toBe("Unable to fetch workshops");
    });

    test('should successfully respond with workshops by id on GET /admin/workshops/:workshop_id', async () => {
        const input_id = 2;
        const mockedWorkshops_output = { id: input_id, name: 'Workshop 1' };
        WorkshopController.getWorkshopByWorkshopId.mockResolvedValueOnce(mockedWorkshops_output);

        const response = await request(app).get(`/admin/workshops/${input_id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockedWorkshops_output);
    });

    test('should result in error on GET /admin/workshops/:workshop_id due to mocked error', async () => {
        WorkshopController.getWorkshopByWorkshopId.mockRejectedValueOnce(new Error());
        const input_id = 2;
        const response = await request(app).get(`/admin/workshops/${input_id}`);

        expect(response.status).toBe(201);
        expect(response.text).toBe("Unable to fetch workshops");
    });

    test('should successfully replace workshop by id on POST /admin/workshops/:workshop_id', async () => {
        const input_id = 2;
        WorkshopController.replaceWorkshopByWorkshopId.mockResolvedValueOnce();

        const response = await request(app)
            .post(`/admin/workshops/${input_id}`)
            .send({ name: 'Updated Workshop' });

        expect(response.status).toBe(200);
        expect(response.text).toBe("Success");
    });

    test('should result in error on POST /admin/workshops/:workshop_id due to mocked error', async () => {
        errorMessage = "Unable to replace workshop by id";
        WorkshopController.replaceWorkshopByWorkshopId.mockRejectedValueOnce(new Error(errorMessage));
        const input_id = 2;

        const response = await request(app)
            .post(`/admin/workshops/${input_id}`)
            .send({ name: 'Updated Workshop' });

        expect(response.status).toBe(201);
        expect(response.text).toBe(errorMessage);
    });

    test('should successfully respond with list of all trainers on GET /admin/trainers', async () => {
        const mockedTrainers_output = [{ id: 1, name: 'Trainer 1' }, { id: 2, name: 'Trainer 2' }];
        TrainerController.getAllTrainers.mockResolvedValueOnce(mockedTrainers_output);

        const response = await request(app).get('/admin/trainers');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockedTrainers_output);
    });

    test('should result in error on GET /admin/trainers due to mocked error', async () => {
        errorMessage = "Unable to fetch trainers";
        TrainerController.getAllTrainers.mockRejectedValueOnce(new Error(errorMessage));

        const response = await request(app).get('/admin/trainers');

        expect(response.status).toBe(201);
        expect(response.text).toBe(errorMessage);
    });

    test('should successfully respond with trainer by id on GET /admin/trainers/:trainer_id', async () => {
        const input_id = 1;
        const mockedTrainer_output = { id: input_id, name: 'Trainer 1' };
        TrainerController.getTrainerById.mockResolvedValueOnce(mockedTrainer_output);

        const response = await request(app).get(`/admin/trainers/${input_id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockedTrainer_output);
    });

    test('should result in error on GET /admin/trainers/:trainer_id due to mocked error', async () => {
        errorMessage = "Unable to fetch trainer by id";
        TrainerController.getTrainerById.mockRejectedValueOnce(new Error(errorMessage));
        const input_id = 1;

        const response = await request(app).get(`/admin/trainers/${input_id}`);

        expect(response.status).toBe(201);
        expect(response.text).toBe(errorMessage);
    });

    test('should successfully replace trainer by id on POST /admin/trainers/:trainer_id', async () => {
        const input_id = 1;
        TrainerController.replaceTrainerbyTrainerId.mockResolvedValueOnce();

        const response = await request(app)
            .post(`/admin/trainers/${input_id}`)
            .send({ name: 'Updated Trainer' });

        expect(response.status).toBe(200);
        expect(response.text).toBe("Success");
    });

    test('should result in error on POST /admin/trainers/:trainer_id due to mocked error', async () => {
        errorMessage = "Unable to replace trainer by id";
        TrainerController.replaceTrainerbyTrainerId.mockRejectedValueOnce(new Error(errorMessage));
        const input_id = 1;

        const response = await request(app)
            .post(`/admin/trainers/${input_id}`)
            .send({ name: 'Updated Trainer' });

        expect(response.status).toBe(201);
        expect(response.text).toBe(errorMessage);
    });

    test('should successfully create a trainer on POST /admin/trainers', async () => {
        TrainerController.createTrainer.mockResolvedValueOnce();

        const response = await request(app)
            .post('/admin/trainers')
            .send({ name: 'New Trainer' });

        expect(response.status).toBe(200);
        expect(response.text).toBe("Success");
    });

    test('should result in error on POST /admin/trainers due to mocked error', async () => {
        errorMessage = "Unable to create a trainer";
        TrainerController.createTrainer.mockRejectedValueOnce(new Error(errorMessage));

        const response = await request(app)
            .post('/admin/trainers')
            .send({ name: 'New Trainer' });

        expect(response.status).toBe(500);
        expect(response.text).toBe(errorMessage);
    });
});
