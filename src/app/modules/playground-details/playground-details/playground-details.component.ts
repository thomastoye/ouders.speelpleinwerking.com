import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tenant, Child } from '@hoepel.app/types';

@Component({
  selector: 'app-playground-details',
  templateUrl: './playground-details.component.html',
  styleUrls: ['./playground-details.component.scss']
})
export class PlaygroundDetailsComponent implements OnInit {
  playground: Tenant;
  children: ReadonlyArray<Child>;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.playground = this.route.snapshot.data.playground as Tenant;
    this.children  = this.route.snapshot.data.children as ReadonlyArray<Child>;
  }

}
