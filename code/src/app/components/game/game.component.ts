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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.story = params['text'];
        this.optionsList = this.arr2Map(params['list']);
        const _curOptions = this.optionsList.get(this.curOptions_index);
        if(_curOptions !== undefined) this.curOptions = _curOptions;
      }
    );
  }

  arr2Map(arg: string | string[]): Map<number, string[]>{
    let map = new Map<number, string[]>();
    let arr: string[] = []

    if(!Array.isArray(arg)) {
      arr.push(arg);
    }else{
      arr = arg as string[];
    }

    for(let line of arr){
      const data = line.split(',');
      const key = Number.parseInt(data[0]);
      map.set(key, data.slice(1));
    }
    return map;
  }
}
