import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AptituedTestComponent } from './aptitued-test.component';

describe('AptituedTestComponent', () => {
  let component: AptituedTestComponent;
  let fixture: ComponentFixture<AptituedTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AptituedTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AptituedTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
