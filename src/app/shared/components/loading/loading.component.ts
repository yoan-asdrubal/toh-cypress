import {Component, Input, OnInit} from '@angular/core';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

	@Input() text = 'Buscando';
	@Input() width = '100%';
	@Input() height = '100%';
	/**
	 *  Para especificar clases asociadas al contenedor del loading
	 *  Se puede usar para modifcarle el background o cualquier otro atributo
	 */
	@Input() containerClass = '';
	/**
	 * Para especificar clases que se le quieran asignar al loading
	 * Se usara generalmente para aumentar o disminuir el font-size para modificar el loader
	 */
	@Input() loaderClass = '';

	constructor() {
	}

	ngOnInit() {
	}

}
