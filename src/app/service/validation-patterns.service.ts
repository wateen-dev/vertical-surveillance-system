import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationPatternsService {
  public readonly patterns = {
    ntn: '^[0-9]*$',  // Numeric characters only
    pocNumber: '^[0-9]{10,15}$',  // 10 to 15 digits, no symbols
    cnic: '^[0-9]{5}-[0-9]{7}-[0-9]$',  // CNIC format: 12345-1234567-1
    email: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$' // Simple email validation
  };
}
