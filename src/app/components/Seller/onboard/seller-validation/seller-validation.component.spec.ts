import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerValidationComponent } from './seller-validation.component';

describe('SellerValidationComponent', () => {
  let component: SellerValidationComponent;
  let fixture: ComponentFixture<SellerValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerValidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
