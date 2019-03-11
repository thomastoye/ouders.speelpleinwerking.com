import { Component, Input, OnInit } from '@angular/core';
import { Tenant } from '@hoepel.app/types';

@Component({
  selector: 'app-playground-card',
  templateUrl: './playground-card.component.html',
  styleUrls: ['./playground-card.component.scss']
})
export class PlaygroundCardComponent implements OnInit {
  @Input() playground: Tenant;

  constructor() { }

  ngOnInit() {
  }

}
