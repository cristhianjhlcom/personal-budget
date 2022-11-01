import pg from "pg";
import config from "../config/index.js";

const {Pool} = pg;

class PostgresDatabase {
    constructor() {
        this.pool = new Pool({
            user: config.db.USER,
            host: config.db.HOST,
            database: config.db.DATABASE,
            password: config.db.PASSWORD,
            port: config.db.PORT
        });
    }

    async select(sql, params = []) {
        const client = await this.pool.connect();
        try {
            const [id] = params;
            const result = await client.query(sql, params);

            if (result.rowCount === 0 && id) return {
                status: "FAIL",
                code: 400,
                message: `Item with id ${id} not found.`, 
            }

            return {
                status: "OK",
                code: 200,
                count: result.rowCount,
                data: result.rows,
            };
        } catch(error) {
            return {
                status: "FAIL",
                code: 404,
                message: error.message,
            };
        } finally {
            client.release();
        }
    }

    async insert(sql, params = []) {
        const client = await this.pool.connect();
        try {
            await client.query("BEGIN");
            const result = await client.query(`${sql} RETURNING *`, params);
            await client.query("COMMIT");
            return {
                status: "OK",
                code: 201,
                count: result.rowCount,
                data: result.rows[0],
            };
        } catch(error) {
            await client.query("ROLLBACK");
            return {
                status: "FAIL",
                code: 404,
                message: error.message,
            }
        } finally {
            client.release();
        }
    }

    async delete(sql, params = []) {
        const client = await this.pool.connect();
        try {
            const [id] = params;
            const result = await client.query(sql, params);

            if (result.rowCount === 0 && id) return {
                status: "FAIL",
                code: 400,
                message: `Item with id ${id} not found.`, 
            }

            return {
                status: "OK",
                code: 200,
                message: `Item with id ${id} deleted successfully.`,
            };
        } catch(error) {
            return {
                status: "FAIL",
                code: 404,
                message: error.message,
            };
        } finally {
            client.release();
        }
    }

    async update(sql, params = []) {
        const client = await this.pool.connect();
        try {
            const [, id] = params;
            const result = await client.query(sql, params);

            if (result.rowCount === 0 && id) return {
                status: "FAIL",
                code: 400,
                message: `Item with id ${id} not found.`, 
            }

            return {
                status: "OK",
                code: 200,
                message: `Item with id ${id} updated successfully.`,
            };
        } catch(error) {
            return {
                status: "FAIL",
                code: 404,
                message: error.message,
            };
        } finally {
            client.release();
        }
    }
}

export default new PostgresDatabase();
