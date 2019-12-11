/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  29/3/2019
 *
 */
import {MatPaginatorIntl} from '@angular/material';

export class CustomMatPaginationIntl extends MatPaginatorIntl {
	itemsPerPageLabel = 'Mostrar';
	nextPageLabel = 'Siguiente';
	previousPageLabel = 'Anterior';
	firstPageLabel = 'Inicio';
	lastPageLabel = 'Fin';
	getRangeLabel = function (page, pageSize, length) {
		if (length === 0 || pageSize === 0) {
			return '0 de ' + length;
		}
		length = Math.max(length, 0);
		const startIndex = page * pageSize;

		const endIndex = startIndex < length ?
			Math.min(startIndex + pageSize, length) :
			startIndex + pageSize;
		return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
	};

}
