import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../service/DataService';
@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.css'
})
export class AdministrationComponent implements OnInit {
  @Input() isLoading: boolean = false;

  constructor(){}


  ngOnInit(): void {
  }

 

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      // Process form data
      console.log(form.value);
      // After processing, you can reset the form if necessary
      form.reset();
      this.isLoading = false; // Set loading to false once done
    }
  }
}
