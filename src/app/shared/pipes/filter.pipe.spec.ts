import {FilterPipe} from './filter.pipe';

describe('FilterPipe', () => {
	const filterPipe = new FilterPipe();
	let values = [];
	beforeEach(function () {
		values = [
			{id: 1, name: 'Component', description: 'Angular Component', value: '1234'},
			{id: 2, name: 'Filter', description: 'Angular mock example', value: '2345'},
			{id: 3, name: 'Pipes', description: 'Use to filter some times', value: '1456'},
			{id: 4, name: 'Directives', description: ' Angular directives', value: '1543'},
			{id: 5, name: 'Modules', description: 'App Modules', value: '1544'},
			{id: 6, name: 'Mat Dialod', description: 'Angular Material Dialog', value: '5671'},
			{id: 7, name: 'Input', description: 'Mat Input search to Filter some times', value: '4456'},
			{id: 8, name: 'Cookies Services', description: 'Use to acces to cookies', value: '7890'},
			{id: 9, name: 'Mat Select', description: ' Use to show options to select', value: '9980'},
			{id: 10, name: 'Radios Buttons', description: ' Mat Radios to use natives radio buttons', value: '7869'},
		];
	});
	it('create an instance', () => {
		expect(filterPipe).toBeTruthy();
	});

	it('should return filtered from array of strings ', function () {
		const valuesString = values.map(value => value.name);
		const filter = {filtro: {filter: 'mat'}};
		const transform = filterPipe.transform(valuesString, filter);
		const result = ['Mat Dialod', 'Mat Select'];

		expect(transform).toEqual(result);

	});

	it('should return filtered from array of objects with one filter and one key', function () {
		const valuesObject = values.map(value => {
				return {id: value.id, name: value.name};
			}
		);
		const filter = {filtro: {filter: 'es', keys: ['name']}};

		const transform = filterPipe.transform(valuesObject, filter);
		const result = [
			{id: 3, name: 'Pipes'},
			{id: 4, name: 'Directives'},
			{id: 5, name: 'Modules'},
			{id: 8, name: 'Cookies Services'}
		];

		expect(transform).toEqual(result);

	});

	it('should return filtered from array of objects with one filter and  several keys', function () {

		const filter = {filtro: {filter: 'filter', keys: ['name', 'description']}};
		const transform = filterPipe.transform(values, filter);
		const result = [
			{id: 2, name: 'Filter', description: 'Angular mock example', value: '2345'},
			{id: 3, name: 'Pipes', description: 'Use to filter some times', value: '1456'},
			{id: 7, name: 'Input', description: 'Mat Input search to Filter some times', value: '4456'}
		];

		expect(transform).toEqual(result);
	});
	it('should return filtered from array of objects with several filters and  several keys', function () {

		const filter = {
			filter_search: {
				filter: 'FILTER', keys: ['name', 'description']
			},
			filter_value: {
				filter: '44', keys: ['value']
			}
		};
		const transform = filterPipe.transform(values, filter);
		const result = [
			{id: 7, name: 'Input', description: 'Mat Input search to Filter some times', value: '4456'}
		];
		expect(transform).toEqual(result);
	});

	it('should do not filter when prop filter is empty ', function () {
		const filter = {
			filter_search: {
				filter: '', keys: ['name', 'description']
			},
			filter_value: {
				filter: '44', keys: ['value']
			}
		};
		const transform = filterPipe.transform(values, filter);
		const result = [
			{id: 5, name: 'Modules', description: 'App Modules', value: '1544'},
			{id: 7, name: 'Input', description: 'Mat Input search to Filter some times', value: '4456'}
		];
		expect(transform).toEqual(result);
	});

	it('should do not filter when prop filter is null ', function () {
		const filter = {
			filter_search: {
				filter: null, keys: ['name', 'description']
			},
			filter_value: {
				filter: '44', keys: ['value']
			}
		};
		const transform = filterPipe.transform(values, filter);
		const result = [
			{id: 5, name: 'Modules', description: 'App Modules', value: '1544'},
			{id: 7, name: 'Input', description: 'Mat Input search to Filter some times', value: '4456'}
		];
		expect(transform).toEqual(result);
	});
	it('should do not filter when prop filter is undefined ', function () {
		const filter = {
			filter_search: {
				filter: undefined, keys: ['name', 'description']
			},
			filter_value: {
				filter: '44', keys: ['value']
			}
		};
		const transform = filterPipe.transform(values, filter);
		const result = [
			{id: 5, name: 'Modules', description: 'App Modules', value: '1544'},
			{id: 7, name: 'Input', description: 'Mat Input search to Filter some times', value: '4456'}
		];
		expect(transform).toEqual(result);
	});

	it('should filter by child object property', function () {
		const localValue = [
			{
				name: 'Module',
				extra: {
					descripcion: 'Permite agrupar elementos  de Angular'
				}
			},
			{
				name: 'Component',
				extra: {
					descripcion: 'Define un componente usando la directiva @Component'
				}
			},
			{
				name: 'Directive',
				extra: {
					descripcion: 'Implementa comportamientos sobre elementos especificos de la aplicacion'
				}
			},
			{
				name: 'Module',
				extra: {
					descripcion: 'Declaras Component, Directives, Pipes y Routing'
				}
			}
		];

		const filter = {
			filter_name: {
				filter: 'mod', keys: ['name']
			},
			filter_value: {
				filter: 'agrup', keys: ['extra.descripcion']
			}
		};
		const transform = filterPipe.transform(localValue, filter);
		const result = [
			{
				name: 'Module',
				extra: {
					descripcion: 'Permite agrupar elementos  de Angular'
				}
			}
		];
		expect(transform).toEqual(result);
	});

	it('should throw error when child property do not exist', function () {
		const localValue = [
			{
				name: 'Module',
				extra: {
					descripcion: 'Permite agrupar elementos  de Angular'
				}
			},
			{
				name: 'Component',
				extra: {
					descripcion: 'Define un componente usando la directiva @Component'
				}
			}
		];

		let filter = {
			filter_value: {
				filter: 'agrup', keys: ['extrasd.descripcion']
			}
		};
		try {
			filterPipe.transform(localValue, filter);
		} catch (e) {
			expect(e.message).toEqual('El objeto no contiene la propiedad extrasd');
		}
		filter = {
			filter_value: {
				filter: 'agrup', keys: ['extra.descrip']
			}
		};
		try {
			filterPipe.transform(localValue, filter);
		} catch (e) {
			expect(e.message).toEqual('El objeto no contiene la propiedad descrip');
		}

	});

	it('should throw error when child property value it is null or undefined', function () {
		const localValue = [
			{
				name: 'Module',
				extra: {
					descripcion: 'Permite agrupar elementos  de Angular'
				}
			},
			{
				name: 'Component',
				extra: {
					descripcion: null
				}
			}
		];

		const filter = {
			filter_value: {
				filter: 'agrup', keys: ['extra.descripcion']
			}
		};
		try {
			filterPipe.transform(localValue, filter);
		} catch (e) {
			expect(e.message).toEqual('Valor indefinido o nulo en la propiedad descripcion');
		}

	});
});
