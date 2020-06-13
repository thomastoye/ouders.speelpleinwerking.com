import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAttendanceOverviewComponent } from './child-attendance-overview.component';

describe('ChildAttendanceOverviewComponent', () => {
  const component: ChildAttendanceOverviewComponent;
  const fixture: ComponentFixture<ChildAttendanceOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildAttendanceOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildAttendanceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
