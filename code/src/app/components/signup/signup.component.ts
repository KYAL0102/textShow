import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CoordinatorService } from 'src/app/services/coordinator.service';
import { UserManagerService } from 'src/app/services/user-manager.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  errorMsg: string = ""
  user = {username: "", email: "", password: ""}
  repeatedPassword: string = ""

  constructor(private userManager: UserManagerService, private coordinator: CoordinatorService) {}

  signup() {
    if(this.user.password !== this.repeatedPassword){
      this.errorMsg = "Passwords do not match";
      return;
    }
    this.userManager.signup(this.user)
    .subscribe({
      next: (response: Response)=>{
        const user = response as unknown as User;
        localStorage.setItem('user_id', `${user.id}`);
        this.coordinator.navigateTo("/home");
      },
      error: (error: HttpErrorResponse)=>{
        console.log("error");
      }
    });
  }
}

interface User {
  id: number,
  is_active: boolean,
  items: [],
  username: string
}
