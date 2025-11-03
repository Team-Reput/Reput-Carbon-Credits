import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetireProofComponent } from './retire-proof.component';

describe('RetireProofComponent', () => {
  let component: RetireProofComponent;
  let fixture: ComponentFixture<RetireProofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetireProofComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetireProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
