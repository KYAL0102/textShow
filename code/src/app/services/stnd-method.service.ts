import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StndMethodService {

  constructor() { }

  /**
   * Transforms a string object into a Map<number, string[]>.<br/>
   * The lines of the parameter __arg__ need to be seperated by ' ; ', and then with ' , '. <br/>
   * The first parameter of each line has to be a 0.
   * @param arg 
   * @returns 
   */
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

  extractText(element?: HTMLElement):string{
    let result = "";
    if(!element) return result;

    Array.from(element.childNodes).forEach(child => {
      if(child.nodeType === Node.TEXT_NODE){
        result += child.textContent;
      } else if(child.nodeType === Node.ELEMENT_NODE){
        const tagName = (child as HTMLElement).tagName.toLowerCase();
        if(tagName === 'button'){
          const name = (child as HTMLElement).getAttribute('name');
          if(name){
            result += `;${name};`;
          }
        }else{
          result += this.extractText(child as HTMLElement);
        }
      }
    });

    return result;
  }

  /**
   * Transforms a string array into a single string seperated with semicolons.
   * @param arr
   * @returns 
   */
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

  hasEmptyArray(map: Map<number, string[]>): boolean {
    for (const value of map.values()) {
      const isEmpty = value.every(str => str.trim() === '');
      if (isEmpty) {
        return true; // Found an empty array
      }
    }
    return false; // No empty arrays found
  }
}
