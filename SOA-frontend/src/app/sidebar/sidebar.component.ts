import { Component, ViewChild } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{
  constructor() { }

  toggleSidenav(sidenav: MatSidenav): void {
    sidenav.toggle().then((result: MatDrawerToggleResult) => {
      console.log(result);
    })
  }
}
