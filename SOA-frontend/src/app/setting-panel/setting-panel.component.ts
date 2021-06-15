import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Country, PreferenceComponent } from '../preference/preference.component';
import { UserPreferenceService } from '../user-preference.service';

@Component({
  selector: 'app-setting-panel',
  templateUrl: './setting-panel.component.html',
  styleUrls: ['./setting-panel.component.css']
})
export class SettingPanelComponent implements OnInit {
  userPreferences!: Country[];

  constructor(private userPreferenceService: UserPreferenceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserPreferences();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SettingPanelDialog, {
      panelClass: "dialog",
      width: '500dp',
      data: this.userPreferences
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("SettingPanelComponent: panel closed");
      this.userPreferences = result;
      this.updateUserPreferences(result);
    })
  }

  getUserPreferences(): void {
    this.userPreferenceService.getUserPreferences()
      .subscribe();
  }

  updateUserPreferences(result: Country[]): void {
    this.userPreferenceService.updateUserPreferences(result);
  }

}

@Component({
  selector: 'setting-panel-dialog',
  templateUrl: './setting-panel-dialog.html',
})
export class SettingPanelDialog {
  @Input() userPreferences: Country[] = [];

  constructor (
    public diaglogRef: MatDialogRef<SettingPanelComponent>) { }

  onNoClick(): void{
    this.diaglogRef.close();
  }
}
