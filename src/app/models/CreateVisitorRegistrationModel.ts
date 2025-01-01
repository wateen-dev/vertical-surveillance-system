export interface CreateVisitorRegistrationModel {
    visitorName: string,
    companyName:string,
    tenant_id:number,
    tenant_name:string,
    ContactNumber: string,
    Email: string,
    CNIC: string,
}

// Class Implementation
export class CreateVisitor implements CreateVisitorRegistrationModel {
    constructor(
       public visitorName: string,
       public companyName:string,
       public tenant_id:number,
       public tenant_name:string,
       public ContactNumber: string,
       public Email: string,
       public CNIC: string,
    ) {}
}
