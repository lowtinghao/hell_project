const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const {TrainerController, Trainer} = require('../handlers/TrainerController');

describe('TrainerController', () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    afterEach(async () => {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
        jest.restoreAllMocks();
    });

    describe('parseNewTrainerRequest', () => {
        test('should parse the request body correctly', () => {
            const req = { body: { trainer_name: 'John Doe', trainer_id: 1 } };
            const parsedRequest = TrainerController.parseNewTrainerRequest(req);
            expect(parsedRequest).toEqual(req.body);
        });
    });

    describe('getLargestTrainerId', () => {
        test('should return 0 if there are no trainers', async () => {
            const largestTrainerId = await TrainerController.getLargestTrainerId();
            expect(largestTrainerId).toBe(0);
        });

        test('should return the largest trainer ID', async () => {
            //setting up
            await Trainer.create({trainer_id: 1, trainer_name: 'Trainer1' });
            await Trainer.create({ trainer_id: 3,  trainer_name: 'Trainer2' } );
            await Trainer.create({ trainer_id: 2,  trainer_name: 'Trainer3' } );

            //testing
            const largestTrainerId = await TrainerController.getLargestTrainerId();
            expect(largestTrainerId).toBe(3);
        });

        test('should throw an error if there is an issue with the database query', async () => {
            const errorMsg = 'Mocked error';
    
            jest.spyOn(Trainer, 'find').mockImplementationOnce(() => {
                throw new Error(errorMsg);
            });
    
            await expect(TrainerController.getLargestTrainerId()).rejects.toThrow(errorMsg);
        });
    });

    describe('createTrainer', () => {
        beforeEach(() => {
            jest.spyOn(TrainerController, 'parseNewTrainerRequest').mockImplementation((req) => {
                return { trainer_name: 'John Doe', trainer_id: 1 };
            });
            jest.spyOn(TrainerController, 'getLargestTrainerId').mockImplementation(async () => {
                return 0;
            });
        });

        test('should create a new trainer', async () => {
            const req = { trainer_name: 'John Doe', trainer_id: 1 };
            await TrainerController.createTrainer(req);
            const trainer = await Trainer.findOne({ trainer_name: 'John Doe' });
            expect(trainer).toBeTruthy();
            expect(trainer.trainer_id).toBe(1);
        });

        test('should throw an error if there is an issue with creating the trainer', async () => {
            jest.spyOn(Trainer, 'create').mockImplementation(() => {
                throw new Error('Mocked error');
            });

            const req = { trainer_name: 'John Doe', trainer_id: 1 };
            await expect(TrainerController.createTrainer(req)).rejects.toThrow('Mocked error');
        });

        test('should throw an error if there is an issue with getLargestTrainerId', async () => {
            jest.spyOn(TrainerController, 'getLargestTrainerId').mockImplementation(() => {
                throw new Error('Mocked error');
            });

            const req = { trainer_name: 'John Doe', trainer_id: 1 };
            await expect(TrainerController.createTrainer(req)).rejects.toThrow('Mocked error');
        });
    });

    describe('deleteTrainer', () => {
        test('should delete the trainer', async () => {
            await Trainer.create({ trainer_name: 'John Doe', trainer_id: 1 });
            await TrainerController.deleteTrainer(1);
            const trainer = await Trainer.findOne({ trainer_id: 1 });
            expect(trainer).toBeNull();
        });

        test('should throw an error if there is an issue with deleting the trainer', async () => {
            jest.spyOn(Trainer, 'deleteOne').mockImplementation(() => {
                throw new Error('Mocked error');
            });
            await expect(TrainerController.deleteTrainer(1)).rejects.toThrow('Mocked error');
        });
    });

    describe('getAllTrainers', () => {
        test('should get all trainers', async () => {
            //setting up
            await Trainer.create({ trainer_name: 'Trainer1', trainer_id: 1 });
            await Trainer.create({ trainer_name: 'Trainer2', trainer_id: 2 });
            
            //testing
            const trainers = await TrainerController.getAllTrainers();
            expect(trainers).toHaveLength(2);
            expect(trainers[0].trainer_name).toBe('Trainer1');
            expect(trainers[1].trainer_name).toBe('Trainer2');
        });

        test('should throw an error if there is an issue with fetching all trainers', async () => {
            jest.spyOn(Trainer, 'find').mockImplementation(() => {
                throw new Error('Mocked error');
            });

            await expect(TrainerController.getAllTrainers()).rejects.toThrow('Mocked error');
        });
    });

    describe('getTrainerById', () => {
        test('should get trainer by ID', async () => {
            //setting up
            await Trainer.create({trainer_name: 'John Doe', trainer_id: 1 });
            
            //testing
            const trainer = await TrainerController.getTrainerById(1);
            expect(trainer).toBeTruthy();
            expect(trainer[0].trainer_name).toBe('John Doe');
        });

        test('should throw an error if there is an issue with fetching the trainer by ID', async () => {
            jest.spyOn(Trainer, 'find').mockImplementation(() => {
                throw new Error('Mocked error');
            });

            await expect(TrainerController.getTrainerById(1)).rejects.toThrow('Mocked error');
        });
    });

    describe('replaceTrainerByTrainerId', () => {
        test('should replace the trainer details', async () => {
            //setting up
            await Trainer.create({trainer_name: 'John Doe', trainer_id: 1 });

            //testing
            const newDetails = { trainer_name: 'Jane Doe' };
            await TrainerController.replaceTrainerbyTrainerId(newDetails, 1);

            const updatedTrainer = await Trainer.findOne({ trainer_id: 1 });
            expect(updatedTrainer).toBeTruthy();
            expect(updatedTrainer.trainer_name).toBe('Jane Doe');
        });

        test('should throw an error if there is an issue with replacing the trainer', async () => {
            jest.spyOn(Trainer, 'replaceOne').mockImplementation(() => {
                throw new Error('Mocked error');
            });

            const newDetails = { trainer_name: 'Jane Doe' };
            await expect(TrainerController.replaceTrainerbyTrainerId(newDetails, 1)).rejects.toThrow('Mocked error');
        });
    });
});