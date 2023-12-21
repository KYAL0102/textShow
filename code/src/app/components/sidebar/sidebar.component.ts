import { Component } from '@angular/core';
import { OptionService } from 'src/app/services/option-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private service: OptionService) {}

  execute() {
    this.service.execute();
  }

  onBtnClicked(){
    if (!this.service.isFocused) {
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

  preventBlur(event: MouseEvent) {
    event.preventDefault();
  }
}
