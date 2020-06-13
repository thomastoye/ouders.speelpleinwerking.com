import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAttendanceAddForWeekComponent } from './child-attendance-add-for-week.component';

describe('ChildAttendanceAddForWeekComponent', () => {
  const component: ChildAttendanceAddForWeekComponent;
  const fixture: ComponentFixture<ChildAttendanceAddForWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildAttendanceAddForWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildAttendanceAddForWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
