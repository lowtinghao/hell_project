const db = require('./db.js');
const tableName = 'workshop';


class Workshop{
    constructor(code){
        this.code = code;
    }
}

/**
 * makes table if it does not exist
 */
async function sync() {
    try {
        db.pool.query(`
        CREATE TABLE IF NOT EXISTS ${tableName} (
            code VARCHAR(50) PRIMARY KEY
        )
        `);
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}


/**
 * 
 * @returns a list of all workshop types
 */
async function all() {
    try {
        // gets list of all workshops from database
        const [rows, fieldDefs] = await db.pool.query(`
            SELECT code FROM ${tableName}
        `);

        //put all the workshops into a list
        var list = [];
        for (let row of rows) {
            let workshop = new Workshop(row.code);
            list.push(workshop);
        }
        return list;
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}


/**
 * insert a dept entry if it does not exist
 * @param {Workshop} workshop 
 */
async function insertOne(workshop) {
    try {
        const exists = await findOneByCode(workshop.code);
        if (exists.length == 0) {
            const [rows, fieldDefs] = await db.pool.query(`
            INSERT INTO ${tableName} (code) VALUES (?)
            `, [workshop.code]);
        }
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * find one dept entry by code
 * @param {string} code 
 * @returns a list of dept entries (either empty or one)
 */
async function findOneByCode(code) {
    try {
        const [rows, fieldDefs] = await db.pool.query(`
            SELECT code FROM ${tableName} WHERE code = ?`, [code]
        );
        var list = []
        for (let row of rows) {
            let workshop = new Workshop(row.code);
            list.push(workshop);
        }
        return list;
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}


/**
 * insert a list of dept entries
 * @param {[Workshop]} workshops // indicate a list of Workshop Object
 */
async function insertMany(workshops) {
    for (let workshop of workshops) {
        await insertOne(workshop);
    }
}

/**
 * delete a dept entry from the db
 * @param {Workshop} workshop 
 */
async function deleteOne(workshop) {
    try {
        const [rows, fieldDefs] = await db.pool.query(`
            DELETE FROM ${tableName} where code = ?`, [workshop]);
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

module.exports =  { Workshop, all, sync, insertOne, insertMany, deleteOne }