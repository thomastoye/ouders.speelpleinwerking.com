import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundsOverviewComponent } from './playgrounds-overview/playgrounds-overview.component';
import { DataAccessModule } from '../data-access/data-access.module';
import { PlaygroundCardComponent } from './playground-card/playground-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  { path: '', component: PlaygroundsOverviewComponent },
  { path: ':playgroundId', loadChildren: () => import('../playground-details/playground-details.module').then(m => m.PlaygroundDetailsModule) },
];

@NgModule({
  declarations: [
    PlaygroundsOverviewComponent,
    PlaygroundCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataAccessModule,
    FlexLayoutModule,

    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class PlaygroundsModule { }
