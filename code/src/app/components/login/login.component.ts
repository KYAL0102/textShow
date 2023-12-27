import { HttpErrorResponse } from '@angular/common/http';
import { Binary } from '@angular/compiler';
import { Component } from '@angular/core';
import { CoordinatorService } from 'src/app/services/coordinator.service';
import { UserManagerService } from 'src/app/services/user-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMsg: string = ""
  user = {username: "", email: "", password: ""}

  constructor(private userManager: UserManagerService, private coordinator: CoordinatorService) {}

  login() {
    const response = this.userManager.login(this.user);
    response.subscribe({
      next: (response: Object)=>{
        if('user' in response){
          const loginResponse = response as LoginResponse;
          localStorage.setItem('user_id', `${loginResponse.user.id}`);
          this.coordinator.navigateTo("/home");
        }
      },
      error: (error: HttpErrorResponse) => {
        switch(error.status){
          case 404:
            //console.log("User does not exist");
            this.errorMsg = "User does not exist";
            break;
          case 400:
            //console.log("Wrong password.");
            this.errorMsg = "Wrong password";
            break;
          default:
            //console.log("error occurred");
            this.errorMsg = "error occurred";
            break;
        }
      }
    });
  }
}

interface LoginResponse{
  "message": string, 
  "user": { 
    "hashed_password": Binary, 
    "id": number, 
    "is_active": boolean, 
    "salt": Binary, 
    "username": string
  }
}
