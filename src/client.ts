import {
  PlantTreeParams,
  CleanOceanParams,
  CaptureCarbonParams,
  DonateMoneyParams,
  GetRecordsParams,
  GetCustomerRecordsParams,
  GetCustomersParams,
  ApiResponse,
  Environment,
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
   * @returns API response
   */
  async plantTree(params: PlantTreeParams): Promise<ApiResponse> {
    const { amount, category, customerEmail, customerName } = params;

    const body: Record<string, any> = {
      amount,
    };

    if (category) body.category = category;
    if (customerEmail) {
      body.customer_email = customerEmail;
      if (customerName) body.customer_name = customerName;
    }

    return this.makeRequest("/v1/plant_trees", body);
  }

  /**
   * Clean ocean plastic through 1ClickImpact
   * @param params - Configuration for cleaning ocean plastic
   * @param params.amount - Amount of waste to clean in pounds (lbs) (1-10,000,000)
   * @param params.customerEmail - Optional: Customer's email
   * @param params.customerName - Optional: Customer's name (only used if email is provided)
   * @returns API response
   */
  async cleanOcean(params: CleanOceanParams): Promise<ApiResponse> {
    const { amount, customerEmail, customerName } = params;

    const body: Record<string, any> = {
      amount,
    };

    if (customerEmail) {
      body.customer_email = customerEmail;
      if (customerName) body.customer_name = customerName;
    }

    return this.makeRequest("/v1/clean_ocean", body);
  }

  /**
   * Capture carbon through 1ClickImpact
   * @param params - Configuration for capturing carbon
   * @param params.amount - Amount of carbon to capture in pounds (lbs) (1-10,000,000)
   * @param params.customerEmail - Optional: Customer's email
   * @param params.customerName - Optional: Customer's name (only used if email is provided)
   * @returns API response
   */
  async captureCarbon(params: CaptureCarbonParams): Promise<ApiResponse> {
    const { amount, customerEmail, customerName } = params;

    const body: Record<string, any> = {
      amount,
    };

    if (customerEmail) {
      body.customer_email = customerEmail;
      if (customerName) body.customer_name = customerName;
    }

    return this.makeRequest("/v1/capture_carbon", body);
  }

  /**
   * Donate money through 1ClickImpact
   * @param params - Configuration for donating money
   * @param params.amount - Amount in smallest USD units (cents). For example, $1 = 100, $0.10 = 10 (1-1,000,000,000)
   * @param params.customerEmail - Optional: Customer's email
   * @param params.customerName - Optional: Customer's name (only used if email is provided)
   * @returns API response
   */
  async donateMoney(params: DonateMoneyParams): Promise<ApiResponse> {
    const { amount, customerEmail, customerName } = params;

    const body: Record<string, any> = {
      amount,
    };

    if (customerEmail) {
      body.customer_email = customerEmail;
      if (customerName) body.customer_name = customerName;
    }

    return this.makeRequest("/v1/donate_money", body);
  }

  /**
   * Get impact statistics
   * @returns Impact statistics for your organization
   */
  async getImpact(): Promise<ApiResponse> {
    return this.makeRequest("/v1/impact", null, "GET");
  }

  /**
   * Verify API key and get account information
   * @returns Account information for the provided API key
   */
  async whoAmI(): Promise<ApiResponse> {
    return this.makeRequest("/v1/whoami", null, "GET");
  }

  /**
   * Get impact records
   * @param params - Optional parameters to filter records
   * @param params.filterBy - Optional: Filter records by type (Can be "tree_planted", "waste_removed", "carbon_captured", or "money_donated")
   * @param params.startDate - Optional: Filter records created on or after this date (format: YYYY-MM-DD)
   * @param params.endDate - Optional: Filter records created on or before this date (format: YYYY-MM-DD)
   * @param params.cursor - Optional: Pagination cursor from previous response for fetching next page
   * @param params.limit - Optional: Maximum number of records to return (1-1000, default: 10)
   * @returns Records based on the provided filters
   */
  async getRecords(params: GetRecordsParams = {}): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();

    if (params.filterBy) queryParams.append("filter_by", params.filterBy);
    if (params.startDate) queryParams.append("start_date", params.startDate);
    if (params.endDate) queryParams.append("end_date", params.endDate);
    if (params.cursor) queryParams.append("cursor", params.cursor);
    if (params.limit !== undefined)
      queryParams.append("limit", params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `/v1/records${queryString ? "?" + queryString : ""}`;

    return this.makeRequest(endpoint, null, "GET");
  }

  /**
   * Get customer records
   * @param params - Optional parameters to filter customer records
   * @param params.customerEmail - Optional: Filter records by customer email
   * @param params.filterBy - Optional: Filter records by type (Can be "tree_planted", "waste_removed", "carbon_captured", or "money_donated")
   * @param params.startDate - Optional: Filter records created on or after this date (format: YYYY-MM-DD)
   * @param params.endDate - Optional: Filter records created on or before this date (format: YYYY-MM-DD)
   * @param params.cursor - Optional: Pagination cursor from previous response for fetching next page
   * @param params.limit - Optional: Maximum number of records to return (1-1000, default: 10)
   * @returns Customer records based on the provided filters
   */
  async getCustomerRecords(
    params: GetCustomerRecordsParams = {}
  ): Promise<ApiResponse> {
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

    return this.makeRequest(endpoint, null, "GET");
  }

  /**
   * Get customers
   * @param params - Optional parameters to filter customers
   * @param params.customerEmail - Optional: Filter customers by email
   * @param params.limit - Optional: Maximum number of customers to return (1-1000, default: 10)
   * @param params.cursor - Optional: Pagination cursor from previous response for fetching next page
   * @returns Customers based on the provided filters
   */
  async getCustomers(params: GetCustomersParams = {}): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();

    if (params.customerEmail)
      queryParams.append("customer_email", params.customerEmail);
    if (params.limit !== undefined)
      queryParams.append("limit", params.limit.toString());
    if (params.cursor) queryParams.append("cursor", params.cursor);

    const queryString = queryParams.toString();
    const endpoint = `/v1/customers${queryString ? "?" + queryString : ""}`;

    return this.makeRequest(endpoint, null, "GET");
  }

  /**
   * Makes a request to the 1ClickImpact API
   * @param endpoint - API endpoint
   * @param body - Request body
   * @param method - HTTP method (default: POST)
   * @returns API response
   */
  private async makeRequest(
    endpoint: string,
    body: Record<string, any> | null,
    method: string = "POST"
  ): Promise<ApiResponse> {
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
      };

      if (body && method !== "GET") {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, options);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || `Request failed with status ${response.status}`
        );
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
