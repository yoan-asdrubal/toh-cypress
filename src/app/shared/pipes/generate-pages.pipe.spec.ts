import {GeneratePagesPipe} from './generate-pages.pipe';

describe('GeneratePagesPipe', () => {
    const pipe = new GeneratePagesPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return 2 current_page', () => {
        const pages = pipe.transform(17, 10);
        expect(pages).toEqual([0, 1]);
    });

    it('should return 4 current_page', () => {
        const pages = pipe.transform(17, 5);
        expect(pages).toEqual([0, 1, 2, 3]);
    });
});
