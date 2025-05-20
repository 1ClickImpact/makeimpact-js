import {
  PlantTreeParams,
  CleanOceanParams,
  CaptureCarbonParams,
  DonateMoneyParams,
  GetRecordsParams,
  GetCustomerRecordsParams,
  GetCustomersParams,
  Environment,
  PlantTreeResponse,
  CleanOceanResponse,
  CaptureCarbonResponse,
  DonateMoneyResponse,
  Customer,
  GetRecordsResponse,
  GetCustomerRecordsResponse,
  GetCustomersResponse,
  ImpactResponse,
  WhoAmIResponse,
} from "./types";

export class OneClickImpact {
  private apiKey: string;
  private baseUrl: string;

  /**
   * Initialize the 1ClickImpact SDK
   * @param apiKey - Your 1ClickImpact API key (get a free key from https://www.1clickimpact.com/pricing)
   * @param environment - Optional: Specify whether to use production or sandbox environment
   */
  constructor(
    apiKey: string,
    environment: Environment = Environment.PRODUCTION
  ) {
    if (!apiKey) {
      throw new Error("API key is required to initialize the 1ClickImpact SDK");
    }
    this.apiKey = apiKey;

    // Set the base URL based on the environment
    this.baseUrl =
      environment === Environment.SANDBOX
        ? "https://sandbox.1clickimpact.com"
        : "https://api.1clickimpact.com";
  }

  /**
   * Plant trees through 1ClickImpact
   * @param params - Configuration for planting trees
   * @param params.amount - Number of trees to plant (1-10,000,000)
   * @param params.category - Optional: Category for the tree planting
   * @param params.customerEmail - Optional: Customer's email
   * @param params.customerName - Optional: Customer's name (only used if email is provided)
   * @returns PlantTreeResponse
   */
  async plantTree(params: PlantTreeParams): Promise<PlantTreeResponse> {
    const { amount, category, customerEmail, customerName } = params;

    const body: Record<string, any> = {
      amount,
    };

    if (category) body.category = category;
    if (customerEmail) {
      body.customer_email = customerEmail;
      if (customerName) body.customer_name = customerName;
    }

    const response = await this.makeRequest("/v1/plant_tree", body);

    // Transform API response to match the PlantTreeResponse interface
    return {
      userID: response.user_id,
      treePlanted: response.tree_planted,
      category: response.category,
      customer: response.customer
        ? {
            customerID: response.customer.customer_id,
            CustomerInfo: {
              customerEmail: response.customer.customer_email,
              customerName: response.customer.customer_name,
            },
          }
        : undefined,
      timeUTC: response.time_utc,
    };
  }

  /**
   * Clean ocean plastic through 1ClickImpact
   * @param params - Configuration for cleaning ocean plastic
   * @param params.amount - Amount of waste to clean in pounds (lbs) (1-10,000,000)
   * @param params.customerEmail - Optional: Customer's email
   * @param params.customerName - Optional: Customer's name (only used if email is provided)
   * @returns CleanOceanResponse
   */
  async cleanOcean(params: CleanOceanParams): Promise<CleanOceanResponse> {
    const { amount, customerEmail, customerName } = params;

    const body: Record<string, any> = {
      amount,
    };

    if (customerEmail) {
      body.customer_email = customerEmail;
      if (customerName) body.customer_name = customerName;
    }

    const response = await this.makeRequest("/v1/clean_ocean", body);

    // Transform API response to match the CleanOceanResponse interface
    return {
      userID: response.user_id,
      wasteRemoved: response.waste_removed,
      customer: response.customer
        ? transformCustomer(response.customer)
        : undefined,
      timeUTC: response.time_utc,
    };
  }

  /**
   * Capture carbon through 1ClickImpact
   * @param params - Configuration for capturing carbon
   * @param params.amount - Amount of carbon to capture in pounds (lbs) (1-10,000,000)
   * @param params.customerEmail - Optional: Customer's email
   * @param params.customerName - Optional: Customer's name (only used if email is provided)
   * @returns CaptureCarbonResponse
   */
  async captureCarbon(
    params: CaptureCarbonParams
  ): Promise<CaptureCarbonResponse> {
    const { amount, customerEmail, customerName } = params;

    const body: Record<string, any> = {
      amount,
    };

    if (customerEmail) {
      body.customer_email = customerEmail;
      if (customerName) body.customer_name = customerName;
    }

    const response = await this.makeRequest("/v1/capture_carbon", body);

    // Transform API response to match the CaptureCarbonResponse interface
    return {
      userID: response.user_id,
      carbonCaptured: response.carbon_captured,
      customer: response.customer
        ? transformCustomer(response.customer)
        : undefined,
      timeUTC: response.time_utc,
    };
  }

