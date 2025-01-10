import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCard2Component } from './weather-card2.component';

describe('WeatherCard2Component', () => {
  let component: WeatherCard2Component;
  let fixture: ComponentFixture<WeatherCard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherCard2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
