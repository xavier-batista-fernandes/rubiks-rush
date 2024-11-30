import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubiksHomeComponent } from './rubiks-home.component';

describe('RubiksHomeComponent', () => {
  let component: RubiksHomeComponent;
  let fixture: ComponentFixture<RubiksHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RubiksHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RubiksHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
