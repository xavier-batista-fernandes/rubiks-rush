import { Routes } from '@angular/router';
import { RubiksHomeComponent } from './pages/rubiks-home/rubiks-home.component';
import { RubiksTimerComponent } from './pages/rubiks-timer/rubiks-timer.component';

export const routes: Routes = [
    { path: '', component: RubiksHomeComponent, pathMatch: 'full' },
    { path: 'timer', component: RubiksTimerComponent },
];
