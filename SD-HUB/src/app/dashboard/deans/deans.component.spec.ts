import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeansComponent } from './deans.component';

describe('DeansComponent', () => {
  let component: DeansComponent;
  let fixture: ComponentFixture<DeansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
