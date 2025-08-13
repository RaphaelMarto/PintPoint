import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutBeerComponent } from './put-beer.component';

describe('PutBeerComponent', () => {
  let component: PutBeerComponent;
  let fixture: ComponentFixture<PutBeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PutBeerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutBeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
