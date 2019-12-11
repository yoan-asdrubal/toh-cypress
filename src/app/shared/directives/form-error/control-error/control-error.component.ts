/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  3/4/2019
 *
 */

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

@Component({
    templateUrl: './control-error.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./control-error.component.css']
})
export class ControlErrorComponent implements OnInit {
    _text;
    _hide = true;

    @Input() set text(value) {
        if (value !== this._text) {
            this._text = value;
            this._hide = !value;
            this.cdr.detectChanges();
        }
    };

    constructor(private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

}
