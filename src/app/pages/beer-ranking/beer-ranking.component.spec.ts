import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerRankingComponent } from './beer-ranking.component';

describe('BeerRankingComponent', () => {
  let component: BeerRankingComponent;
  let fixture: ComponentFixture<BeerRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeerRankingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
