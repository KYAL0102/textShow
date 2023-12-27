import { Component } from '@angular/core';
import { Item, UserManagerService } from 'src/app/services/user-manager.service';

@Component({
  selector: 'app-text-explorer',
  templateUrl: './text-explorer.component.html',
  styleUrls: ['./text-explorer.component.css']
})
export class TextExplorerComponent {
  titles: string[];
  files: Item[];

  constructor(private userManager: UserManagerService) {
    this.titles = [];
    this.files = [];
    const list = userManager.get_items_of_current();
    if(list){
      list.subscribe({
        next: (response) => {
          this.files = response;
          this.titles = response.map(obj => obj.title);;
        }
      });
    }
  }
}
