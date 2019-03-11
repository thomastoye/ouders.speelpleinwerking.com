import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundDetailsComponent } from './playground-details/playground-details.component';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundDetailsResolver } from './playground-details.resolver';
import { DataAccessModule } from '../data-access/data-access.module';
import { MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChildrenOnPlaygroundResolver } from './children-on-playground.resolver';

const routes: Routes = [
  {
    path: '', component: PlaygroundDetailsComponent, resolve: {
      playground: PlaygroundDetailsResolver,
      children: ChildrenOnPlaygroundResolver,
    }
  },
];

@NgModule({
  declarations: [
    PlaygroundDetailsComponent,
  ],
  imports: [
    CommonModule,
    DataAccessModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
  ],
  providers: [
    ChildrenOnPlaygroundResolver,
    PlaygroundDetailsResolver,
  ]
})
export class PlaygroundDetailsModule {
}
