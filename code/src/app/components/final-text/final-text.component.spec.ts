import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalTextComponent } from './final-text.component';

describe('FinalTextComponent', () => {
  let component: FinalTextComponent;
  let fixture: ComponentFixture<FinalTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalTextComponent]
    });
    fixture = TestBed.createComponent(FinalTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
