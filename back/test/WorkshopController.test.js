const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { WorkshopController, workshop } = require('../handlers/WorkshopController');

describe('WorkshopController', () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    beforeEach(() => {
        jest.resetAllMocks();
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

    describe('validateWorkshopBody', () => {
        test('should throw an error if no dates are selected', () => {
            const req = { body: { dates: [] } };
            expect(() => WorkshopController.validateWorkshopBody(req)).toThrow('No date selected');
        });

        test('should not throw an error if dates are selected', () => {
            const req = { body: { dates: [new Date('2024-07-29')] } };
            expect(() => WorkshopController.validateWorkshopBody(req)).not.toThrow();
        });
    });

    describe('parseWorkshopRequest', () => {
        test('should return the body as is', () => {
            const req = { body: { dates: [new Date('2024-07-29')], assignedTrainers: [1, 2, 3] } };
            const parsedBody = WorkshopController.parseWorkshopRequest(req);
            expect(parsedBody).toEqual(req.body);
        });
    });

    describe('getLargestWorkshopId', () => {
        test('should return 0 if there are no workshops', async () => {
            const largestId = await WorkshopController.getLargestWorkshopId();
            expect(largestId).toBe(0);
        });

        test('should return the largest workshop ID', async () => {
            await workshop.create({ workshopId: 1, client_id: 1, workshopName: 'Workshop 1' });
            await workshop.create({ workshopId: 3, client_id: 1, workshopName: 'Workshop 2' });
            await workshop.create({ workshopId: 2, client_id: 1, workshopName: 'Workshop 3' });

            const largestId = await WorkshopController.getLargestWorkshopId();
            expect(largestId).toBe(3);
        });

        test('should throw an error if there is an issue with the database query', async () => {
            const errorMsg = 'Mocked error';
            jest.spyOn(workshop, 'find').mockImplementationOnce(() => {
                throw new Error(errorMsg);
            });

            await expect(WorkshopController.getLargestWorkshopId()).rejects.toThrow(errorMsg);
        });
    });

    describe('submitWorkshopRequestQuery', () => {
        test('should successfully create a workshop', async () => {
            const details = {
                client_id: 1,
                workshopName: 'New Workshop',
                dates: [new Date('2024-07-29')],
                assignedTrainers: [1, 2, 3]
            };

            await expect(WorkshopController.submitWorkshopRequestQuery(details)).resolves.not.toThrow();

            const workshopCreated = await workshop.findOne({ client_id: 1 });
            expect(workshopCreated).toBeTruthy();
            expect(workshopCreated.workshopName).toBe('New Workshop');
        });

        test('should throw an error when creation fails', async () => {
            const errorMsg = 'Mocked error';
            jest.spyOn(workshop, 'create').mockImplementationOnce(() => {
                throw new Error(errorMsg);
            });

            const details = { workshopId: 1, client_id: 1, workshopName: 'Workshop 1' };
            await expect(WorkshopController.submitWorkshopRequestQuery(details)).rejects.toThrow('Mocked error');
        });
    });

    describe('submitWorkshopRequest', () => {

        const mockWorkshop = {
            client_id: 1,
            workshopName: 'New Workshop',
            dates: [new Date('2024-07-29')],
            assignedTrainers: [1, 2, 3]
        };

        test('should create a new workshop successfully', async () => {
            jest.spyOn(WorkshopController, 'validateWorkshopBody').mockImplementation(() => {});
            jest.spyOn(WorkshopController, 'parseWorkshopRequest').mockImplementation(() => (mockWorkshop));
            jest.spyOn(WorkshopController, 'getLargestWorkshopId').mockImplementation(async () => 0);

            const req = { body: mockWorkshop };
            await WorkshopController.submitWorkshopRequest(req);

            const workshops = await workshop.find({});
            expect(workshops.length).toBe(1);
            expect(workshops[0].workshopName).toBe('New Workshop');
            expect(workshops[0].dates[0].toISOString()).toBe(new Date('2024-07-29').toISOString());
            expect(workshops[0].workshopId).toBe(1);
            expect(workshops[0].status).toBe(0);
        });

        test('should throw error if validateWorkshopBody fails', async () => {
            jest.spyOn(WorkshopController, 'validateWorkshopBody').mockImplementation(() => {
                throw new Error('Validation error');
            });
            jest.spyOn(WorkshopController, 'parseWorkshopRequest').mockImplementation(() => (mockWorkshop));
            jest.spyOn(WorkshopController, 'getLargestWorkshopId').mockImplementation(async () => 0);

            const req = { body: mockWorkshop };
            await expect(WorkshopController.submitWorkshopRequest(req)).rejects.toThrow('Validation error');
        });

        test('should throw error if parseWorkshopRequest fails', async () => {
            jest.spyOn(WorkshopController, 'validateWorkshopBody').mockImplementation(() => {});
            jest.spyOn(WorkshopController, 'parseWorkshopRequest').mockImplementation(() => {
                throw new Error('Parsing error');
            });
            jest.spyOn(WorkshopController, 'getLargestWorkshopId').mockImplementation(async () => 0);

            const req = { body: mockWorkshop };
            await expect(WorkshopController.submitWorkshopRequest(req)).rejects.toThrow('Parsing error');
        });

        test('should throw error if getLargestWorkshopId fails', async () => {
            jest.spyOn(WorkshopController, 'validateWorkshopBody').mockImplementation(() => {});
            jest.spyOn(WorkshopController, 'parseWorkshopRequest').mockImplementation(() => (mockWorkshop));
            jest.spyOn(WorkshopController, 'getLargestWorkshopId').mockImplementation(async () => {
                throw new Error('Error while fetching workshops by Id');
            });

            const req = { body: mockWorkshop };
            await expect(WorkshopController.submitWorkshopRequest(req)).rejects.toThrow('Error while fetching workshops by Id');
        });

        test('should throw error if submitWorkshopRequestQuery fails', async () => {
            jest.spyOn(WorkshopController, 'validateWorkshopBody').mockImplementation(() => {});
            jest.spyOn(WorkshopController, 'parseWorkshopRequest').mockImplementation(() => (mockWorkshop));
            jest.spyOn(WorkshopController, 'getLargestWorkshopId').mockImplementation(async () => 0);

            jest.spyOn(WorkshopController, 'submitWorkshopRequestQuery').mockImplementation(async () => {
                throw new Error('Error while creating workshop');
            });

            const req = { body: mockWorkshop };
            await expect(WorkshopController.submitWorkshopRequest(req)).rejects.toThrow('Error while creating workshop');
        });
    });

    describe('getWorkshopsByClientId', () => {
        test('should return workshops associated with a specific client', async () => {
            await workshop.create({ workshopId: 1, client_id: 1, workshopName: 'Workshop 1' });
            await workshop.create({ workshopId: 2, client_id: 2, workshopName: 'Workshop 2' });

            const workshops = await WorkshopController.getWorkshopsByClientId(1);
            expect(workshops.length).toBe(1);
            expect(workshops[0].workshopName).toBe('Workshop 1');
        });

        test('should throw an error if there is an issue with fetching workshops', async () => {
            jest.spyOn(workshop, 'find').mockImplementationOnce(() => {
                throw new Error('Mocked error');
            });

            await expect(WorkshopController.getWorkshopsByClientId(1)).rejects.toThrow('Mocked error');
        });
    });

    describe('replaceWorkshopByWorkshopId', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });
    
        // Mock data
        const mockWorkshop = {
            client_id: 1,
            workshopName: 'Existing Workshop',
            workshopId: 1,
            dates: [new Date('2024-07-29')],
            assignedTrainers: [1,2,3],
            status: 0
        };

        const updateWorkshopDetails = {
            client_id: 1,
            workshopName: 'Updated Workshop',
            dates: [new Date('2024-08-01')],
            assignedTrainers: [1,2]
        };
    
        // Mock successful responses
        
        test('should replace the trainer details', async () => {
            //setting up
            jest.spyOn(WorkshopController, 'validateWorkshopBody').mockImplementation(() => {});
            jest.spyOn(WorkshopController, 'parseWorkshopRequest').mockImplementation(() => (updateWorkshopDetails));
            await workshop.create(mockWorkshop);

            //testing
            const newDetails = {body : updateWorkshopDetails};
            await WorkshopController.replaceWorkshopByWorkshopId(newDetails, 1);

            const updatedWorkshop = await workshop.findOne({ workshopId: 1 });
            expect(updatedWorkshop).toBeTruthy();
            expect(updatedWorkshop.workshopName).toBe('Updated Workshop');
            expect(updatedWorkshop.assignedTrainers).toEqual([1,2]);
        });

        test('should throw an error if there is an issue with replacing the workshop', async () => {
            jest.spyOn(WorkshopController, 'validateWorkshopBody').mockImplementation(() => {});
            jest.spyOn(WorkshopController, 'parseWorkshopRequest').mockImplementation(() => (updateWorkshopDetails));
            await workshop.create(mockWorkshop);

            jest.spyOn(workshop, 'replaceOne').mockImplementation(async () => {
                throw new Error('Mocked error');
            });
        
            const newDetails = { body: updateWorkshopDetails };
        
            await expect(WorkshopController.replaceWorkshopByWorkshopId(newDetails, 1)).rejects.toThrow('Mocked error');
        });
    
        test('should throw an error if parseWorkshopRequest fails in replaceWorkshopByWorkshopId', async () => {
            jest.spyOn(WorkshopController, 'parseWorkshopRequest').mockImplementation(() => (updateWorkshopDetails));
            jest.spyOn(WorkshopController, 'validateWorkshopBody').mockImplementation(() => {
                throw new Error('Validation error');
            });
            await workshop.create(mockWorkshop);
    
            const newDetails = { body: updateWorkshopDetails};
            await expect(WorkshopController.replaceWorkshopByWorkshopId(newDetails, 1)).rejects.toThrow('Validation error');
        });
    
        test('should throw an error if getWorkshopByWorkshopId fails in replaceWorkshopByWorkshopId', async () => {
            jest.spyOn(WorkshopController, 'validateWorkshopBody').mockImplementation(() => {});
            jest.spyOn(WorkshopController, 'parseWorkshopRequest').mockImplementation(() => {
                throw new Error('Parsing error');
            });
            await workshop.create(mockWorkshop);
    
            const newDetails = { body: updateWorkshopDetails };
            await expect(WorkshopController.replaceWorkshopByWorkshopId(newDetails, 1)).rejects.toThrow('Parsing error');
        });
    });
    
    describe('getWorkshopByWorkshopId', () => {
        test('should return a workshop by its ID', async () => {
            const newWorkshop = { workshopId: 1, client_id: 1, workshopName: 'Workshop 1' };
            await workshop.create(newWorkshop);
            const foundWorkshop = await WorkshopController.getWorkshopByWorkshopId(1);
            expect(foundWorkshop.map(w => (w.workshopId, w.client_id, w.workshopName))).toEqual([newWorkshop].map(w => (w.workshopId, w.client_id, w.workshopName)));
        });

        test('should throw an error if there is an issue with fetching a workshop by its ID', async () => {
            jest.spyOn(workshop, 'find').mockImplementation(() => {
                throw new Error('Mocked error');
            });
            await expect(WorkshopController.getWorkshopByWorkshopId(1)).rejects.toThrow('Mocked error');
        });
    });

    describe('getAllWorkshops', () => {
        test('should return all workshops', async () => {
            const newWorkshops = [
                { workshopId: 1, client_id: 1, workshopName: 'Workshop 1' }, 
                { workshopId: 2, client_id: 2, workshopName: 'Workshop 2' }
            ];
            await workshop.create(newWorkshops[0]);
            await workshop.create(newWorkshops[1]);

            const allWorkshops = await WorkshopController.getAllWorkshops();
            expect(allWorkshops.length).toBe(2);
            expect(allWorkshops.map(w => (w.workshopId, w.client_id, w.workshopName))).toEqual(newWorkshops.map(w => (w.workshopId, w.client_id, w.workshopName)));
            
        });

        test('should throw an error if there is an issue with fetching all workshops', async () => {
            jest.spyOn(workshop, 'find').mockImplementation( () => {
                throw new Error('Mocked error');
            });
            await expect(WorkshopController.getAllWorkshops()).rejects.toThrow('Mocked error');
        });
    });

    describe('assignTrainerToWorkshop', () => {
        test('should assign a trainer to a workshop successfully', async () => {
            const newWorkshop = {
                workshopId: 1,
                client_id: 1,
                workshopName: 'Workshop 1',
                status:0,
                assignedTrainers: []
            }
            await workshop.create(newWorkshop);

            jest.spyOn(WorkshopController, 'getWorkshopByWorkshopId').mockImplementation(async () => ([newWorkshop]));

            await WorkshopController.assignTrainerToWorkshop(1, 1);
            const updatedWorkshop = await workshop.findOne({ workshopId: 1 });
            expect(updatedWorkshop.assignedTrainers).toContain(1);
        });

        test('should throw an error if workshop does not exist', async () => {
            jest.spyOn(WorkshopController, 'getWorkshopByWorkshopId').mockImplementation(() => ([]));

            await expect(WorkshopController.assignTrainerToWorkshop(1, 1)).rejects.toThrow('Workshop not found');
        });

        test('should throw an error if there is an issue with updating the workshop', async () => {
            const newWorkshop = {
                workshopId: 1,
                client_id: 1,
                workshopName: 'Workshop 1',
                assignedTrainers: []
            }
            await workshop.create(newWorkshop);

            jest.spyOn(workshop, 'replaceOne').mockImplementationOnce(() => {
                throw new Error('Mocked error');
            });

            await expect(WorkshopController.assignTrainerToWorkshop(1, 1)).rejects.toThrow('Mocked error');
        });
    });

    describe('getworkshopsAssignedToTrainer', () => {
        test('should return all workshops assigned to a specific trainer', async () => {
            await workshop.create({
                workshopId: 1,
                client_id: 1,
                workshopName: 'Workshop 1',
                assignedTrainers: [1, 2, 3]
            });
            await workshop.create({
                workshopId: 2,
                client_id: 2,
                workshopName: 'Workshop 2',
                assignedTrainers: [2]
            });
            await workshop.create({
                workshopId: 3,
                client_id: 1,
                workshopName: 'Workshop 3',
                assignedTrainers: [1, 3]
            });

            const workshops = await WorkshopController.getworkshopsAssignedToTrainer(1);
            expect(workshops.length).toBe(2);
            expect(workshops.map(w => w.workshopId)).toEqual(expect.arrayContaining([1, 3]));
        });

        test('should return an empty array if no workshops are assigned to the trainer', async () => {
            await workshop.create({
                workshopId: 1,
                client_id: 1,
                workshopName: 'Workshop 2',
                assignedTrainers: [2]
            });

            const workshops = await WorkshopController.getworkshopsAssignedToTrainer(1);
            expect(workshops.length).toBe(0);
        });

        test('should throw an error if there is an issue with fetching workshops', async () => {
            jest.spyOn(workshop, 'find').mockImplementation(() => {
                throw new Error('Mocked error');
            });

            await expect(WorkshopController.getworkshopsAssignedToTrainer(1)).rejects.toThrow('Mocked error');
        });
    });
});
