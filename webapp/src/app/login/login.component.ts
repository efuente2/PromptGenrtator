import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { RestLoginService } from '../services/rest-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;
  message: any; 
  loginStatus: boolean = false;

  constructor(private service: RestLoginService, private router:Router, private cartservice: CartService, private _snackbar: MatSnackBar){}

    ngOnInit(){
    this.getLoginStatus();
    if(this.loginStatus){
      this.router.navigate(["/admin"]);
    }
    }

    doLogin(){
    let resp = this.service.login(this.username, this.password);
    if(this.username==undefined || this.password==undefined){
        this._snackbar.open("Please enter a valid username and password", "Close", {
          duration: 2000,
        });
    }
    else{resp.subscribe(data=>{
      this.message = data;
      console.log(this.message);
      localStorage.setItem('Admin', 'true');
      this.router.navigate(["/admin"])
    })
  }
    
  }

  getLoginStatus(){
    const currentStatus = localStorage.getItem('Admin');
    if(currentStatus == 'true'){
      this.loginStatus = true;
    }
  }

}
