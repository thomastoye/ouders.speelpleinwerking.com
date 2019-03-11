import { Component, OnInit } from '@angular/core';
import { PlaygroundsService } from '../../data-access/playgrounds.service';
import { Observable } from 'rxjs';
import { Tenant } from '@hoepel.app/types';

@Component({
  selector: 'app-playgrounds-overview',
  templateUrl: './playgrounds-overview.component.html',
  styleUrls: ['./playgrounds-overview.component.scss']
})
export class PlaygroundsOverviewComponent implements OnInit {
  playgrounds$: Observable<ReadonlyArray<Tenant>>;

  constructor(
    private playgroundService: PlaygroundsService
  ) { }

  ngOnInit() {
    this.playgrounds$ = this.playgroundService.listPlaygrounds();
  }

}
