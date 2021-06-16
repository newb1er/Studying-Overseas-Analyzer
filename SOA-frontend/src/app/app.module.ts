import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreferenceComponent } from './preference/preference.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SettingPanelComponent, SettingPanelDialog } from './setting-panel/setting-panel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CollegePanelComponent } from './college-panel/college-panel.component';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RankCollegePanelComponent } from './rank-college-panel/rank-college-panel.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    PreferenceComponent,
    SettingPanelComponent,
    SettingPanelDialog,
    SidebarComponent,
    ToolbarComponent,
    CollegePanelComponent,
    RankCollegePanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
