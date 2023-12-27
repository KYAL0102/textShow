import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSidebarComponent } from './home-sidebar.component';

describe('HomeSidebarComponent', () => {
  let component: HomeSidebarComponent;
  let fixture: ComponentFixture<HomeSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSidebarComponent]
    });
    fixture = TestBed.createComponent(HomeSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
