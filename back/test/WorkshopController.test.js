const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const WorkshopController = require('../handlers/WorkshopController');

describe('WorkshopController', () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
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
        jest.restoreAllMocks();  // Clear and restore any mocks after each test
    });

    describe('validateWorkshopBody', () => {
        it('should throw an error if dates is not a string', () => {
            // input
            const input = { body: { dates: [], assignedTrainers: 'Trainer1,Trainer2' } };
            // execution 
            const actual_output = () => WorkshopController.validateWorkshopBody(input);
            // assertion
            expect(actual_output).toThrow();
        });
    
        it('should throw an error if assignedTrainers is not a string', () => {
            // input
            const input = { body: { dates: '2021-01-01,2021-01-02', assignedTrainers: [] } };
            // execution
            const actual_output = () => WorkshopController.validateWorkshopBody(input);
            // assertion
            expect(actual_output).toThrow();
        });
    
        it('should not throw an error if dates and assignedTrainers are strings', () => {
            // input
            const input = { body: { dates: '2021-01-01,2021-01-02', assignedTrainers: 'Trainer1,Trainer2' } };
            // execution
            const actual_output = () => WorkshopController.validateWorkshopBody(input);
            // assertion
            expect(actual_output).not.toThrow();
        });
    });
    

    describe('parseWorkshopRequest', () => {
        beforeEach(() => {
            // Setup: Mock validateWorkshopBody to prevent actual validation
            jest.spyOn(WorkshopController, 'validateWorkshopBody').mockImplementation(() => {});
        });
    
        it('should parse dates and assignedTrainers correctly', () => {
            // input
            const input = {
                body: {
                    dates: '2021-01-01,2021-01-02',
                    assignedTrainers: 'Trainer1,Trainer2',
                },
            };
    
            // execution
            const actual_output = WorkshopController.parseWorkshopRequest(input);
    
            // assertion
            const expected_output = {
                dates: [new Date('2021-01-01'), new Date('2021-01-02')],
                assignedTrainers: ['Trainer1', 'Trainer2'],
            };
            expect(actual_output.dates).toEqual(expected_output.dates);
            expect(actual_output.assignedTrainers).toEqual(expected_output.assignedTrainers);
        });
    
        it('should throw an error for incorrectly formatted dates', () => {
            // input
            const input = {
                body: {
                    dates: 'invalid-date,2021-01-02',
                    assignedTrainers: 'Trainer1,Trainer2',
                },
            };
    
            // execution
            const actual_output = () => WorkshopController.parseWorkshopRequest(input);
            // assertion
            expect(actual_output).toThrow();
        });
    
        it('should throw an error if assignedTrainers is not a string', () => {
            // input
            const input = {
                body: {
                    dates: '2021-01-01,2021-01-02',
                    assignedTrainers: 123,
                },
            };
    
            // execution
            const actual_output = () => WorkshopController.parseWorkshopRequest(input);
            // assertion
            expect(actual_output).toThrow();
        });
    });
    
    
    describe('submitWorkshopRequest', () => {
        beforeEach(() => {
            // Setup: Mocking dependent methods
            jest.spyOn(WorkshopController, 'validateWorkshopBody').mockImplementation(() => {});
            jest.spyOn(WorkshopController, 'parseWorkshopRequest').mockImplementation((req) => {
                return {
                    client_id: 1,
                    companyName: 'Company',
                    clientType: 'Type',
                    workshopName: 'Workshop',
                    dates: [new Date('2021-01-01'), new Date('2021-01-02')],
                    type: 'Type',
                    numberOfAttendees: '10',
                    dealSizePotential: 100,
                    location: 'Location',
                    venue: 'Venue',
                    comments: 'Comments',
                    status: true,
                    assignedTrainers: ['Trainer1', 'Trainer2'],
                    workshopId: 1,
                };
            });
        });
    
        it('should submit a valid workshop request', async () => {
            // Setup
            const req = {
                body: {
                    client_id: 1,
                    companyName: 'Company',
                    clientType: 'Type',
                    workshopName: 'Workshop',
                    dates: '2021-01-01,2021-01-02',
                    type: 'Type',
                    numberOfAttendees: '10',
                    dealSizePotential: 100,
                    location: 'Location',
                    venue: 'Venue',
                    comments: 'Comments',
                    status: true,
                    assignedTrainers: 'Trainer1,Trainer2',
                },
            };
    
            // Input
            const expected_output = true;
    
            // Execution
            let actual_output;
            await WorkshopController.submitWorkshopRequest(req);
            const workshop = await mongoose.model('Workshops').findOne({ workshopName: 'Workshop' });
            actual_output = !!workshop; // Check if workshop exists
    
            // Assertion
            expect(actual_output).toBe(expected_output);
            expect(workshop.workshopId).toBe(1);
        });
    
        it('should throw an error if validation fails', async () => {
            // Setup: Mock validateWorkshopBody to throw an error
            WorkshopController.validateWorkshopBody.mockImplementation(() => {
                throw new Error('Validation error');
            });
    
            // Input
            const req = {
                body: {
                    client_id: 1,
                    companyName: 'Company',
                    clientType: 'Type',
                    workshopName: 'Workshop',
                    dates: 'invalid-date',
                    type: 'Type',
                    numberOfAttendees: '10',
                    dealSizePotential: 100,
                    location: 'Location',
                    venue: 'Venue',
                    comments: 'Comments',
                    status: true,
                    assignedTrainers: 'Trainer1,Trainer2',
                },
            };
    
            // Execution & Assertion
            await expect(WorkshopController.submitWorkshopRequest(req)).rejects.toThrow('Validation error');
        });
    
        it('should throw an error if there is an issue with workshop creation', async () => {
            // Setup: Mock submitWorkshopRequestQuery to throw an error
            jest.spyOn(WorkshopController, 'submitWorkshopRequestQuery').mockImplementation(() => {
                throw new Error('Mocked error');
            });
    
            // Input
            const req = {
                body: {
                    client_id: 1,
                    companyName: 'Company',
                    clientType: 'Type',
                    workshopName: 'Workshop',
                    dates: '2021-01-01,2021-01-02',
                    type: 'Type',
                    numberOfAttendees: '10',
                    dealSizePotential: 100,
                    location: 'Location',
                    venue: 'Venue',
                    comments: 'Comments',
                    status: true,
                    assignedTrainers: 'Trainer1,Trainer2',
                },
            };
    
            // Execution & Assertion
            await expect(WorkshopController.submitWorkshopRequest(req)).rejects.toThrow('Mocked error');
        });
    });
        
    describe('getWorkshopsById', () => {
        it('should get workshops by client id', async () => {
            // Setup: Create test workshops in the database
            await mongoose.model('Workshops').create({ client_id: 1, workshopName: 'Workshop1', workshopId: 1 });
            await mongoose.model('Workshops').create({ client_id: 1, workshopName: 'Workshop2', workshopId: 2 });
    
            // Input
            const input = 1;
            const expected_output = [
                { client_id: 1, workshopName: 'Workshop1', workshopId: 1 },
                { client_id: 1, workshopName: 'Workshop2', workshopId: 2 }
            ];
    
            // Execution
            const workshops = await WorkshopController.getWorkshopsById(input);
    
            // Assertion
            expect(workshops).toHaveLength(expected_output.length);
            expect(workshops[0].client_id).toBe(expected_output[0].client_id);
            expect(workshops[1].client_id).toBe(expected_output[1].client_id);
            expect(workshops[0].workshopName).toBe(expected_output[0].workshopName);
            expect(workshops[1].workshopName).toBe(expected_output[1].workshopName);
            expect(workshops[0].workshopId).toBe(expected_output[0].workshopId);
            expect(workshops[1].workshopId).toBe(expected_output[1].workshopId);
        });
    
        it('should throw an error if there is an issue with fetching workshops by id', async () => {
            // Setup: Mock find method to throw an error
            jest.spyOn(mongoose.model('Workshops'), 'find').mockImplementation(() => {
                throw new Error('Mocked error');
            });
    
            // Input
            const input = 1;
    
            // Execution & Assertion
            await expect(WorkshopController.getWorkshopsById(input)).rejects.toThrow();
        });
    });
    
    describe('getLargestWorkshopId', () => {
        it('should return the largest workshop ID from a non-empty collection', async () => {
            // Setup: Create test workshops in the database
            await mongoose.model('Workshops').create({ workshopId: 1 });
            await mongoose.model('Workshops').create({ workshopId: 2 });
            await mongoose.model('Workshops').create({ workshopId: 3 });
    
            // Execution
            const largestWorkshopId = await WorkshopController.getLargestWorkshopId();
    
            // Assertion
            expect(largestWorkshopId).toBe(3);
        });
    
        it('should return 0 for an empty collection', async () => {
            // Execution
            const largestWorkshopId = await WorkshopController.getLargestWorkshopId();
    
            // Assertion
            expect(largestWorkshopId).toBe(0);
        });
    
        it('should throw an error if there is an issue with the database query', async () => {
            // Setup: Mock find method to throw an error
            jest.spyOn(mongoose.model('Workshops'), 'find').mockImplementation(() => {
                throw new Error('Mocked error');
            });
    
            // Execution & Assertion
            await expect(WorkshopController.getLargestWorkshopId()).rejects.toThrow();
        });
    });    
});