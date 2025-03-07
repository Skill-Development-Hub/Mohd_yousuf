import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyllabusTrackerComponent } from './syllabus-tracker.component';

describe('SyllabusTrackerComponent', () => {
  let component: SyllabusTrackerComponent;
  let fixture: ComponentFixture<SyllabusTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SyllabusTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyllabusTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
