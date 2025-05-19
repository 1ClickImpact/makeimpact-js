export enum Environment {
  PRODUCTION = "production",
  SANDBOX = "sandbox",
}

export interface CustomerInfo {
  customerEmail?: string;
  customerName?: string;
}

export interface PlantTreeParams extends CustomerInfo {
  amount: number;
  category?: string;
}

export interface CleanOceanParams extends CustomerInfo {
  amount: number;
}

export interface CaptureCarbonParams extends CustomerInfo {
  amount: number;
}

export interface DonateMoneyParams extends CustomerInfo {
  amount: number;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

export interface GetRecordsParams {
  filterBy?: string;
  startDate?: string;
  endDate?: string;
  cursor?: string;
  limit?: number;
}

export interface GetCustomerRecordsParams extends GetRecordsParams {
  customerEmail?: string;
}

export interface GetCustomersParams {
  customerEmail?: string;
  limit?: number;
  cursor?: string;
}
