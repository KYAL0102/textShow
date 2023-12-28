import { Injectable, OnDestroy } from '@angular/core';
import { CoordinatorService } from './coordinator.service';
import { StndMethodService } from './stnd-method.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionService implements OnDestroy{

  private behaviorOptions: BehaviorSubject<string[]>;
  public options$: Observable<string[]>;

  public static nextID = 0;
  list: Map<number, string[]> = new Map();

  constructor(private coordinator: CoordinatorService, private methodService: StndMethodService){
    const receivedText = localStorage.getItem("optionsList");
    //console.log("reading from localstorage (optionsList)...", receivedText);
    if(receivedText){
      this.list = this.methodService.text2Map(receivedText);
    }

    this.behaviorOptions = new BehaviorSubject<string[]>([]);
    this.options$ = this.behaviorOptions.asObservable();

    coordinator.textClear$.subscribe((isTrue)=>{
      if(isTrue){
        this.clear();
      }
    });
  }

  private clear(){
    this.coordinator.curOpList_Index = -1;
    this.behaviorOptions.next([]);
    this.list.clear();
  }

  saveListInLocalStorage():void{
    const arr = [...this.list];
    const text = this.methodService.arr2String(arr);
    localStorage.setItem("optionsList", text);
  }

  ngOnDestroy(): void {
    this.saveListInLocalStorage();
  }

  renderSelectedOptions(index: number){
    this.coordinator.curOpList_Index = index;
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
    if(index === this.coordinator.curOpList_Index){
      this.behaviorOptions.next([]);
      this.coordinator.curOpList_Index = -1;
    }
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
}
