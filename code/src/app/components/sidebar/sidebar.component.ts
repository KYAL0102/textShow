import { Component } from '@angular/core';
import { CoordinatorService } from 'src/app/services/coordinator.service';
import { OptionService } from 'src/app/services/option-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private service: OptionService, private coordinator: CoordinatorService) {}

  execute() {
    this.coordinator.execute(this.service.list);
  }

  onBtnClicked(){
    if (!this.coordinator.isFocused) {
      return;
    }

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }

    const range = selection.getRangeAt(0);
    const newElement = document.createElement('button');
    const id = this.service.createOptionList();
    newElement.name = `${id}`;
    newElement.textContent = `option ${id}`
    newElement.contentEditable = "false";
    newElement.style.userSelect = "none";
    newElement.style.outline = "none";
    newElement.onclick = () => {
      this.service.setCurrentOptions(id);
    }

    range.insertNode(newElement);
    range.collapse();
  }

  clearText() {
    localStorage.setItem("textHtmlCode", "");
    this.coordinator.setTextClear(true);
  }

  preventBlur(event: MouseEvent) {
    event.preventDefault();
  }
}
