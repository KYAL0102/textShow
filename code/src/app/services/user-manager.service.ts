import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  private API_URL = "/api"

  constructor(private httpClient: HttpClient) { }

  login(user: User){
    const response = this.httpClient.post(`${this.API_URL}/login/`, { "username": user.username, "password": user.password });
    return response;
  }

  signup(user: User){
    const response = this.httpClient.post(`${this.API_URL}/users/`, { "username": user.username, "password": user.password });
    return response as Observable<Response>;
  }

  get_items_of_current(): Observable<Item[]> | null{
    const user_id = localStorage.getItem('user_id');
    if(!user_id){
      return null;
    }
    const id = Number.parseInt(user_id);
    return this.httpClient.get(`${this.API_URL}/users/${id}/items/`) as Observable<Item[]>;
  }

  safe_item_to_current(item: Item): Observable<Response> | null{
    const user_id = localStorage.getItem('user_id');
    if(!user_id){
      return null;
    }
    const id = Number.parseInt(user_id);
    return this.httpClient.post(
      `${this.API_URL}/users/${id}/items/`, 
      { "title": item.title, "text": item.text, "compressedList": item.compressedList}
      ) as Observable<Response>;
  }

  update_item(item: Item): Observable<Item> | null{
    const user_id = localStorage.getItem('user_id');
    if(!user_id){
      return null;
    }
    const id = Number.parseInt(user_id);

    return this.httpClient.patch(
      `${this.API_URL}/users/${id}/items/${item.id}`,
      { "title": item.title, "text": item.text, "compressedList": item.compressedList }
    ) as Observable<Item>;
  }
}

export interface Item{
  id: number,
  title: string,
  text: string,
  compressedList: string
}

export interface User{
  username: string,
  email: string,
  password: string
}
