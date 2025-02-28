import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholderDashComponent } from './stakeholder-dash.component';

describe('StakeholderDashComponent', () => {
  let component: StakeholderDashComponent;
  let fixture: ComponentFixture<StakeholderDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StakeholderDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StakeholderDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
