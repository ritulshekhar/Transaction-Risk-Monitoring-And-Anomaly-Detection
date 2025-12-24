const request = require("supertest");
const app = require("../index");

describe("POST /api/transactions", () => {
    it("creates a transaction", async () => {
        const res = await request(app)
            .post("/api/transactions")
            .send({ userId: "u1", amount: 1000 });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("riskScore");
    });
});
