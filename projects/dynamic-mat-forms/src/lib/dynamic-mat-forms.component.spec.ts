import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMatFormsComponent } from './dynamic-mat-forms.component';

describe('DynamicMatFormsComponent', () => {
  let component: DynamicMatFormsComponent;
  let fixture: ComponentFixture<DynamicMatFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicMatFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicMatFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
