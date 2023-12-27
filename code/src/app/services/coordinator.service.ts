import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StndMethodService } from './stnd-method.service';
import { Item, UserManagerService } from './user-manager.service';

@Injectable({
  providedIn: 'root'
})
export class CoordinatorService implements OnInit{

  private behaviorTextClear: BehaviorSubject<boolean>;
  public textClear$: Observable<boolean>;

  private storyText: string = "";

  public curOpList_Index = -1;

  private behaviorWasExecuted: BehaviorSubject<boolean>;
  public wasExecuted$: Observable<boolean>;

  public isFocused: boolean = false;

  constructor(private router: Router, private methodService: StndMethodService, private userManager: UserManagerService) { 
    this.behaviorTextClear = new BehaviorSubject<boolean>(false);
    this.textClear$ = this.behaviorTextClear.asObservable();
    this.behaviorWasExecuted = new BehaviorSubject<boolean>(false);
    this.wasExecuted$ = this.behaviorWasExecuted.asObservable();
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
    localStorage.removeItem("list");
    localStorage.removeItem("text");
    localStorage.removeItem("optionsList");
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

  safeText(list: Map<number, string[]>){
    this.behaviorWasExecuted.next(true);
    this.behaviorWasExecuted.next(false);

    const options = this.methodService.arr2String([...list]);
    const story = this.storyText;
    const name = "project1";

    const project: Item = { "title": name, "text": story, "compressedList": options};

    console.log(project);
    this.userManager.safe_item_to_current(project)?.subscribe({
      next: () =>{
        this.navigateTo("/home");
      }
    });
  }

  navigateTo(route: string):void{
    this.router.navigate([route]);
  }
}