import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  isLoggedIn$: Observable<boolean>;

  constructor(
    private auth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.auth.user.pipe(map(user => !!user), takeUntil(this.destroy$));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
