import { OneClickImpact, Environment } from "../src";
import fetch from "node-fetch";

describe("OneClickImpact SDK", () => {
  let sdk: OneClickImpact;
  // Use environment variable with fallback
  const apiKey = process.env.TEST_API_KEY;

  // Skip tests if no API key is provided
  beforeAll(() => {
    if (!apiKey) {
      console.warn(
        "⚠️ No TEST_API_KEY environment variable found. Skipping live API tests."
      );
    }
  });

  beforeEach(() => {
    // Skip all tests if no API key is provided
    if (!apiKey) {
      return;
    }

    // Initialize the SDK with the real API key
    sdk = new OneClickImpact(apiKey, Environment.SANDBOX);
  });

  // Helper to conditionally run tests
  const testIf = (condition: boolean) => (condition ? test : test.skip);

  describe("Initialization", () => {
    test("should throw error when API key is not provided", () => {
      expect(() => new OneClickImpact("")).toThrow("API key is required");
    });

    test("should throw error when API key does not exist", async () => {
      const invalidSdk = new OneClickImpact(
        "incorrect_api_key",
        Environment.SANDBOX
      );
      await expect(invalidSdk.whoAmI()).rejects.toThrow(
        "1ClickImpact API Error: key_error: API Key does not exist"
      );
    });

    testIf(!!apiKey)("should initialize with API key", async () => {
      const testSdk = new OneClickImpact(apiKey as string, Environment.SANDBOX);
      expect(testSdk).toBeInstanceOf(OneClickImpact);
    });
  });

  describe("Who Am I", () => {
    testIf(!!apiKey)("should verify API key", async () => {
      const response = await sdk.whoAmI();
      expect(response).toBeDefined();
    });
  });

  describe("Get Impact", () => {
    testIf(!!apiKey)("should get impact statistics", async () => {
      const response = await sdk.getImpact();
      expect(response).toBeDefined();
    });
  });

  describe("Plant Trees", () => {
    testIf(!!apiKey)("should plant trees", async () => {
      const response = await sdk.plantTree({ amount: 1 });
      expect(response).toBeDefined();
      expect(response.userID).toBeTruthy();
      expect(response.treePlanted).toBe(1);
      expect(response.timeUTC).toBeTruthy();
      expect(response.customer).toBeUndefined();
      expect(response.category).toBeUndefined();
    });

    testIf(!!apiKey)("should plant trees with category", async () => {
      const response = await sdk.plantTree({
        amount: 1,
        category: "food",
      });
      expect(response).toBeDefined();
      expect(response.userID).toBeTruthy();
      expect(response.treePlanted).toBe(1);
      expect(response.timeUTC).toBeTruthy();
      expect(response.customer).toBeUndefined();
      expect(response.category).toBe("food");
    });

    testIf(!!apiKey)("should plant trees with customer info", async () => {
      const response = await sdk.plantTree({
        amount: 1,
        customerEmail: "test@example.com",
        customerName: "Test User",
      });
      expect(response).toBeDefined();
      expect(response.userID).toBeTruthy();
      expect(response.treePlanted).toBe(1);
      expect(response.timeUTC).toBeTruthy();
      expect(response.customer).toBeDefined();
      expect(response.customer?.customerID).toBeTruthy();
      expect(response.customer?.CustomerInfo).toBeDefined();
      expect(response.customer?.CustomerInfo.customerEmail).toBe(
        "test@example.com"
      );
      expect(response.customer?.CustomerInfo.customerName).toBe("Test User");
      expect(response.category).toBeUndefined();
    });
  });

  describe("Clean Ocean", () => {
    testIf(!!apiKey)("should clean ocean waste", async () => {
      const response = await sdk.cleanOcean({ amount: 1 });
      expect(response).toBeDefined();
      expect(response.userID).toBeTruthy();
      expect(response.wasteRemoved).toBe(1);
      expect(response.timeUTC).toBeTruthy();
      expect(response.customer).toBeUndefined();
    });

    testIf(!!apiKey)("should clean ocean waste with customer info", async () => {
      const response = await sdk.cleanOcean({
        amount: 1,
        customerEmail: "test@example.com",
        customerName: "Test User",
      });
      expect(response).toBeDefined();
      expect(response.userID).toBeTruthy();
      expect(response.wasteRemoved).toBe(1);
      expect(response.timeUTC).toBeTruthy();
      expect(response.customer).toBeDefined();
      expect(response.customer?.customerID).toBeTruthy();
      expect(response.customer?.CustomerInfo).toBeDefined();
      expect(response.customer?.CustomerInfo.customerEmail).toBe("test@example.com");
      expect(response.customer?.CustomerInfo.customerName).toBe("Test User");
    });
  });

  describe("Capture Carbon", () => {
    testIf(!!apiKey)("should capture carbon", async () => {
      const response = await sdk.captureCarbon({ amount: 1 });
      expect(response).toBeDefined();
      expect(response.userID).toBeTruthy();
      expect(response.carbonCaptured).toBe(1);
      expect(response.timeUTC).toBeTruthy();
      expect(response.customer).toBeUndefined();
    });

    testIf(!!apiKey)("should capture carbon with customer info", async () => {
      const response = await sdk.captureCarbon({
        amount: 1,
        customerEmail: "test@example.com",
        customerName: "Test User",
      });
      expect(response).toBeDefined();
      expect(response.userID).toBeTruthy();
      expect(response.carbonCaptured).toBe(1);
      expect(response.timeUTC).toBeTruthy();
      expect(response.customer).toBeDefined();
      expect(response.customer?.customerID).toBeTruthy();
      expect(response.customer?.CustomerInfo).toBeDefined();
      expect(response.customer?.CustomerInfo.customerEmail).toBe("test@example.com");
      expect(response.customer?.CustomerInfo.customerName).toBe("Test User");
    });
  });

  describe("Donate Money", () => {
    testIf(!!apiKey)("should donate money", async () => {
      const response = await sdk.donateMoney({ amount: 100 }); // $1.00
      expect(response).toBeDefined();
      expect(response.userID).toBeTruthy();
      expect(response.moneyDonated).toBe(100);
      expect(response.timeUTC).toBeTruthy();
      expect(response.customer).toBeUndefined();
    });

    testIf(!!apiKey)("should donate money with customer info", async () => {
      const response = await sdk.donateMoney({
        amount: 100, // $1.00
        customerEmail: "test@example.com",
        customerName: "Test User",
      });
      expect(response).toBeDefined();
      expect(response.userID).toBeTruthy();
      expect(response.moneyDonated).toBe(100);
      expect(response.timeUTC).toBeTruthy();
      expect(response.customer).toBeDefined();
      expect(response.customer?.customerID).toBeTruthy();
      expect(response.customer?.CustomerInfo).toBeDefined();
      expect(response.customer?.CustomerInfo.customerEmail).toBe("test@example.com");
      expect(response.customer?.CustomerInfo.customerName).toBe("Test User");
    });
  });

  describe("Get Records", () => {
    testIf(!!apiKey)("should get all records", async () => {
      const response = await sdk.getRecords();
      expect(response).toBeDefined();
      expect(response.userRecords).toBeDefined();
      expect(Array.isArray(response.userRecords)).toBe(true);
    });

    testIf(!!apiKey)("should get records with filters", async () => {
      const response = await sdk.getRecords({
        filterBy: "tree_planted",
        limit: 5
      });
      expect(response).toBeDefined();
      expect(response.userRecords).toBeDefined();
      expect(Array.isArray(response.userRecords)).toBe(true);
      expect(response.userRecords.length).toBeLessThanOrEqual(5);
    });
  });

  describe("Get Customer Records", () => {
    testIf(!!apiKey)("should get customer records", async () => {
      // First create a record with a customer
      await sdk.plantTree({
        amount: 1,
        customerEmail: "test_customer@example.com",
        customerName: "Test Customer",
      });

      const response = await sdk.getCustomerRecords({
        customerEmail: "test_customer@example.com"
      });
      expect(response).toBeDefined();
      expect(response.customerRecords).toBeDefined();
      expect(Array.isArray(response.customerRecords)).toBe(true);
    });
  });

  describe("Get Customers", () => {
    testIf(!!apiKey)("should get all customers", async () => {
      const response = await sdk.getCustomers();
      expect(response).toBeDefined();
      expect(response.customers).toBeDefined();
      expect(Array.isArray(response.customers)).toBe(true);
    });

    testIf(!!apiKey)("should get customer by email", async () => {
      // Create a customer first
      await sdk.plantTree({
        amount: 1,
        customerEmail: "filtered_customer@example.com",
        customerName: "Filtered Customer",
      });

      const response = await sdk.getCustomers({
        customerEmail: "filtered_customer@example.com"
      });
      expect(response).toBeDefined();
      expect(response.customers).toBeDefined();
      expect(Array.isArray(response.customers)).toBe(true);
      
      if (response.customers.length > 0) {
        const customer = response.customers[0];
        expect(customer.customerEmail).toBe("filtered_customer@example.com");
        expect(customer.customerName).toBe("Filtered Customer");
        expect(customer.customerID).toBeTruthy();
        expect(customer.onboardedOn).toBeTruthy();
      }
    });
  });
});
