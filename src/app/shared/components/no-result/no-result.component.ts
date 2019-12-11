import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'app-no-result',
	templateUrl: './no-result.component.html',
	styleUrls: ['./no-result.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class NoResultComponent implements OnInit {
	@Input() minHeight = '100%';
	@Input() height = '500px';
	@Input() minWidth = '100%';
	@Input() width = '100%';
	@Input() text = 'No se encontraron resultados en la búsqueda';
	@Input() show = true;
	@Input() imgWidth = '200px';
	@Input() class = '';
	@Input() fontSize = '18px';

	constructor() {
	}

	ngOnInit() {
	}

}
