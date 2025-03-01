import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreGalleryComponent } from './more-gallery.component';

describe('MoreGalleryComponent', () => {
  let component: MoreGalleryComponent;
  let fixture: ComponentFixture<MoreGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoreGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
