import { Component } from '@angular/core';
import { CoordinatorService } from 'src/app/services/coordinator.service';
import { Item, UserManagerService } from 'src/app/services/user-manager.service';

@Component({
  selector: 'app-text-explorer',
  templateUrl: './text-explorer.component.html',
  styleUrls: ['./text-explorer.component.css']
})
export class TextExplorerComponent {

  files: Item[];

  constructor(private userManager: UserManagerService, private coordinator: CoordinatorService) {
    this.files = [];
    const list = userManager.get_items_of_current();
    if(list){
      list.subscribe({
        next: (response) => {
          this.files = response;
        }
      });
    }
  }

  editText(id: number) {
    this.coordinator.prepareData(id);
  }
}
