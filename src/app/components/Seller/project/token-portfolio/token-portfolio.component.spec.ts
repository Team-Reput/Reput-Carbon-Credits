import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenPortfolioComponent } from './token-portfolio.component';

describe('TokenPortfolioComponent', () => {
  let component: TokenPortfolioComponent;
  let fixture: ComponentFixture<TokenPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenPortfolioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
