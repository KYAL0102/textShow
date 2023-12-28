import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CoordinatorService } from 'src/app/services/coordinator.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit{
  titleContent: string = "New Text"

  constructor(private coordinator: CoordinatorService) {
    this.coordinator.textClear$.subscribe({
      next: (isTrue)=>{
        if(isTrue){
          this.titleContent = "New Text";
        }
      }
    });

    this.coordinator.wasExecuted$.subscribe({
      next: (isTrue) => {
        if(isTrue){
          this.coordinator.setStoryTitle(this.titleContent);
        }
      }
    });
  }

  ngOnInit(): void {
    const username = localStorage.getItem('user_id');
    if(!username){
      this.coordinator.navigateTo("login/");
    }

    const receivedTitle = localStorage.getItem("title");
    //console.log("reading from localstorage (title)...", receivedTitle);
    if(receivedTitle){
      this.titleContent = receivedTitle;
    }
  }
}
