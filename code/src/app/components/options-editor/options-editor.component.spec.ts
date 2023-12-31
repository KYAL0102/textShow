import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsEditorComponent } from './options-editor.component';

describe('OptionsEditorComponent', () => {
  let component: OptionsEditorComponent;
  let fixture: ComponentFixture<OptionsEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionsEditorComponent]
    });
    fixture = TestBed.createComponent(OptionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
