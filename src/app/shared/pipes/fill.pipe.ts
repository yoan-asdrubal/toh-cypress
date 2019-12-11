import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'fill'
})
export class FillPipe implements PipeTransform {

	transform(value: any[], size: number): any {
		if (size <= 0) {
			return value;
		}
		if (value.length > 0) {
			return value.concat(Array(size).fill(1).map((x, i) => i));
		}
		return Array(size).fill(1).map((x, i) => i);
	}

}
