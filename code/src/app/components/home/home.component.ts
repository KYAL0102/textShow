import { Component, OnInit } from '@angular/core';
import { CoordinatorService } from 'src/app/services/coordinator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private coordinator: CoordinatorService) {}

  ngOnInit(): void {
    const username = localStorage.getItem('user_id');
    if(!username){
      this.coordinator.navigateTo("login/");
    }
  }

  logOut() {
    localStorage.removeItem('user_id');
    this.coordinator.navigateTo("login/");
  }

}
