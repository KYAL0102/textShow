import { Component } from '@angular/core';
import { CoordinatorService } from 'src/app/services/coordinator.service';

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.css']
})
export class HomeSidebarComponent {
  constructor(private coordinator: CoordinatorService) {}

  toEditor() {
    localStorage.removeItem('curItem');
    this.coordinator.setTextClear(true);
    this.coordinator.navigateTo("/editor");
  }

}
