import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StndMethodService } from './stnd-method.service';
import { Item, UserManagerService } from './user-manager.service';
import { OptionService } from './option-service.service';

@Injectable({
  providedIn: 'root'
})
export class CoordinatorService implements OnInit{
  
  private behaviorTextClear: BehaviorSubject<boolean>;
  public textClear$: Observable<boolean>;

  private storyTitle: string = "";
  private storyText: string = "";
  private storyHtmlCode: string = "";

  public curOpList_Index = -1;

  private behaviorWasExecuted: BehaviorSubject<boolean>;
  public wasExecuted$: Observable<boolean>;

  public isFocused: boolean = false;

  constructor(
    private router: Router, 
    private methodService: StndMethodService, 
    private userManager: UserManagerService) { 
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

  setHtmlCode(html: string):void{
    this.storyHtmlCode = html;
  }

  setStoryTitle(title: string):void{
    this.storyTitle = title;
  }

  setTextClear(value: boolean){
    this.behaviorTextClear.next(value);
    localStorage.removeItem('title');
    localStorage.removeItem("list");
    localStorage.removeItem("text");
    localStorage.removeItem("optionsList");
    localStorage.removeItem("textHtmlCode");
  }

  execute(list: Map<number, string[]>){
    this.behaviorWasExecuted.next(true);
    this.behaviorWasExecuted.next(false);
    setTimeout(() => {
      if(this.storyText.trim() === "" || this.methodService.hasEmptyArray(list)){
        return;
      }

      const arr = Array.from(list);
      localStorage.setItem('title', this.storyTitle);
      localStorage.setItem('list', this.methodService.arr2String(arr));
      localStorage.setItem('text', this.storyText);
      this.navigateTo('/game');
    }, 100);
  }

  safeText(list: Map<number, string[]>){
    this.behaviorWasExecuted.next(true);
    this.behaviorWasExecuted.next(false);

    let id: number = -1;
    const receivedID = localStorage.getItem("curItem");
    if(receivedID){
      id = Number.parseInt(receivedID);
      localStorage.removeItem("curItem");
    }
    const options = this.methodService.arr2String([...list]);
    const story = this.storyHtmlCode;
    const name = this.storyTitle;

    const project: Item = { "id": id, "title": name, "text": story, "compressedList": options};

    if(id != -1){
      this.userManager.update_item(project)?.subscribe({
        next: () => {
          this.navigateTo("/home");
        }
      });
    }
    else{
      this.userManager.safe_item_to_current(project)?.subscribe({
        next: () =>{
          this.navigateTo("/home");
        }
      });
    }
    
  }

  prepareData(id: number):void {
    const response = this.userManager.get_items_of_current();
    if(response == null){
      return;
    }

    response.subscribe({
      next: (items) =>{
        //console.log("setting data into localStorage...");
        for(let x = 0; x < items.length; x++){
          if(items[x].id === id){
            localStorage.setItem('curItem', `${id}`);
            localStorage.setItem('title', items[x].title);
            localStorage.setItem('optionsList', items[x].compressedList);
            localStorage.setItem('textHtmlCode', items[x].text);
          }
        }
        this.navigateTo("/editor");
      }
    });
  }

  navigateTo(route: string):void{
    this.router.navigate([route]);
  }
}