import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CoordinatorService } from 'src/app/services/coordinator.service';
import { OptionService } from 'src/app/services/option-service.service';
import { StndMethodService } from 'src/app/services/stnd-method.service';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.css']
})
export class TextfieldComponent {

  @ViewChild('text', {read: ElementRef}) text: ElementRef | undefined;

  constructor(private service: OptionService, private methodService: StndMethodService, private coordinator: CoordinatorService) {}

  ngAfterViewInit() {
    this.observeDivChanges();

    if(this.text){
      const innerHtml = localStorage.getItem("textHtmlCode");
      if(innerHtml){
        this.text.nativeElement.innerHTML = innerHtml;
      }
      this.text.nativeElement.focus();
    }

    this.coordinator.wasExecuted$.subscribe((wasExecuted) => {
      if(wasExecuted) { 
        const result: string = this.methodService.extractText(this.text?.nativeElement);
        localStorage.setItem("textHtmlCode", this.text?.nativeElement.innerHTML);
        this.coordinator.setStoryText(result);
      }
    });

    this.coordinator.textClear$.subscribe((value) => {
      if(value){
        if(this.text){
          this.text.nativeElement.innerHTML = "&nbsp;";
        }
      }
    });
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

  buttonClickHandler(event: Event){
    const target = event.target as HTMLElement;
    if(target.tagName === 'BUTTON'){
      const btn: HTMLButtonElement = target as HTMLButtonElement;
      if(!isNaN(Number.parseInt(btn.name))){
        this.service.renderSelectedOptions(Number.parseInt(btn.name));
      }
    }
  }

  onFocus(){
    this.coordinator.isFocused = true;
  }

  onBlur(){
    this.coordinator.isFocused = false;
  }

  @HostListener('contextmenu')
  preventContextMenu(){
    return false;
  }
}
