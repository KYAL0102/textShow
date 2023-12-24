import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-final-text',
  templateUrl: './final-text.component.html',
  styleUrls: ['./final-text.component.css']
})
export class FinalTextComponent implements OnInit, OnDestroy{
  ngOnDestroy(): void {
    localStorage.setItem("finalText", "");
  }
  text: string = ""

  ngOnInit(): void {
    const receivedText = localStorage.getItem("finalText");
    if(receivedText) this.text = receivedText;
  }

}
