import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-rubiks-home',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './rubiks-home.component.html',
})
export class RubiksHomeComponent {}
