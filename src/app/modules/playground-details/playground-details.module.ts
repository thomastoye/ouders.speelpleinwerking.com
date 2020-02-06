import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundDetailsComponent } from './playground-details/playground-details.component';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundDetailsResolver } from './playground-details.resolver';
import { DataAccessModule } from '../data-access/data-access.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChildrenOnPlaygroundResolver } from './children-on-playground.resolver';
import { ChildFormModule } from '../child-form/child-form.module';

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
    ChildFormModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    ChildrenOnPlaygroundResolver,
    PlaygroundDetailsResolver,
  ]
})
export class PlaygroundDetailsModule {
}
