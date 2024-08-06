import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubiksStatisticsComponent } from './rubiks-statistics.component';

describe('RubiksStatisticsComponent', () => {
  let component: RubiksStatisticsComponent;
  let fixture: ComponentFixture<RubiksStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RubiksStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RubiksStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
