import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRatingListComponent } from './users-rating-list.component';

describe('UsersRatingListComponent', () => {
  let component: UsersRatingListComponent;
  let fixture: ComponentFixture<UsersRatingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersRatingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersRatingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
