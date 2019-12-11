/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  28/6/2019
 *
 */

import {describe} from 'selenium-webdriver/testing';
import {cleanEmptyProperties, getOrDefault, replaceAll} from '@app/core/util/objects';

describe('Objects Function', () => {
	describe('getOrDefault', () => {
			let object;
			beforeEach(() => {
				object = {
					prop: {
						nested: 'value'
					}
				};
			});
			it('should return def value when object null or undefined', function () {
				const result = getOrDefault(null, 'prop', 'def');
				expect(result).toEqual('def');
			});

			it('should return def when prop do not exist', function () {
				const result = getOrDefault(object, 'prop1', 'def1');
				expect(result).toEqual('def1');
			});
			it('should return prop value', function () {
				const result = getOrDefault(object, 'prop', 'def');
				expect(result).toEqual({nested: 'value'});
			});
			it('should return value of nested prop', function () {
				const result = getOrDefault(object, 'prop.nested', 'def');
				expect(result).toEqual('value');
			});
		}
	);
	describe('replaceAll', () => {
		it('should return replaced char in the secuence', function () {
			const result = replaceAll('Secuence to test', 'e', 'a');
			expect(result).toEqual('Sacuanca to tast');
		});

		it('should return replaced secuence in the main secuence', function () {
			const result = replaceAll('Second Secuence to test', 'Se', 'Pa');
			expect(result).toEqual('Pacond Pacuence to test');
		});
	});
	describe('cleanEmptyProperties', () => {
		let object;
		beforeEach(() => {
			object = {
				prop1: 'value1',
				prop2: '',
				prop3: true,
				prop4: 0
			};
		});
		it('should clean empty properties of plain object', function () {
			const result = cleanEmptyProperties(object);
			expect(result).toEqual({
				prop1: 'value1',
				prop3: true,
				prop4: 0
			});
		});
		it('should clean empty properties of nested object', function () {
			object.prop5 = {
				prop6: 'value6',
				prop7: true,
				prop8: 0
			};

			const result = cleanEmptyProperties(object);
			expect(result).toEqual({
				prop1: 'value1',
				prop3: true,
				prop4: 0,
				prop5: {
					prop6: 'value6',
					prop7: true,
					prop8: 0
				}
			});
		});
		it('should return same array prop when clean empty properties', function () {
			object.prop5 = [
				{tipo: 'tipo1', value: 'value1'},
				{tipo: 'tipo2', value: 'value2'},
				{tipo: 'tipo3', value: 'value3'},
			];

			const result = cleanEmptyProperties(object);
			expect(result).toEqual({
				prop1: 'value1',
				prop3: true,
				prop4: 0,
				prop5: [
					{tipo: 'tipo1', value: 'value1'},
					{tipo: 'tipo2', value: 'value2'},
					{tipo: 'tipo3', value: 'value3'},
				]
			});
		});
		it('should clean empty property of object inside array prop', function () {
			object.prop5 = [
				{tipo: '', value: 'value1'},
				{tipo: 'tipo2', value: ''},
				{tipo: 'tipo3', value: 'value3'},
			];

			const result = cleanEmptyProperties(object);
			expect(result).toEqual({
				prop1: 'value1',
				prop3: true,
				prop4: 0,
				prop5: [
					{value: 'value1'},
					{tipo: 'tipo2'},
					{tipo: 'tipo3', value: 'value3'},
				]
			});
		});
		it('should remove property of type object when have no properties after clean it', function () {
			object.prop5 = [
				{tipo: '', value: 'value1'},
				{tipo: 'tipo2', value: ''},
				{tipo: '', value: ''},
			];

			const result = cleanEmptyProperties(object);
			expect(result).toEqual({
				prop1: 'value1',
				prop3: true,
				prop4: 0,
				prop5: [
					{value: 'value1'},
					{tipo: 'tipo2'},
				]
			});
		});
		it('should remove property of type array when have length 0', function () {
			object.prop5 = [{tipo: '', value: ''},
				{tipo: '', value: ''},
				{tipo: '', value: ''}];

			const result = cleanEmptyProperties(object);
			expect(result).toEqual({
				prop1: 'value1',
				prop3: true,
				prop4: 0,
			});
		});

		it('should remove property of type object when have no properties after clean nested array prop', function () {
			object.prop5 = {
				prop6: [
					{tipo: '', value: ''},
					{tipo: '', value: ''},
					{tipo: '', value: ''},
				],
				prop7: ''
			};

			const result = cleanEmptyProperties(object);
			expect(result).toEqual({
				prop1: 'value1',
				prop3: true,
				prop4: 0
			});
		});
		it('should return the same object witdh nested prop and arrays', function () {
			const value = {
				'rut': '111111111',
				'tipoContrato': {
					'descripcion': 'CONTRATO NORMAL',
					'id': 'CM'
				},
				'cnegocio': {
					'id': 'GARPACDURTAR000',
					'descripcion': 'GARCES DURAZNOS TARDE'
				},
				'nombre': 'Rodolfo',
				'appaterno': 'Perez',
				'apmaterno': 'Perez',
				'fechaNacimiento': '1980-06-02T04:00:00.000Z',
				'nacionalidad': {
					'descripcion': 'Alemana',
					'id': 'DE'
				},
				'estadoCivil': 'Soltero',
				'sexo': 'Masculino',
				'fechaInicioContrato': '2019-07-01T04:00:00.000Z',
				'sueldoBase': '78000000',
				'aplicaGratificacion': true,
				'tipoTrabajador': {
					'id': '0',
					'descripcion': 'ACTIVO (NO PENSIONADO)'
				},
				'apv': [
					{
						'tipoAPV': 'A',
						'planAPV': 'UF',
						'valorAPV': '8900',
						'institucionAPV': {
							'id': '29',
							'descripcion': 'PlanVital',
							'rut': '98.001.200-K'
						},
						'formaPagoAPV': 'INDIRECTA'
					}
				],
				'cargaFamiliar': {
					'tipoCarga': [
						{
							'tipo': '01', 'valor': '12'
						}
					]
				},
				'regimenPrevisional': {
					'regimen': '01',
					'institucion': '33'
				},
				'salud': {
					'institucion': {
						'id': '04',
						'descripcion': 'Colmena',
						'rut': '94.954.000-6'
					},
					'tipoPlan': '05',
					'valorUF': '1222'
				}
			};
			const result = cleanEmptyProperties(value);
			expect(result).toEqual(value);
		});
	});
});
