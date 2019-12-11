import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generatePages'
})
export class GeneratePagesPipe implements PipeTransform {

  transform(items: number, size: number): any {
    let pages = 1;
    if (items % size === 0) {
       pages = Math.floor(items / size);
    } else {
      pages = Math.floor(items / size) + 1;
    }

    return Array(pages).fill(1).map((x, i) => i);
  }

}
