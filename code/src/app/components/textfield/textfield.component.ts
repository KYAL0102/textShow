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
    this.service.wasExecuted$.subscribe((wasExecuted) => {
      if(wasExecuted) { 
        const result: string = this.extractText(this.text?.nativeElement);
        this.service.setStoryText(result);
      }
    });
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
            result += `{[${name}]}`;
          }
        }else{
          result += this.extractText(child as HTMLElement);
        }
      }
    });

    return result;
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
