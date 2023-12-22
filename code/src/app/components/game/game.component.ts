import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private methodService: StndMethodService) {}

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
      return;
    }
    const nextOptions = this.optionsList.get(this.keys[this.curKey_Index]);
    if(nextOptions){
      this.curOptions = nextOptions;
    }else{
      const result = this.smashMapAndText(this.story, this.chosenWords);
    }
  }

  smashMapAndText(story: string, chosenWords: Map<number, string>):string{
    let finalText: string = "";
    const splitStory: string[] = story.split(';');
    for(let part of splitStory){
      const insertWort_Index = Number.parseInt(part);
      if(insertWort_Index){
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

