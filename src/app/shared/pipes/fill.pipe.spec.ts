import {FillPipe} from './fill.pipe';

describe('FillPipe', () => {
	it('create an instance', () => {
		const pipe = new FillPipe();
		expect(pipe).toBeTruthy();
	});
	it(`debe llenar un arreglo vacio con los valores [0,1,2,3 4]`, () => {
		const pipe = new FillPipe();
		const result = pipe.transform([], 5);
		expect(result).toEqual([0, 1, 2, 3, 4]);
	});
	it(`debe agregar 5 valores al arreglo [1,2,4,5] y devolver [1, 2, 4, 5, 0, 1, 2, 3, 4]`, () => {
		const pipe = new FillPipe();
		const result = pipe.transform([1, 2, 4, 5], 5);
		expect(result).toEqual([1, 2, 4, 5, 0, 1, 2, 3, 4]);
	});
});
