import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAttendanceDetailsDialogComponent } from './child-attendance-details-dialog.component';

describe('ChildAttendanceDetailsDialogComponent', () => {
  const component: ChildAttendanceDetailsDialogComponent;
  const fixture: ComponentFixture<ChildAttendanceDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildAttendanceDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildAttendanceDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
