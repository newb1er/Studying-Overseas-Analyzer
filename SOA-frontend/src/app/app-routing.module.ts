import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollegePanelComponent } from './college-panel/college-panel.component';
import { AppComponent } from './app.component';
import { RankCollegePanelComponent } from './rank-college-panel/rank-college-panel.component';

const routes: Routes = [
  {path: 'exchange', component: CollegePanelComponent},
  {path: 'rank', component: RankCollegePanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
