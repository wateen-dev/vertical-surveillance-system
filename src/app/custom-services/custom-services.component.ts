import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../service/DataService';
import { ToastService } from '../service/toast.service'; // Adjust the path as necessary
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-custom-services',
  templateUrl: './custom-services.component.html',
  styleUrl: './custom-services.component.css'
})
export class CustomServicesComponent implements OnInit {
  content: any;
  cardName: string = "";
  reDirectBrowserURL: string = "";
  @Input() isLoading: boolean = false;
  dynamicHref: string = '#';
  constructor(private dataService: DataService, private toastService: ToastService,) { }

  ngOnInit(): void {
    this.content = this.dataService.getContent();

    //    https://graph.microsoft.com/v1.0/sites/f47eec58-0179-479e-8df9-ff3b409f5ef1/lists/af90ea47-f694-49a3-aa47-d467575b75d8/items
  }

  onCardClick(cardTitle: string): void {
    if (cardTitle == 'Employee Management System') {
      this.cardName = cardTitle;
      //this.reDirectBrowserURL = "http://172.26.50.65/EmployeeManagementSystem/Login.aspx";
      this.reDirectBrowserURL = "https://ems.wateen.com/";
      this.openExternalApplication(this.content.token, 'SSO', this.content.content.username, this.content.content.employeeno, this.content.content.encryptedPassword, this.reDirectBrowserURL);
    }
    else if (cardTitle == 'Wateen Recruitment Portal') {
      this.cardName = cardTitle;
      //this.reDirectBrowserURL = "http://172.26.50.65/WateenRecruitmentPortal/Index.aspx";
      this.reDirectBrowserURL = "https://hrp.wateen.com/";
      this.openExternalApplication(this.content.token, 'SSO', this.content.content.username, this.content.content.employeeno, this.content.content.encryptedPassword, this.reDirectBrowserURL);
    }
    else if (cardTitle == 'Expense Management System') {
      this.cardName = cardTitle;
      // this.reDirectBrowserURL = "http://172.26.50.65/PettyCashManagement/Login.aspx";
      this.reDirectBrowserURL = "https://wem.wateen.com/Login.aspx";
      this.openExternalApplication(this.content.token, 'SSO', this.content.content.username, this.content.content.employeeno, this.content.content.encryptedPassword, this.reDirectBrowserURL);
    }
    else if (cardTitle == 'Performance Management System') {
      this.cardName = cardTitle;
      this.dynamicHref = "https://pms.wateen.com/ords/f?p=147:27:9072799352294::::P27_WATEEN_INTRANET:" + this.content.content.username;
      //this.dynamicHref = "http://172.26.50.136:8080/ords/f?p=127:27:10933890238211::::P27_WATEEN_INTRANET:"+this.content.content.username;
    }
    else if (cardTitle == 'Service Desk') {
      this.cardName = cardTitle;
      this.dynamicHref = "https://servicedesk.wateen.com/ords/f?p=161:49:9072799352294::::P49_WATEEN_INTRANET:" + this.content.content.username;
      //this.dynamicHref = "http://172.26.50.136:8080/ords/f?p=127:27:10933890238211::::P27_WATEEN_INTRANET:"+this.content.content.username;
    }
    else if (cardTitle == 'Sales Trax') {
      this.cardName = cardTitle;
      this.dynamicHref = "https://salestrax.wateen.com/ords/f?p=122:164:9072799352294::::P164_WATEEN_INTRANET:" + this.content.content.username;
      //this.dynamicHref = "https://pms.wateen.com/ords/f?p=122:164:9072799352294::::P164_WATEEN_INTRANET:" + this.content.content.username;
      //this.dynamicHref = "http://172.26.50.136:8080/ords/f?p=127:27:10933890238211::::P27_WATEEN_INTRANET:"+this.content.content.username;
    }
    else {
      this.toastService.showError(cardTitle + ': Service Under Maintainance! Please contact System Administrtor');
    }

  }
  openExternalApplication(token: string, sso: string, username: string, employeeno: number, decryptedPassword: string, reDirectBrowserURL: string): void {
    // Construct the URL with query parameters
    // Create a form dynamically
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = this.reDirectBrowserURL; // URL of the external application
    form.target = '_blank';

    // Create input fields for token and sso
    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = 'token';
    tokenInput.value = token;

    const ssoInput = document.createElement('input');
    ssoInput.type = 'hidden';
    ssoInput.name = 'sso';
    ssoInput.value = sso;

    const usernameInput = document.createElement('input');
    usernameInput.type = 'hidden';
    usernameInput.name = 'username';
    usernameInput.value = username;

    const employeeInput = document.createElement('input');
    employeeInput.type = 'hidden';
    employeeInput.name = 'employeeno';
    employeeInput.value = employeeno.toString();

    const decryptedPasswordInput = document.createElement('input');
    decryptedPasswordInput.type = 'hidden';
    decryptedPasswordInput.name = 'decryptedPassword';
    decryptedPasswordInput.value = decryptedPassword;
    // Append inputs to the form
    form.appendChild(tokenInput);
    form.appendChild(ssoInput);
    form.appendChild(usernameInput);
    form.appendChild(employeeInput);
    form.appendChild(decryptedPasswordInput);

    // Append form to the body and submit
    document.body.appendChild(form);
    form.submit();

    // Clean up by removing the form
    document.body.removeChild(form);
  }

}
// Decryption function
function decryptPassword(encryptedPassword: string, secretKey: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
}