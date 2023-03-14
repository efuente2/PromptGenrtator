import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from } from 'rxjs';
import { FormService } from '../services/form.service';
import { Form } from './form';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  name!: string;
  email!: string;
  subject!: string;
  message!: string;

  constructor(private _snackbar: MatSnackBar, private formService: FormService) { }

  ngOnInit(): void {
  }

  submit(){

    if(this.name==undefined || this.email==undefined || this.subject==undefined || this.message==undefined){
      this._snackbar.open("Please fill in all the fields", "Close", {
        duration: 2000,
      });
    }
    else{
    this.formService.submitForm(this.name, this.email, this.subject, this.message);
    }

  }
}
