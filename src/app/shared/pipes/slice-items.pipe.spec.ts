import {SliceItemsPipe} from './slice-items.pipe';

describe('SliceItemsPipe', () => {
    const pipe = new SliceItemsPipe();
    let items = [];
    beforeEach(function () {
        items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return full items with no params', function () {
        const result = pipe.transform(items);
        expect(items).toEqual(result);
    });

    it('should return last 3 elements ', function () {
        const result = pipe.transform(items, 7);
        expect(items.slice(7, 9)).toEqual(result);
    });
    it('should return 2,3,4,5,6,7 elements ', function () {
        const result = pipe.transform(items, 1, 7);
        expect(items.slice(1, 7)).toEqual(result);
    });
});
