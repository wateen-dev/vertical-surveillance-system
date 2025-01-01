export interface CreateEmployeeRegistrationModel {
    EmployeeName: string,
    ContactNumber: string,
    Email: string,
    CNIC: string,
    Address:string,
    EmployeeCNICImage: string,
    EmployeePictureImage: string,
    dateRange?: string; // Optional string to hold a date range identifier or placeholder
    startDate?: Date;    // Optional Date for start date
    endDate?: Date;      // Optional Date for end date
}

// Class Implementation
export class CreateEmployee implements CreateEmployeeRegistrationModel {
    constructor(
       public EmployeeName: string,
       public ContactNumber: string,
       public Email: string,
       public CNIC: string,
       public Address:string,
       public EmployeeCNICImage: string,
       public EmployeePictureImage: string,
       public dateRange?: string, 
       public startDate?: Date,
       public endDate?: Date,
    ) {}
}
