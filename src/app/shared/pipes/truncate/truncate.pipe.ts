/**
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  31/5/2019
 *
 */

import {Pipe, PipeTransform} from '@angular/core';

/**
 *  Devuele una subcadena de la longitud deseada si la cadena actual es mayor al tamaña especificado
 */
@Pipe({
	name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

	/**
	 * Transforma el valor especificado
	 * Si no se especifica el valor se devuelve ''
	 * Si el valor deseado es mayor a la cadena devuelve un substring del tamaño deseado
	 * Si el valor es menor al tamaño de la cadena, devuelve la cadena original
	 * @param value
	 * @param size
	 */
	transform(value: string, size: number = 10): string {
		if (!value) {
			return '';
		}
		const limit = size > 0 ? size : 10;
		return value.length > limit ? value.substring(0, limit) + '...' : value;
	}
}