  /**
   * Donate money through 1ClickImpact
   * @param params - Configuration for donating money
   * @param params.amount - Amount in smallest USD units (cents). For example, $1 = 100, $0.10 = 10 (1-1,000,000,000)
   * @param params.customerEmail - Optional: Customer's email
   * @param params.customerName - Optional: Customer's name (only used if email is provided)
   * @returns DonateMoneyResponse
   */
  async donateMoney(params: DonateMoneyParams): Promise<DonateMoneyResponse> {
    const { amount, customerEmail, customerName } = params;

    const body: Record<string, any> = {
      amount,
    };

    if (customerEmail) {
      body.customer_email = customerEmail;
      if (customerName) body.customer_name = customerName;
    }

    const response = await this.makeRequest("/v1/donate_money", body);

    // Transform API response to match the DonateMoneyResponse interface
    return {
      userID: response.user_id,
      moneyDonated: response.money_donated,
      customer: response.customer
        ? transformCustomer(response.customer)
        : undefined,
      timeUTC: response.time_utc,
    };
  }

  /**
   * Get impact statistics
   * @returns Impact statistics for your organization
   */
  async getImpact(): Promise<ImpactResponse> {
    const response = await this.makeRequest("/v1/impact", null, "GET");

    return {
      userID: response.user_id,
      treePlanted: response.tree_planted || 0,
      wasteRemoved: response.waste_removed || 0,
      carbonCaptured: response.carbon_captured || 0,
      moneyDonated: response.money_donated || 0,
    };
  }

  /**
   * Verify API key and get account information
   * @returns Account information for the provided API key
   */
  async whoAmI(): Promise<WhoAmIResponse> {
    const response = await this.makeRequest("/v1/whoami", null, "GET");

    return {
      userID: response.user_id,
      email: response.email,
    };
  }

