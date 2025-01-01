export interface CreateTenantModel {
    CompanyName: string,
    Floor: string,
    StaffCount: number,
    Attachment: string,
    OwnerName:string,
    Contact_Number: string,
    Email:string,
    CNIC: string,
    Address: string,
}

// Class Implementation
export class CreateTenant implements CreateTenantModel {
    constructor(
       public CompanyName: string,
       public Floor: string,
       public StaffCount: number,
       public Attachment: string,
       public OwnerName:string,
       public Contact_Number: string,
       public Email:string,
       public CNIC: string,
       public Address: string,
    ) {}
}
