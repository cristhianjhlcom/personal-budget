import DB from "../services/PostgresDatabase.js";

export default class EnvelopController {
    static async index(_req, res) {
        const result = await DB.select("SELECT * FROM envelopes");

        if (result.code >= 400 || result.code <= 499) return res.status(result.code).json(result);

        return res.status(result.code).json(result);
    }

    static async show(req, res) {
        const { id } = req.params;
        const result = await DB.select("SELECT * FROM envelopes WHERE id = $1", [id]);

        if (result.code >= 400 || result.code <= 499) return res.status(result.code).json(result);

        return res.status(result.code).json(result);
    }

    static async store(req, res) {
        const { title, budget } = req.body;

        if (!title) return res.status(400).json({
            status: "FAIL",
            code: 400,
            error: "Param [title] is required.",
        });

        if (!budget) return res.status(400).json({
            status: "FAIL",
            code: 400,
            error: "Param [budget] is required.",
        });

        const sql = `INSERT INTO envelopes (title, budget, created_at) VALUES ($1, $2, NOW())`;
        const result = await DB.insert(sql, [title, budget]);
        const isFail = result.code >= 400 || result.code <= 499;

        if (isFail) return res.status(result.code).json(result);

        return res.status(result.code).json(result);
    }

    static async destroy(req, res) {
        const id = Number(req.params.id);
        const sql = "DELETE FROM envelopes WHERE id = $1";
        const result = await DB.delete(sql, [id]);
        const isFail = result.code >= 400 || result.code <= 499;

        if (isFail) return res.status(result.code).json(result);

        return res.status(result.code).json(result);
    }

    static async update(req, res) {
        const id = Number(req.params.id);
        const { title } = req.body;
        const sql = "UPDATE envelopes SET title = $1 WHERE id = $3";

        if (!id) return res.status(400).json({
            status: "FAIL",
            code: 400,
            error: "Param [id] is required.",
        });

        if (!title) return res.status(400).json({
            status: "FAIL",
            code: 400,
            error: "Param [title] is required.",
        });

        const result = await DB.update(sql, [title, id]);
        const isFail = result.code >= 400 || result.code <= 499;

        if (isFail) return res.status(result.code).json(result);

        return res.status(result.code).json(result);
    }
}
