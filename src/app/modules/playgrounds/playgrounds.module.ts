import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundsOverviewComponent } from './playgrounds-overview/playgrounds-overview.component';
import { DataAccessModule } from '../data-access/data-access.module';
import { PlaygroundCardComponent } from './playground-card/playground-card.component';
import { MatButtonModule, MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  { path: '', component: PlaygroundsOverviewComponent },
  { path: ':playgroundId', loadChildren: '../playground-details/playground-details.module#PlaygroundDetailsModule' },
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
