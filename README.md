# 🌱 MakeImpact

[![npm version](https://img.shields.io/npm/v/makeimpact.svg)](https://www.npmjs.com/package/makeimpact)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-blue)](https://www.typescriptlang.org/)

> Official JavaScript SDK for 1ClickImpact - Easily integrate environmental impact actions into your applications

## 📦 Installation

```bash
npm install makeimpact
# or
yarn add makeimpact
# or
pnpm add makeimpact
```

## 🚀 Getting Started

You'll need an API key to use this SDK. You can get a free API key from [1ClickImpact's pricing page](https://www.1clickimpact.com/pricing).

```javascript
import { OneClickImpact, Environment } from "makeimpact";

// Initialize the SDK with your API key (production environment by default)
const sdk = new OneClickImpact("your_api_key");

// Create environmental impact with just a few lines of code
await sdk.plantTree({ amount: 1 });
await sdk.cleanOcean({ amount: 5 });
await sdk.captureCarbon({ amount: 2 });
```

## 🌍 Environmental Impact Actions

### 🌳 Plant Trees

Help combat deforestation and climate change by planting trees.

```javascript
// Plant a single tree
await sdk.plantTree({ amount: 1 });

// Plant trees with a specific category
await sdk.plantTree({ amount: 10, category: "food" });

// Plant trees with customer tracking
await sdk.plantTree({
  amount: 5,
  customerEmail: "customer@example.com",
  customerName: "John Doe",
});
```

### 🌊 Clean Ocean Plastic

Remove plastic waste from our oceans to protect marine life.

```javascript
// Clean 5 pounds of ocean plastic
await sdk.cleanOcean({ amount: 5 });

// Clean ocean plastic with customer tracking
await sdk.cleanOcean({
  amount: 10,
  customerEmail: "customer@example.com",
  customerName: "John Doe",
});
```

### ♻️ Capture Carbon

Reduce greenhouse gas emissions by capturing carbon.

```javascript
// Capture 2 pounds of carbon
await sdk.captureCarbon({ amount: 2 });

// Capture carbon with customer tracking
await sdk.captureCarbon({
  amount: 5,
  customerEmail: "customer@example.com",
  customerName: "John Doe",
});
```

### 💰 Donate Money

Support environmental causes through direct monetary donations.

```javascript
// Donate $1.00 (amount in cents)
await sdk.donateMoney({ amount: 100 });

// Donate with customer tracking
await sdk.donateMoney({
  amount: 500, // $5.00
  customerEmail: "customer@example.com",
  customerName: "John Doe",
});
```

> **Note**: To set up a custom cause for donations, please contact 1ClickImpact directly.
> All causes must be vetted and approved to ensure they meet their standards for transparency and impact.

## 📊 Data Access & Reporting

### Get Records

Retrieve impact records with optional filtering.

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

Retrieve records for specific customers.

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
```

### Get Customers

Retrieve customer information.

```javascript
// Get all customers (default limit is 10)
const customers = await sdk.getCustomers();

// Get customers with filtering and pagination
const filteredCustomers = await sdk.getCustomers({
  customerEmail: "example@email.com", // Optional: Filter by email
  limit: 50, // Optional: Limit results (1-1000)
  cursor: "cursor_from_previous_response", // Optional: For pagination
});
```

### Get Impact

Get aggregated impact statistics.

```javascript
// Get overall impact statistics for your organization
const impact = await sdk.getImpact();

console.log(`Trees planted: ${impact.treePlanted}`);
console.log(`Ocean waste removed: ${impact.wasteRemoved} lbs`);
console.log(`Carbon captured: ${impact.carbonCaptured} lbs`);
console.log(`Money donated: $${impact.moneyDonated / 100}`);
```

### Who Am I

Verify your API key and get account information.

```javascript
// Verify API key and get account information
const accountInfo = await sdk.whoAmI();
```

## ⚙️ Configuration

### Environments

The SDK supports two environments:

- **Production** (default): Uses the live API at `https://api.1clickimpact.com`
- **Sandbox**: Uses the testing API at `https://sandbox.1clickimpact.com`

To use the sandbox environment for testing:

```javascript
import { OneClickImpact, Environment } from "makeimpact";

// Initialize with sandbox environment
const sdk = new OneClickImpact("your_test_api_key", Environment.SANDBOX);
```

## 🔗 Additional Resources

- [1ClickImpact API Documentation](https://docs.1clickimpact.com/plant-trees)
- [1ClickImpact Website](https://www.1clickimpact.com)
- [Pricing & API Keys](https://www.1clickimpact.com/pricing)

## 📄 License

MIT
