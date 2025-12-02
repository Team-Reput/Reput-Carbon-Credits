import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonRetirementsComponent } from './carbon-retirements.component';

describe('CarbonRetirementsComponent', () => {
  let component: CarbonRetirementsComponent;
  let fixture: ComponentFixture<CarbonRetirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarbonRetirementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbonRetirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
