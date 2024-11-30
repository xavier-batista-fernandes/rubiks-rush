import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubiksTimerComponent } from './rubiks-timer.component';

describe('RubiksTimerComponent', () => {
  let component: RubiksTimerComponent;
  let fixture: ComponentFixture<RubiksTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RubiksTimerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RubiksTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
