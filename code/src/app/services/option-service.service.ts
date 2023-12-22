import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OptionService{

  private storyText: string = "";

  public curOpList_Index = -1;
  private behaviorOptions: BehaviorSubject<string[]>;
  public options$: Observable<string[]>;

  private behaviorWasExecuted: BehaviorSubject<boolean>;
  public wasExecuted$: Observable<boolean>;

  public isFocused: boolean = false;
  public static nextID = 0;
  list: Map<number, string[]> = new Map();

  constructor(private router: Router){
    this.behaviorOptions = new BehaviorSubject<string[]>([]);
    this.options$ = this.behaviorOptions.asObservable();
    this.behaviorWasExecuted = new BehaviorSubject<boolean>(false);
    this.wasExecuted$ = this.behaviorWasExecuted.asObservable();
  }

  setCurrentOptions(index: number){
    this.curOpList_Index = index;
    var temp = this.list.get(index)
    if(temp !== undefined){
      this.behaviorOptions.next(temp);
    }
  }

  createOptionList(options?: string[]): number{
    const id = OptionService.nextID++;
    if(options == undefined){
      options = []
    }
    this.list.set(id, options);
    return id;
  }

  removeOptionList(index: number): boolean{
    return this.list.delete(index);
  }

  setOptions(index: number, options: string[]){
    let optionComp = this.getOption(index);
    if (optionComp == undefined) {
      return;
    }
    this.list.set(index, options);
  }

  getOption(index: number): string[]{
    var optionList = this.list.get(index);
    if(optionList == undefined){
      return [];
    }
    return optionList;
  }

  execute(){
    this.behaviorWasExecuted.next(true);
    this.behaviorWasExecuted.next(false);
    setTimeout(() => {
      const arr = Array.from(this.list);
      localStorage.setItem('list', this.arr2String(arr));
      localStorage.setItem('text', this.storyText);
      this.router.navigate(
        ['/game']);
    }, 100);
  }

  arr2String(arr:[number, string[]][]):string{
    let result = "";
    for(let x = 0; x < arr.length; x++){
      if(x < arr.length-1){
        result += `${arr[x].toString()};`;
      }else{
        result += `${arr[x].toString()}`;
      }
      
    }
    return result;
  }

  setStoryText(text: string):void{
    this.storyText = text;
  }

  getStoryText(): string{
    return this.storyText;
  }
}
