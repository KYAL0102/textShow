import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptionService } from 'src/app/services/option-service.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  curOptions_index = 0;
  curOptions!: string[];

  story!: string;
  optionsList!: Map<number, string[]>;

  constructor() {}

  ngOnInit(): void {
    const text = localStorage.getItem("text");
    const list = localStorage.getItem("list");
    if(text && list){
      this.story = text;
      this.optionsList = this.text2Map(list);
      const cur = this.optionsList.get(this.curOptions_index);
      if(cur){
        this.curOptions = cur;
      }
    }
  }

  text2Map(arg: string): Map<number, string[]>{
    let map = new Map<number, string[]>();
    let arr: string[] = arg.split(';');

    for(let line of arr){
      const data = line.split(',');
      const key = Number.parseInt(data[0]);
      map.set(key, data.slice(1));
    }
    return map;
  }
}
