const { calculateRiskScore } = require("../services/riskService");

test("high amount gives high risk", () => {
    expect(calculateRiskScore(200000)).toBeGreaterThan(0.7);
});
