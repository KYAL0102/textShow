import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoordinatorService } from 'src/app/services/coordinator.service';
import { OptionService } from 'src/app/services/option-service.service';
import { StndMethodService } from 'src/app/services/stnd-method.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  curKey_Index:number = 0;
  curOptions!: string[];

  story!: string;
  chosenWords: Map<number, string> = new Map<number, string>
  private keys!: number[];
  optionsList!: Map<number, string[]>;

  constructor(private methodService: StndMethodService, private coordinator: CoordinatorService) {}

  ngOnInit(): void {
    const text = localStorage.getItem("text");
    const list = localStorage.getItem("list");
    if(text && list){
      this.story = text;
      this.optionsList = this.methodService.text2Map(list);
      this.keys = [...this.optionsList.keys()].sort((a,b) => a - b);
      const cur = this.optionsList.get(this.keys[this.curKey_Index]);
      if(cur){
        this.curOptions = cur;
      }
    }
  }

  nextMap(chosenWord: string){
    this.chosenWords.set(this.keys[this.curKey_Index], chosenWord);

    this.curKey_Index++;
    if(this.curKey_Index >= this.keys.length){
      const result = this.smashMapAndText(this.story, this.chosenWords);
      localStorage.setItem("finalText", result);
      this.coordinator.navigateTo('/finalText');
      return;
    }
    const nextOptions = this.optionsList.get(this.keys[this.curKey_Index]);
    if(nextOptions){
      this.curOptions = nextOptions;
    }
  }

  smashMapAndText(story: string, chosenWords: Map<number, string>):string{
    let finalText: string = "";
    const splitStory: string[] = story.split(';');
    for(let part of splitStory){
      if(!isNaN(Number.parseInt(part))){
        const insertWort_Index = Number.parseInt(part);
        const word = this.chosenWords.get(insertWort_Index);
        if(word){
          finalText += `${word}`;
        }
      }else{
        finalText += `${part}`;
      }

    }
    return finalText;
  }
}

