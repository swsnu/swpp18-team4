import { Component, OnInit } from '@angular/core';
import { LoginUserService } from '../log-in-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  constructor(
    private loginUserService: LoginUserService,
    private router: Router) {
  }
  

  ngOnInit() {
  }

  onclickSignIn(): void {
      let alertMessage = 'Login Failed:\n'
  
      let email : string = document.forms["form"]["email"].value;
      if(!RegExp("[@]").test(email) || !RegExp("[.]").test(email)){
        alertMessage += "- Email must contain @ and .\n"
      }
  
      let password : string = document.forms["form"]["password"].value;
      if(password.length < 8 || !RegExp("[A-Za-z]").test(password) || !RegExp("[0-9]").test(password)){
        alertMessage += "- Password must contain at least one number and one letter, and at least 8 characters\n"
      }
  
      if(alertMessage != 'Login Failed:\n') {alert(alertMessage)}
      else {
        this.router.navigateByUrl('');

      }
  }

}
