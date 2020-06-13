import { Component, OnInit } from '@angular/core';
import { PlaygroundsService, Playground } from '../../data-access/playgrounds.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-playgrounds-overview',
  templateUrl: './playgrounds-overview.component.html',
  styleUrls: ['./playgrounds-overview.component.scss']
})
export class PlaygroundsOverviewComponent implements OnInit {
  playgrounds$: Observable<readonly Playground[]>;

  constructor(
    private playgroundService: PlaygroundsService
  ) { }

  ngOnInit() {
    this.playgrounds$ = this.playgroundService.listPlaygrounds();
  }

  sort(playgrounds: readonly Playground[]) {
    if (!playgrounds) {
      return [];
    }

    return [ ...playgrounds ].sort((a, b) => a.id.localeCompare(b.id));
  }
}
