import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsOfTheDay } from './deals-of-the-day';

describe('DealsOfTheDay', () => {
  let component: DealsOfTheDay;
  let fixture: ComponentFixture<DealsOfTheDay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealsOfTheDay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealsOfTheDay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
