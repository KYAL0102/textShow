import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CoordinatorService } from './coordinator.service';
import { StndMethodService } from './stnd-method.service';

@Injectable({
  providedIn: 'root'
})
export class OptionService implements OnDestroy, OnInit{

  public static nextID = 0;
  list: Map<number, string[]> = new Map();

  constructor(private coordinator: CoordinatorService, private methodService: StndMethodService){
    
  }

  ngOnInit(): void {
    const receivedText = localStorage.getItem("optionsList");
    if(receivedText){
      console.log(receivedText);
      this.list = this.methodService.text2Map(receivedText);
    }
  }

  ngOnDestroy(): void {
    const arr = [...this.list];
    const text = this.methodService.arr2String(arr);
    localStorage.setItem("optionsList", text);
  }

  setCurrentOptions(index: number){
    this.coordinator.curOpList_Index = index;
    var temp = this.list.get(index)
    if(temp !== undefined){
      this.coordinator.increaseOptions(temp);
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
}
