// Load environment variables from .env file
require("dotenv").config();

// Ensure we have a test API key
process.env.TEST_API_KEY = process.env.TEST_API_KEY || "test_api_key";
