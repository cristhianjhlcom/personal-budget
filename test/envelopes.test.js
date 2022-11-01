import request from "supertest";
import assert from "assert";
import app from "../src/v1/server.js";

describe("Envelopes endpoint", () => {
    describe("GET /api/v1/envelopes", () => {
        it("should respond with a 200 status code if is correct", async () => {
            const response = await request(app).get("/api/v1/envelopes");
            assert.equal(response.body.code, 200);
        });

        it("should responde with a 404 status code if fail", async () => {
            const response = await request(app).get("/api/v1/envelopess");
            assert.equal(response.statusCode, 404);
        });
    });

    describe("GET /api/v1/envelopes/:id", () => {
        it("should responde with a 200 status code if is correct", async () => {
            const response = await request(app).get("/api/v1/envelopes/1");
            assert.equal(response.body.code, 200);
        });

        it("should respond with a 400 status code if not found", async () => {
            const response = await request(app).get("/api/v1/envelopes/10000");
            assert.equal(response.body.code, 400);
        });

        it("should respond with a 404 status code if endpoint is wrong", async () => {
            const response = await request(app).get("/api/v1/envelopess/1");
            assert.equal(response.statusCode, 404);
        });
    });

    describe("POST /api/v1/envelopes", () => {
        it("should respond with a 201 status code if the record saved succesfully", async () => {
            const response = await request(app).post("/api/v1/envelopes").send({
                title: "Testing",
                budget: 200,
            });
            assert.equal(response.body.code, 201);
        });

        it("should respond with a 400 status code if title param is missing", async () => {
            const response = await request(app).post("/api/v1/envelopes").send({
                budget: 200,
            });
            assert.equal(response.body.code, 400);
        });

        it("should respond with a 400 status code if budget param is missing", async () => {
            const response = await request(app).post("/api/v1/envelopes").send({
                title: "Testing",
            });
            assert.equal(response.body.code, 400);
        });

        it("should respond with a 404 status code if endpoint is wrong", async () => {
            const response = await request(app).get("/api/v1/envelopess");
            assert.equal(response.statusCode, 404);
        });
    });

    describe("DEL /api/v1/envelopes/:id", () => {
        it("should respond with a 200 status code if it was deleted succesfully", async () => {
            const response = await request(app).get("/api/v1/envelopes/1");
            assert.equal(response.body.code, 200);
        });

        it("should respond with a 400 status code if not found", async () => {
            const response = await request(app).get("/api/v1/envelopes/10000");
            assert.equal(response.body.code, 400);
        });

        it("should respond with a 404 status code if endpoint is wrong", async () => {
            const response = await request(app).get("/api/v1/envelopess/1");
            assert.equal(response.statusCode, 404);
        });
    });

    describe("PATCH /api/v1/envelopes/:id", () => {
        it("should respond with a 200 status code if it was updated succesfully", async () => {
            const response = await request(app).get("/api/v1/envelopes/1");
            assert.equal(response.body.code, 200);
        });

        it("should respond with a 400 status code if not found", async () => {
            const response = await request(app).get("/api/v1/envelopes/10000");
            assert.equal(response.body.code, 400);
        });

        it("should respond with a 404 status code if endpoint is wrong", async () => {
            const response = await request(app).get("/api/v1/envelopess/1");
            assert.equal(response.statusCode, 404);
        });
    });
});
