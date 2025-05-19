# MakeImpact

Official JavaScript SDK for 1ClickImpact - Easily integrate environmental impact actions into your application.

## Installation

```bash
npm install makeimpact
# or
yarn add makeimpact
```

## Getting Started

You'll need an API key to use this SDK. You can get a free API key from [1ClickImpact's pricing page](https://www.1clickimpact.com/pricing).

```javascript
import { OneClickImpact, Environment } from "makeimpact";

// Initialize the SDK with your API key (production environment by default)
const sdk = new OneClickImpact("your_api_key");

// Or specify the sandbox environment for testing
const testSdk = new OneClickImpact("your_test_api_key", Environment.SANDBOX);

// Plant trees
await sdk.plantTree({ amount: 1 });

// Plant trees with a specific category
await sdk.plantTree({ amount: 1, category: "food" });

// Clean ocean plastic
await sdk.cleanOcean({ amount: 5 });

// Capture carbon
await sdk.captureCarbon({ amount: 2 });

// To engage customers and help them see their personal contribution, include the customer information in your request.
// After impact, we'll automatically send them an email with a secure link to track their impact in real time via a personalized dashboard.
await sdk.plantTree({
  amount: 1,
  customerEmail: "customer@example.com",
  customerName: "John Doe",
});
```

## Environments

The SDK supports two environments:

- **Production** (default): Uses the live API at `https://api.1clickimpact.com`
- **Sandbox**: Uses the testing API at `https://sandbox.1clickimpact.com`

To use the sandbox environment for testing:

```javascript
import { OneClickImpact, Environment } from "makeimpact";

const sdk = new OneClickImpact("your_test_api_key", Environment.SANDBOX);
```

## API Reference

### Initialize the SDK

```javascript
// Production environment (default)
const sdk = new OneClickImpact("your_api_key");

// Or sandbox environment for testing
const sdk = new OneClickImpact("your_test_api_key", Environment.SANDBOX);
```

### Plant Trees

```javascript
await sdk.plantTree({
  amount: number,       // Required: Number of trees to plant (1-10,000,000)
  category?: string,    // Optional: Category for the tree planting
  customerEmail?: string, // Optional: Customer's email
  customerName?: string   // Optional: Customer's name (only used if email is provided)
});
```

### Clean Ocean

```javascript
await sdk.cleanOcean({
  amount: number,       // Required: Amount of waste to clean in pounds (lbs) (1-10,000,000)
  customerEmail?: string, // Optional: Customer's email
  customerName?: string   // Optional: Customer's name (only used if email is provided)
});
```

### Capture Carbon

```javascript
await sdk.captureCarbon({
  amount: number,       // Required: Amount of carbon to capture in pounds (lbs) (1-10,000,000)
  customerEmail?: string, // Optional: Customer's email
  customerName?: string   // Optional: Customer's name (only used if email is provided)
});
```

### Donate Money

```javascript
await sdk.donateMoney({
  amount: number,       // Required: Amount in smallest USD units (cents). For example, $1 = 100, $0.10 = 10
                        // Must be between 1 and 1,000,000,000 units
  customerEmail?: string, // Optional: Customer's email
  customerName?: string   // Optional: Customer's name (only used if email is provided)
});
```

> Note: To set up a custom cause for donations, please contact 1ClickImpact directly.
> All causes must be vetted and approved to ensure they meet their standards for transparency and impact.

### Get Records

```javascript
// Get all records
const records = await sdk.getRecords();

// Filter records by type
const treeRecords = await sdk.getRecords({
  filterBy: "tree_planted",
});

// Filter records by date range
const recentRecords = await sdk.getRecords({
  startDate: "2023-01-01",
  endDate: "2023-12-31",
});

// Pagination
const paginatedRecords = await sdk.getRecords({
  cursor: "cursor_from_previous_response",
  limit: 10,
});
```

### Get Customer Records

```javascript
// Get records for a specific customer
const customerRecords = await sdk.getCustomerRecords({
  customerEmail: "customer@example.com",
});

// Filter customer records by type
const customerTreeRecords = await sdk.getCustomerRecords({
  customerEmail: "customer@example.com",
  filterBy: "tree_planted",
});

// Pagination for customer records
const paginatedCustomerRecords = await sdk.getCustomerRecords({
  customerEmail: "customer@example.com",
  cursor: "cursor_from_previous_response",
  limit: 10,
});
```

### Get Customers

```javascript
// Get all customers (default limit is 10)
const customers = await sdk.getCustomers();

// Get customers with optional query parameters
const filteredCustomers = await sdk.getCustomers({
  customerEmail: "example@email.com", // Optional: Filter by customer email
  limit: 50, // Optional: Limit results (1-1000, default is 10)
  cursor: "cursor_from_previous_response", // Optional: For pagination
});
```

### Get Impact

```javascript
// Get impact statistics
const impact = await sdk.getImpact();
```

### Who Am I

```javascript
// Verify API key and get account information
const accountInfo = await sdk.whoAmI();
```

## Documentation

For more details about the 1ClickImpact API, visit [1ClickImpact API Documentation](https://docs.1clickimpact.com/plant-trees).

## License

MIT
