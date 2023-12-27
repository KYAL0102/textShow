import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextExplorerComponent } from './text-explorer.component';

describe('TextExplorerComponent', () => {
  let component: TextExplorerComponent;
  let fixture: ComponentFixture<TextExplorerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextExplorerComponent]
    });
    fixture = TestBed.createComponent(TextExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