  /**
   * Get impact records
   * @param params - Optional parameters to filter records
   * @param params.filterBy - Optional: Filter records by type. The value could be either "tree_planted", "waste_removed", "carbon_captured" or "money_donated".
   * @param params.startDate - Optional: Filter records created on or after this date (format: YYYY-MM-DD)
   * @param params.endDate - Optional: Filter records created on or before this date (format: YYYY-MM-DD)
   * @param params.cursor - Optional: Pagination cursor from previous response for fetching next page
   * @param params.limit - Optional: Maximum number of records to return (1-1000, default: 10)
   * @returns Records based on the provided filters
   */
  async getRecords(params: GetRecordsParams = {}): Promise<GetRecordsResponse> {
    const queryParams = new URLSearchParams();

    if (params.filterBy) queryParams.append("filter_by", params.filterBy);
    if (params.startDate) queryParams.append("start_date", params.startDate);
    if (params.endDate) queryParams.append("end_date", params.endDate);
    if (params.cursor) queryParams.append("cursor", params.cursor);
    if (params.limit !== undefined)
      queryParams.append("limit", params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `/v1/records${queryString ? "?" + queryString : ""}`;

    const response = await this.makeRequest(endpoint, null, "GET");

    // Transform the API response format to match our SDK interface
    return {
      userRecords: response.user_records.map((record: any) => {
        const baseRecord = {
          userID: record.user_id,
          timeUTC: record.time_utc,
        };

        if (record.tree_planted !== undefined) {
          return {
            ...baseRecord,
            treePlanted: record.tree_planted,
          };
        } else if (record.waste_removed !== undefined) {
          return {
            ...baseRecord,
            wasteRemoved: record.waste_removed,
          };
        } else if (record.carbon_captured !== undefined) {
          return {
            ...baseRecord,
            carbonCaptured: record.carbon_captured,
          };
        } else if (record.money_donated !== undefined) {
          return {
            ...baseRecord,
            moneyDonated: record.money_donated,
          };
        }

        return baseRecord; // Fallback case
      }),
      cursor: response.cursor,
    };
  }

  /**
   * Get customer records
   * @param params - Optional parameters to filter customer records
   * @param params.customerEmail - Optional: Filter records by customer email
   * @param params.filterBy - Optional: Filter records by type. The value could be either "tree_planted", "waste_removed", "carbon_captured" or "money_donated".
   * @param params.startDate - Optional: Filter records created on or after this date (format: YYYY-MM-DD)
   * @param params.endDate - Optional: Filter records created on or before this date (format: YYYY-MM-DD)
   * @param params.cursor - Optional: Pagination cursor from previous response for fetching next page
   * @param params.limit - Optional: Maximum number of records to return (1-1000, default: 10)
   * @returns Customer records based on the provided filters
   */
  async getCustomerRecords(
    params: GetCustomerRecordsParams = {}
  ): Promise<GetCustomerRecordsResponse> {
    const queryParams = new URLSearchParams();

    if (params.customerEmail)
      queryParams.append("customer_email", params.customerEmail);
    if (params.filterBy) queryParams.append("filter_by", params.filterBy);
    if (params.startDate) queryParams.append("start_date", params.startDate);
    if (params.endDate) queryParams.append("end_date", params.endDate);
    if (params.cursor) queryParams.append("cursor", params.cursor);
    if (params.limit !== undefined)
      queryParams.append("limit", params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `/v1/customer_records${
      queryString ? "?" + queryString : ""
    }`;

    const response = await this.makeRequest(endpoint, null, "GET");

    // Transform the API response format to match our SDK interface
    return {
      customerRecords: response.customer_records.map((record: any) => {
        const baseRecord = {
          userID: record.user_id,
          timeUTC: record.time_utc,
          customer: transformCustomer(record.customer),
        };

        if (record.tree_planted !== undefined) {
          return {
            ...baseRecord,
            treePlanted: record.tree_planted,
            category: record.category,
          };
        } else if (record.waste_removed !== undefined) {
          return {
            ...baseRecord,
            wasteRemoved: record.waste_removed,
          };
        } else if (record.carbon_captured !== undefined) {
          return {
            ...baseRecord,
            carbonCaptured: record.carbon_captured,
          };
        } else if (record.money_donated !== undefined) {
          return {
            ...baseRecord,
            moneyDonated: record.money_donated,
          };
        }

        return baseRecord; // Fallback case
      }),
      cursor: response.cursor,
    };
  }

  /**
   * Get customers
   * @param params - Optional parameters to filter customers
   * @param params.customerEmail - Optional: Filter customers by email
   * @param params.limit - Optional: Maximum number of customers to return (1-1000, default: 10)
   * @param params.cursor - Optional: Pagination cursor from previous response for fetching next page
   * @returns Customers based on the provided filters
   */
  async getCustomers(
    params: GetCustomersParams = {}
  ): Promise<GetCustomersResponse> {
    const queryParams = new URLSearchParams();

    if (params.customerEmail)
      queryParams.append("customer_email", params.customerEmail);
    if (params.limit !== undefined)
      queryParams.append("limit", params.limit.toString());
    if (params.cursor) queryParams.append("cursor", params.cursor);

    const queryString = queryParams.toString();
    const endpoint = `/v1/customers${queryString ? "?" + queryString : ""}`;

    const response = await this.makeRequest(endpoint, null, "GET");

    // Transform the API response to match our SDK interface
    return {
      customers: response.customers.map((customer: any) => ({
        customerID: customer.customer_id,
        customerEmail: customer.customer_email,
        customerName: customer.customer_name,
        onboardedOn: customer.onboarded_on,
      })),
      cursor: response.cursor,
    };
  }

  /**
   * Makes a request to the 1ClickImpact API
   * @param endpoint - API endpoint
   * @param body - Request body
   * @param method - HTTP method (default: POST)
   * @returns API response
   * @throws Error if the API returns an error
   */
  private async makeRequest(
    endpoint: string,
    body: Record<string, any> | null,
    method: string = "POST"
  ): Promise<any> {
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${this.apiKey}`,
        },
      };

      if (body && method !== "GET") {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, options);

      const data = await response.json();

      if (!response.ok) {
        if (data.type && data.message) {
          throw new Error(`${data.type}: ${data.message}`);
        }
        throw new Error(`Request failed with status ${response.status}`);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`1ClickImpact API Error: ${error.message}`);
      }
      throw error;
    }
  }
}

/**
 * Helper function to transform customer data from API format to SDK format
 */
function transformCustomer(customerData: any): Customer {
  return {
    customerID: customerData.customer_id,
    CustomerInfo: {
      customerEmail: customerData.customer_email,
      customerName: customerData.customer_name,
    },
  };
}
