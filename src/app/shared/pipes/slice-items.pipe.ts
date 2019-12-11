import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'sliceItems'
})
export class SliceItemsPipe implements PipeTransform {

    transform(items: any[], start?: number, end?: number): any {
        if (!items) {
            return [];
        }
        if (!start && start !== 0) {
            return items;
        }
        if (!end) {
            return items.slice(start, items.length - 1);
        }

        return items.slice(start, end);
    }

}
