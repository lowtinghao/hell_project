const db = require('./db.js');


const tableName = 'input';


class Input {
    constructor(id, code) {
        this.id = id; 
        this.code = code; // workshop type
    }
}


async function sync() {
    try {
        db.pool.query(`
        CREATE TABLE IF NOT EXISTS ${tableName} (
            id INTEGER,
            code VARCHAR(50),
            PRIMARY KEY (id, code),
            FOREIGN KEY (id) REFERENCES client(id),
            FOREIGN KEY (code) REFERENCES workshop(code)        )
        `);
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}
/**
 * return the list of all work entries
 * @returns a list of works
 */
async function all() {
    try {
        
        const [rows, fieldDefs] = await db.pool.query(`
            SELECT id, code FROM ${tableName}
        `);
        var list = [];
        for (let row of rows) {
            let input = new Input(row.id, row.code);
            list.push(input);
        }
        return list;
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * find a work object in the db
 * @param {Input} input 
 * @returns a list of works (either empty or one object)
 */
async function findOne(input) {
    try {
        const [rows, fieldDefs] = await db.pool.query(`
            SELECT id, code FROM ${tableName} WHERE id = ? AND code = ?`, [input.id, input.code]
        );
        var list = []
        for (let row of rows) {
            let input = new Input(row.id, row.code);
            list.push(input);
        }
        return list;
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}


/**
 * return a list of work entries by staff id
 * @param {int} client_id 
 * @returns a list of works (empty or one, since a staff can only belong to one dept)
 */
async function findByStaffId(client_id) {
    try {
        const [rows, fieldDefs] = await db.pool.query(`
            SELECT id, code FROM ${tableName} WHERE id = ?`, [client_id]
        );
        var list = []
        for (let row of rows) {
            let input = new Input(row.id, row.code);
            list.push(input);
        }
        return list;
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }

}

/**
 * Insert a work object into the database if it does not exist
 * @param {Work} work 
 */
async function insertOne(input) {
    try {
        const exists = await findOne(input);
        if (exists.length == 0) {
            const [rows, fieldDefs] = await db.pool.query(`
            INSERT INTO ${tableName} (id, code) VALUES (?, ?)
            `, [input.id, input.code]);
        }
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * Insert a list of work entries
 * @param {[Input]} inputs 
 */
async function insertMany(inputs) {
    for (let input of inputs) {
        await insertOne(input);
    }
}

/**
 * Delete a work object from the database
 * @param {Input} input 
 */
async function deleteOne(input) {
    try {
        await db.pool.query(`
            DELETE FROM ${tableName} where id = ? AND code = ?`, [input.id,input.code]);
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}


module.exports =  { Input, all, findOne, findByStaffId,  sync, insertOne, insertMany, deleteOne }