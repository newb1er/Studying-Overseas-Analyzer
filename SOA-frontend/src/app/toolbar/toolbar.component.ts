import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  opened(): void {
    console.log("ToolbarComponent: opened");
  }

  closed(): void {
    console.log("ToolbarComponent: closed");
  }
}