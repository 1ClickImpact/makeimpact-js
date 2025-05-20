# Testing the 1ClickImpact SDK

This document provides guidelines for testing the 1ClickImpact JavaScript SDK.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with your test API key:

   ```
   TEST_API_KEY=your_sandbox_api_key_here
   ```

   > **Important:** Always use a sandbox API key for testing, never a production key.

## Running Tests

### Run all tests

```bash
npm test
```

### Run specific test file

```bash
npx jest __tests__/client.test.ts
```

### Run tests with a specific name pattern

```bash
npx jest -t "should plant trees"
```

### Run tests with coverage report

```bash
npm test -- --coverage
```

After running tests with coverage, open `coverage/lcov-report/index.html` in your browser to view the detailed coverage report.

## Test Modes

The test suite can run in two modes:

### 1. With API Key (Integration Tests)

When you provide a `TEST_API_KEY` in your `.env` file, the tests will make real API calls to the sandbox environment. This is useful for end-to-end testing and ensures that the SDK correctly interacts with the 1ClickImpact API.

> **Note:** Running integration tests will create real records in the sandbox environment and count towards your API usage limits.

### 2. Without API Key (Unit Tests)

If no `TEST_API_KEY` is provided, only the basic functionality tests will run. These don't make actual API calls but still test the SDK's core functionality.

## Test Structure

The tests are organized by SDK functions:

- Initialization tests
- Environmental impact tests (plant trees, clean ocean, etc.)
- Data access tests (records, customers, impact statistics)

Each function has tests for:

- Basic functionality
- Parameter handling
- Error conditions
- Response parsing

## Adding New Tests

When adding new functionality to the SDK, please ensure you add corresponding tests that cover:

1. Happy path (expected usage)
2. Edge cases
3. Error handling

## Debugging Tests

If you need to debug tests, you can add the `--verbose` flag:

```bash
npm test -- --verbose
```

For more detailed logging, uncomment the console.log statements in the `makeRequest` method of the client.
