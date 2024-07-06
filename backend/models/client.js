const db = require('./db.js');
const tableName = 'client';

class Client {
    constructor(id, name, code) {
        this.id = id;
        this.name = name;
        this.code = code;
    }

    static newCLient(name, code) {
        // in JS, only one constructor is allowed
        // we need a factory method
        return new Client(undefined, name, code);
    }
}


async function sync() {
    try { // for simplicity, we assume staff names are uniqe (in the absence of NRIC or personal email)
        db.pool.query(`
        CREATE TABLE IF NOT EXISTS ${tableName} (
            id INTEGER AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255)
        )
        `);
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/** return all staffs in the db, ignoring the dept field
 * @returns a list of staffs
 */
async function all() {
    try {
        
        const [rows, fieldDefs] = await db.pool.query(`
            SELECT ${tableName}.id, ${tableName}.name, work.code FROM ${tableName} 
            LEFT JOIN work ON ${tableName}.id = work.id
        `);
        var list = [];
        for (let row of rows) {
            let client = new Client(row.id, row.name, row.code);
            list.push(client);
        }
        return list;
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * return one staff in a list if exists by its staff id
 * @param {int} id the staff id 
 * @returns a list of staffs (either empty or one staff)
 */
async function findOneById(id) {
    try {
        const [rows, fieldDefs] = await db.pool.query(`
            SELECT ${tableName}.id, ${tableName}.name, work.code FROM ${tableName}
            LEFT JOIN work ON ${tableName}.id = work.id 
            WHERE ${tableName}.id = ?`, [id]
        );
        var list = [];
        for (let row of rows) {
            let client = new Client(row.id, row.name, row.code);
            list.push(client);
        }
        return list;
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}


/**
 * return one staff in a list if exists by its staff name
 * @param {string} name the staff's name
 * @returns a list of staffs (either empty or one staff)
 */
async function findOneByName(name) {
    try {
        const [rows, fieldDefs] = await db.pool.query(`
            SELECT ${tableName}.id, ${tableName}.name, work.code FROM ${tableName}
            LEFT JOIN work ON ${tableName}.id = work.id 
            WHERE ${tableName}.name = ?`, [name]
        );
        var list = [];
        for (let row of rows) {
            let client = new Client(row.id, row.name, row.code);
            list.push(client);
        }
        return list;
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}


/**
 * Return a list of staffs by the given dept code
 * @param {string} code, dept code 
 * @returns a list of staffs
 */
async function findByDept(code) {
    try {
        const [rows, fieldDefs] = await db.pool.query(`
        SELECT ${tableName}.id, ${tableName}.name, work.code FROM ${tableName} 
        INNER JOIN work ON ${tableName}.id = work.id AND work.code = ?`, [code]
        );
        var list = [];
        for (let row of rows) {
            let client = new Client(row.id, row.name, row.code);
            list.push(client);
        }
        return list;
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * insert the given staff object into the db if it does not exist
 * @param {Staff} staff 
 * //@param {boolean} with_dept//
 */

async function insertOne(client) {
    try {
        const exists = await findOneByName(client.name);
        if (exists.length == 0) {
            const [rows, fieldDefs] = await db.pool.query(`
            INSERT INTO ${tableName} (name) VALUES (?)
            `, [client.name]);
            const staffs_with_id = await findOneByName(client.name);
            //if (staffs_with_id.length > 0) {
            //    const work = new workModel.Work(staffs_with_id[0].id, staff.code);
            //    await workModel.insertOne(work);    
            //}
        }
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * Insert a list of clientss
 * @param {[Client]} clients 
 */
async function insertMany(clients) {
    for (let client of clients) {
        await insertOne(client);
    }
}

/**
 * Delete the staff from the db
 * @param {Client} client 
 */
async function deleteOne(client) {
    try {
        await db.pool.query(`DELETE FROM work where id = ?`, [client.id]);
        await db.pool.query(`DELETE FROM ${tableName} where id = ?`, [client.id]);
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}


module.exports =  { Client, all, findOneById, findByDept, findOneByName, sync, insertOne, insertMany, deleteOne }