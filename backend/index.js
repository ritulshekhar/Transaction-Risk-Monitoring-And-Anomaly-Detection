require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// Connect to database
connectDB();

const app = express();

// CORS configuration for frontend
app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/model", require("./routes/model"));
app.use("/api/audits", require("./routes/audits"));

// Global error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Export for testing
module.exports = app;
