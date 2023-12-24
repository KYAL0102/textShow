import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StndMethodService } from './stnd-method.service';

@Injectable({
  providedIn: 'root'
})
export class CoordinatorService implements OnInit{

  private behaviorTextClear: BehaviorSubject<boolean>;
  public textClear$: Observable<boolean>;

  private storyText: string = "";

  public curOpList_Index = -1;
  private behaviorOptions: BehaviorSubject<string[]>;
  public options$: Observable<string[]>;

  private behaviorWasExecuted: BehaviorSubject<boolean>;
  public wasExecuted$: Observable<boolean>;

  public isFocused: boolean = false;

  constructor(private router: Router, private methodService: StndMethodService) { 
    this.behaviorTextClear = new BehaviorSubject<boolean>(false);
    this.textClear$ = this.behaviorTextClear.asObservable();
    this.behaviorOptions = new BehaviorSubject<string[]>([]);
    this.options$ = this.behaviorOptions.asObservable();
    this.behaviorWasExecuted = new BehaviorSubject<boolean>(false);
    this.wasExecuted$ = this.behaviorWasExecuted.asObservable();
  }

  increaseOptions(input: string[]){
    this.behaviorOptions.next(input);
  }

  ngOnInit(): void {
    
  }

  getStoryTemplate(): string{
    return this.storyText;
  }

  setStoryText(text: string):void{
    this.storyText = text;
  }

  setTextClear(value: boolean){
    this.behaviorTextClear.next(value);
    localStorage.setItem("list", "");
    localStorage.setItem("text", "");
  }

  execute(list: Map<number, string[]>){
    this.behaviorWasExecuted.next(true);
    this.behaviorWasExecuted.next(false);
    setTimeout(() => {
      if(this.storyText.trim() === "" || this.methodService.hasEmptyArray(list)){
        return;
      }

      const arr = Array.from(list);
      localStorage.setItem('list', this.methodService.arr2String(arr));
      localStorage.setItem('text', this.storyText);
      this.navigateTo('/game');
    }, 100);
  }

  navigateTo(route: string):void{
    this.router.navigate([route]);
  }
}
