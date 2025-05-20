export enum Environment {
  PRODUCTION = "production",
  SANDBOX = "sandbox",
}

export interface CustomerInfo {
  customerEmail?: string;
  customerName?: string;
}
export interface Customer {
  customerID: string;
  CustomerInfo: CustomerInfo;
}

export interface PlantTreeParams extends CustomerInfo {
  amount: number;
  category?: string;
}
// Plant tree response
export interface PlantTreeResponse {
  userID: string;
  treePlanted: number;
  category?: string;
  customer?: Customer;
  timeUTC: string;
}

export interface CleanOceanParams extends CustomerInfo {
  amount: number;
}

// Clean ocean response
export interface CleanOceanResponse {
  userID: string;
  wasteRemoved: number;
  customer?: Customer;
  timeUTC: string;
}

export interface CaptureCarbonParams extends CustomerInfo {
  amount: number;
}

// Capture carbon response
export interface CaptureCarbonResponse {
  userID: string;
  carbonCaptured: number;
  customer?: Customer;
  timeUTC: string;
}

export interface DonateMoneyParams extends CustomerInfo {
  amount: number;
}

// Donate money response
export interface DonateMoneyResponse {
  userID: string;
  moneyDonated: number;
  customer?: Customer;
  timeUTC: string;
}

export interface ErrorResponse {
  type: string;
  message: string;
}

export interface GetRecordsParams {
  filterBy?: string;
  startDate?: string;
  endDate?: string;
  cursor?: string;
  limit?: number;
}

// Individual impact record types
export interface BaseRecord {
  userID: string;
  timeUTC: string;
}

export interface TreePlantedRecord extends BaseRecord {
  treePlanted: number;
  category?: string;
}

export interface WasteRemovedRecord extends BaseRecord {
  wasteRemoved: number;
}

export interface CarbonCapturedRecord extends BaseRecord {
  carbonCaptured: number;
}

export interface MoneyDonatedRecord extends BaseRecord {
  moneyDonated: number;
}

export type ImpactRecord =
  | TreePlantedRecord
  | WasteRemovedRecord
  | CarbonCapturedRecord
  | MoneyDonatedRecord;

export interface GetRecordsResponse {
  userRecords: ImpactRecord[];
  cursor?: string;
}

export interface GetCustomerRecordsParams extends GetRecordsParams {
  customerEmail?: string;
}

export interface GetCustomersParams {
  customerEmail?: string;
  limit?: number;
  cursor?: string;
}

export interface CustomerDetails {
  customerID: string;
  customerEmail: string;
  customerName?: string;
  onboardedOn: string;
}

export interface GetCustomersResponse {
  customers: CustomerDetails[];
  cursor?: string;
}

export interface ImpactResponse {
  userID: string;
  treePlanted: number;
  wasteRemoved: number;
  carbonCaptured: number;
  moneyDonated: number;
}

export interface WhoAmIResponse {
  userID: string;
  email: string;
}

export interface BaseRecordWithCustomer extends BaseRecord {
  customer: Customer;
}

export interface TreePlantedRecordWithCustomer extends BaseRecordWithCustomer {
  treePlanted: number;
  category?: string;
}

export interface WasteRemovedRecordWithCustomer extends BaseRecordWithCustomer {
  wasteRemoved: number;
}

export interface CarbonCapturedRecordWithCustomer
  extends BaseRecordWithCustomer {
  carbonCaptured: number;
}

export interface MoneyDonatedRecordWithCustomer extends BaseRecordWithCustomer {
  moneyDonated: number;
}

export type CustomerImpactRecord =
  | TreePlantedRecordWithCustomer
  | WasteRemovedRecordWithCustomer
  | CarbonCapturedRecordWithCustomer
  | MoneyDonatedRecordWithCustomer;

export interface GetCustomerRecordsResponse {
  customerRecords: CustomerImpactRecord[];
  cursor?: string;
}
