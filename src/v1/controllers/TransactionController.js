import DB from "../services/PostgresDatabase.js";

class TransactionController {
    async index(_req, res) {
        const sql = `
            SELECT
                t.id AS id,
                e_from.title AS from,
                e_to.title AS to,
                t.amount,
                t.created_at
            FROM
                transactions AS t
            JOIN envelopes AS e_from ON e_from.id = t.from_id
            JOIN envelopes AS e_to ON e_to.id = t.to_id
        `;
        const result = await DB.select(sql);

        if (result.code >= 400 || result.code <= 499) return res.status(result.code).json(result);

        return res.status(result.code).json(result);
    }

    async show(req, res) {
        const { id } = req.params;
        const sql = `
            SELECT
                t.id AS id,
                e_from.title AS from,
                e_to.title AS to,
                t.amount,
                t.created_at
            FROM
                transactions AS t
            JOIN envelopes AS e_from ON e_from.id = t.from_id
            JOIN envelopes AS e_to ON e_to.id = t.to_id
            WHERE t.id = $1
        `;
        const result = await DB.select(sql, [id]);

        if (result.code >= 400 || result.code <= 499) return res.status(result.code).json(result);

        return res.status(result.code).json(result);
    }

    async transfer(req, res) {
        const { fromId, toId } = req.params;
        const { amount } = req.body;

        const fromEnvelope = await DB.select("SELECT * FROM envelopes WHERE id = $1", [fromId]);

        if (!fromEnvelope || fromEnvelope.code === 400) return res.status(404).json({
            status: "FAIL",
            code: 404,
            error: `Envelope with id ${fromId} not found.`,
        });

        const toEnvelope = await DB.select("SELECT * FROM envelopes WHERE id = $1", [toId]);
        
        if (!toEnvelope || toEnvelope.code === 400) return res.status(404).json({
            status: "FAIL",
            code: 404,
            error: `Envelope with id ${toId} not found.`,
        });

        if (!amount) return res.status(404).json({
            status: "FAIL",
            code: 404,
            error: "The amount param is required",
        });

        if (fromEnvelope.data[0].budget < amount) return res.status(404).json({
            status: "FAIL",
            code: 404,
            error: `Not enought budget on envelope '${fromEnvelope.data[0].title}'`,
        });
            
        const result = await DB.insert("INSERT INTO transactions (from_id, to_id, amount) VALUES ($1, $2, $3)", [fromId, toId, amount]);
        await DB.update("UPDATE envelopes SET budget = (budget - $1) WHERE id = $2", [amount, fromId]);
        await DB.update("UPDATE envelopes SET budget = (budget + $1) WHERE id = $2", [amount, toId]);

        const isFail = result.code >= 400 || result.code <= 499;

        if (isFail) return res.status(result.code).json(result);

        return res.status(result.code).json(result);
    }
}

export default new TransactionController();
