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
    });

    describe('validateWorkshopBody', () => {
        it('should throw an error if dates is not a string', () => {
            const req = { body: { dates: [], assignedTrainers: 'Trainer1,Trainer2' } };
            expect(() => WorkshopController.validateWorkshopBody(req)).toThrow('body.dates is not of string type');
        });

        it('should throw an error if assignedTrainers is not a string', () => {
            const req = { body: { dates: '2021-01-01,2021-01-02', assignedTrainers: [] } };
            expect(() => WorkshopController.validateWorkshopBody(req)).toThrow('body.assignedTrainers is not of string type');
        });

        it('should not throw an error if dates and assignedTrainers are strings', () => {
            const req = { body: { dates: '2021-01-01,2021-01-02', assignedTrainers: 'Trainer1,Trainer2' } };
            expect(() => WorkshopController.validateWorkshopBody(req)).not.toThrow();
        });
    });

    describe('parseWorkshopRequest', () => {
        it('should parse dates and assignedTrainers correctly', () => {
            const req = {
                body: {
                    dates: '2021-01-01,2021-01-02',
                    assignedTrainers: 'Trainer1,Trainer2',
                },
            };
            const parsed = WorkshopController.parseWorkshopRequest(req);
            expect(parsed.dates).toEqual([new Date('2021-01-01'), new Date('2021-01-02')]);
            expect(parsed.assignedTrainers).toEqual(['Trainer1', 'Trainer2']);
        });

        it('should throw an error for incorrectly formatted dates', () => {
            const req = {
                body: {
                    dates: 'invalid-date,2021-01-02',
                    assignedTrainers: 'Trainer1,Trainer2',
                },
            };
            expect(() => WorkshopController.parseWorkshopRequest(req)).toThrow('Incorrect Formatting of dates or trainers');
        });

        it('should throw an error if assignedTrainers is not a string', () => {
            const req = {
                body: {
                    dates: '2021-01-01,2021-01-02',
                    assignedTrainers: 123,
                },
            };
            expect(() => WorkshopController.parseWorkshopRequest(req)).toThrow('Incorrect Formatting of dates or trainers');
        });
    });

    describe('submitWorkshopRequest', () => {
        it('should submit a valid workshop request', async () => {
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
                    assignedTrainers: '',
                },
            };

            await WorkshopController.submitWorkshopRequest(req);
            const workshop = await mongoose.model('Workshops').findOne({ workshopName: 'Workshop' });

            expect(workshop).toBeTruthy();
            expect(workshop.workshopId).toBe(1);
        });

        it('should throw an error if validation fails', async () => {
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
                    assignedTrainers: '',
                },
            };

            await expect(WorkshopController.submitWorkshopRequest(req)).rejects.toThrow('Incorrect Formatting of dates or trainers');
        });

        it('should throw an error if there is an issue with workshop creation', async () => {
            jest.spyOn(WorkshopController, 'submitWorkshopRequestQuery').mockImplementation(() => {
                throw new Error('Mocked error');
            });

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
                    assignedTrainers: '',
                },
            };

            await expect(WorkshopController.submitWorkshopRequest(req)).rejects.toThrow('Mocked error');
        });
    });

    describe('getWorkshopsById', () => {
        it('should get workshops by client id', async () => {
            await mongoose.model('Workshops').create({ client_id: 1, workshopName: 'Workshop1', workshopId: 1 });
            await mongoose.model('Workshops').create({ client_id: 1, workshopName: 'Workshop2', workshopId: 2 });

            const workshops = await WorkshopController.getWorkshopsById(1);

            expect(workshops).toHaveLength(2);
            expect(workshops[0].client_id).toBe(1);
            expect(workshops[1].client_id).toBe(1);
        });

        it('should throw an error if there is an issue with fetching workshops by id', async () => {
            jest.spyOn(mongoose.model('Workshops'), 'find').mockImplementation(() => {
                throw new Error('Mocked error');
            });

            await expect(WorkshopController.getWorkshopsById(1)).rejects.toThrow('Mocked error');
        });
    });
});
