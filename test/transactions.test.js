import request from "supertest";
import assert from "assert";
import app from "../src/v1/server.js";

describe("Transactions endpoint", () => {
    describe("GET /api/v1/transactions", () => {
        it("should respond with a 200 status code if is correct", async () => {
            const response = await request(app).get("/api/v1/transactions");
            assert.equal(response.body.code, 200);
        });

        it("should responde with a 404 status code if fail", async () => {
            const response = await request(app).get("/api/v1/transactionss");
            assert.equal(response.statusCode, 404);
        });
    });

    describe("GET /api/v1/transactions/:id", () => {
        it("should responde with a 200 status code if is correct", async () => {
            const response = await request(app).get("/api/v1/transactions/1");
            assert.equal(response.body.code, 200);
        });

        it("should respond with a 400 status code if not found", async () => {
            const response = await request(app).get("/api/v1/transactions/10000");
            assert.equal(response.body.code, 400);
        });

        it("should respond with a 404 status code if endpoint is wrong", async () => {
            const response = await request(app).get("/api/v1/transactionss/1");
            assert.equal(response.statusCode, 404);
        });
    });

    describe("POST /api/v1/transactions/:fromId/transfer/:toId", async () => {
        it("should respond with a 201 status code if the record saved succesfully", async () => {
            const response = await request(app).post("/api/v1/transactions/1/transfer/2").send({
                amount: 10,
            });
            assert.equal(response.statusCode, 201);
        });

        it("should respond with a 404 status code if 'from id' is not found", async () => {
            const response = await request(app).post("/api/v1/transactions/1000000/transfer/2").send({
                amount: 10,
            });
            assert.equal(response.statusCode, 404);
        });

        it("should respond with a 404 status code if 'to id' is not found", async () => {
            const response = await request(app).post("/api/v1/transactions/1/transfer/1000000").send({
                amount: 10,
            });
            assert.equal(response.statusCode, 404);
        });

        it("should respond with a 404 status code if dont receive an amount", async () => {
            const response = await request(app).post("/api/v1/transactions/1/transfer/2");
            assert.equal(response.statusCode, 404);
        });

        it("should respond with a 404 status code if 'from id' item has not enought budget", async () => {
            const response = await request(app).post("/api/v1/transactions/1/transfer/2").send({
                amount: 10000,
            });
            assert.equal(response.statusCode, 404);
        });

        it("should respond with a 404 status code if endpoint is wrong", async () => {
            const response = await request(app).get("/api/v1/transactionss/1/transfer/2").send({
                amount: 10,
            });
            assert.equal(response.statusCode, 404);
        });
    });
});
