import { Component, OnInit } from '@angular/core';
import { CoordinatorService } from 'src/app/services/coordinator.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit{
  constructor(private coordinator: CoordinatorService) {}

  ngOnInit(): void {
    const username = localStorage.getItem('user_id');
    if(!username){
      this.coordinator.navigateTo("login/");
    }
  }
}
