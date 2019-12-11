/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  31/5/2019
 *
 */

import {Pipe, PipeTransform} from '@angular/core';

/**
 * En una cadena de texto resalta las coincidencias de una subcadena en Negrita e Italic
 */
@Pipe({
	name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

	/**
	 * Transforma el valor reemplazando las coincidencias con texto resaltado en Negrita e Italic
	 * @param value Cadena de texto
	 * @param text  Texto que se desea resaltar
	 */
	transform(value: string, text: string): any {
		if (!value)
			return '';
		if (!text || text.trim().length === 0) {
			return value;
		}
		value = value.split(text).join(text.bold().italics());
		value = value.split(text.toLowerCase()).join(text.toLowerCase().bold());
		value = value.split(text.toUpperCase()).join(text.toUpperCase().bold());

		return value;
	}

}
