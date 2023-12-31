import { Component } from '@angular/core';
import { CoordinatorService } from 'src/app/services/coordinator.service';
import { OptionService } from 'src/app/services/option-service.service';

@Component({
  selector: 'app-options-editor',
  templateUrl: './options-editor.component.html',
  styleUrls: ['./options-editor.component.css']
})
export class OptionsEditorComponent{
  list: string[] = [];
  changes: {[key: number]: string} = {}

  constructor(private service: OptionService, private coordinator: CoordinatorService){
    this.service.options$.subscribe((options: string[]) => {
      this.list = [...options];
    });
  }

  onInputChange(value: string, index: number) {
    this.changes[index] = value;
  }

  isCurOpListSelected(): boolean {
    return this.coordinator.curOpList_Index == -1;
  }

  addItem() {
    this.list.push("");
    this.saveList();
  }

  removeItem(index: number) {
    delete this.changes[index];
    this.list.splice(index, 1);
    this.saveList();
  }

  saveList() {
    for(const index in this.changes){
      this.list[index] = this.changes[index];
    }
    this.service.setOptions(this.coordinator.curOpList_Index, this.list);
    this.changes = {};
  }
    
}
