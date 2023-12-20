import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { OptionService } from 'src/app/services/option-service.service';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.css']
})
export class TextfieldComponent {
  @ViewChild('text', {read: ElementRef}) text: ElementRef | undefined;
  

  constructor(private service: OptionService, private renderer: Renderer2) {}

  ngAfterViewInit() {
    if(this.text){
      this.text.nativeElement.focus();
    }
    this.observeDivChanges();
  }

  observeDivChanges() {
    const editableDiv = this.text!.nativeElement;

    const observer = new MutationObserver((mutationsList, observerInstance) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Check if the button was removed
          const buttonRemoved = Array.from(mutation.removedNodes).some(
            (removedNode: Node) => removedNode.nodeName === 'BUTTON'
          );
          if (buttonRemoved) {
            const removedNode = mutation.removedNodes[0] as HTMLButtonElement;
            this.service.removeOptionList(Number(removedNode.name));
          }
        }
      });
    });

    const config = { childList: true, subtree: true };

    observer.observe(editableDiv, config);
  }

  onFocus(){
    this.service.isFocused = true;
  }

  onBlur(){
    this.service.isFocused = false;
  }

  @HostListener('contextmenu')
  preventContextMenu(){
    return false;
  }
}
