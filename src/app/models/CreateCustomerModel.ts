export interface CreateCustomerModel {
    name: string;             // Customer Name
    ntn: string;              // NTN Number
    poc_name: string;         // POC Name
    poc_email: string;        // POC Email
    poc_number: string;       // POC Number
    cnic: string;             // CNIC Number
    region_id:number;
    region: string;           // Region
    key_account: string;      // Key Account Status
    industry_id:number;
    industry: string;         // Industry
    default_kam_id:number;
    default_kam: string;      // Default KAM
    billing_address: string;  // Billing Address
    description: string;      // Description
}

// Class Implementation
export class CreateCustomer implements CreateCustomerModel {
    constructor(
        public name: string,
        public ntn: string,
        public poc_name: string,
        public poc_email: string,
        public poc_number: string,
        public cnic: string,
        public region_id:number,
        public region: string,
        public key_account: string,
        public industry_id:number,
        public industry: string,
        public default_kam_id:number,
        public default_kam: string,
        public billing_address: string,
        public description: string
    ) {}
}
