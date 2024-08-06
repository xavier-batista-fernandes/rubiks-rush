import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { differenceInMilliseconds, format } from 'date-fns';

import sample from 'lodash/sample';

import { Observable } from 'rxjs';
import { SpeedcubingService } from '../../services/speedcubing.service';
import { Record } from '../../models/Record';

@Component({
    selector: 'app-speedcubing',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './rubiks-timer.component.html',
})
export class RubiksTimerComponent {
    private speedcubingService = inject(SpeedcubingService);
    records$!: Observable<Record[]>;

    ngOnInit(): void {
        this.records$ = this.speedcubingService.getRecords();
    }

    startHoldingDate!: Date;
    startClockingDate!: Date;

    isHolding: boolean = false;
    isTimeRunning: boolean = false;
    isReadyToStartClocking: boolean = false;

    moveFaces: string[] = ['R', 'L', 'U', 'D', 'F', 'B'];
    moveRotations: string[] = ['', "'", '2'];

    oppositeFaces: { [key: string]: string } = {
        L: 'R',
        R: 'L',
        U: 'D',
        D: 'U',
        F: 'B',
        B: 'F',
    };

    time!: string[];

    clockingInterval: any;
    holdingInterval: any;

    lastCubeSolve: number = 0;

    cubeShuffle: string = this.getCubeShuffle(15);

    areStatisticsOpen: boolean = false;

    @ViewChild('clock') clockPage!: ElementRef;
    @ViewChild('stats') statsPage!: ElementRef;

    jumpToClockPage(): void {
        this.clockPage.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    jumpToStatsPage(): void {
        this.statsPage.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    get beforeStartingStyles(): string {
        if (!this.isHolding || this.isTimeRunning) return '';

        return this.isReadyToStartClocking ? 'text-lime-600' : 'text-red-600';
    }

    isMoveRedundant(minusTwoMove: string, minusOneMove: string, currentMove: string): boolean {
        if (currentMove === minusOneMove) return true;
        if (currentMove === minusTwoMove) return true;
        if (currentMove === minusTwoMove && minusOneMove === this.oppositeFaces[minusTwoMove])
            return true;
        return false;
    }

    getCubeShuffle(numberOfMoves: number): string {
        const shuffleMoves: string[] = [];

        let minusTwoMove: string = '';
        let minusOneMove: string = '';
        let currentMove: string = '';
        let currentRotation: string = '';

        for (let i = 0; i < numberOfMoves; i++) {
            do {
                currentMove = sample(this.moveFaces) ?? '';
            } while (this.isMoveRedundant(minusTwoMove, minusOneMove, currentMove));

            currentRotation = sample(this.moveRotations) ?? '';

            shuffleMoves.push(currentMove + currentRotation);

            minusTwoMove = minusOneMove;
            minusOneMove = currentMove;
        }

        return shuffleMoves.join(' ');
    }

    toggleStatistics() {
        this.areStatisticsOpen = !this.areStatisticsOpen;
    }

    @HostListener('document:keydown', ['$event'])
    onKeydown(event: KeyboardEvent) {
        if (event.key !== ' ') return;

        if (!this.isHolding && !this.isTimeRunning) {
            this.isHolding = true;
            this.startHoldingDate = new Date();
            this.holdingInterval = setInterval(() => {
                this.isReadyToStartClocking =
                    differenceInMilliseconds(new Date(), this.startHoldingDate) >= 500;
            }, 10);
        }

        if (this.isTimeRunning) {
            clearInterval(this.clockingInterval);
            this.isTimeRunning = false;
            this.speedcubingService.addRecord({
                time: Number((this.lastCubeSolve / 1000).toFixed(2)),
                scramble: this.cubeShuffle,
            });

            this.cubeShuffle = this.getCubeShuffle(15);
        }
    }

    @HostListener('document:keyup', ['$event'])
    onKeyup(event: KeyboardEvent) {
        if (event.key !== ' ') return;

        if (this.isHolding) {
            this.isHolding = false;
            clearInterval(this.holdingInterval);

            if (this.isReadyToStartClocking) {
                this.isTimeRunning = true;
                this.startClockingDate = new Date();
                this.clockingInterval = setInterval(() => {
                    this.lastCubeSolve = differenceInMilliseconds(
                        new Date(),
                        this.startClockingDate
                    );
                    this.time = format(this.lastCubeSolve, 'mm.ss.SS').split('.');
                }, 10);
            }
        }
    }
}
