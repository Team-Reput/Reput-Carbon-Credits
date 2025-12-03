import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenRequestComponent } from './token-request.component';

describe('TokenRequestComponent', () => {
  let component: TokenRequestComponent;
  let fixture: ComponentFixture<TokenRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
