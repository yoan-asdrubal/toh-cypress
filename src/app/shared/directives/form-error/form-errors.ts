/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  3/4/2019
 *
 */

import {InjectionToken} from '@angular/core';


export const defaultErrors = {
	required: (error) => `Campo Requerido.`,
	minlength: ({requiredLength, actualLength}) => `Longitud Mínima ${requiredLength} requerida.`,
	maxlength: ({requiredLength, actualLength}) => `Longitud Mánima ${requiredLength} requerida`,
	email: (error) => `Ingrese un correo válido.`,
	min: ({min}) => `Valor mínimo permitido ${min}`,
	max: ({max}) => `Valor máximo permitido ${max}`,
	pattern: (pat) => 'Tipo de dato no válido',
	invalidRut: () => 'Rut no válido',
	matDatepickerParse: (text) => 'Valor de fecha no válido',
	alpha: (val) => val.message || 'Este campo solo permite letras',
	numeric: (val: any) => val.message || 'Este campo es solo numérico',
	minNumber: (val) => val.message || `Valor mínimo permitido ${val.refValues[1]}`,
	maxNumber: (val) => val.message || `Valor máximo permitido ${val.refValues[1]}`,
	digit: (val) => val.message || `Este campo solo permite dígitos`,
	alphaNumeric: (val) => val.message || `Este campo es alfanumérico`,
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
	providedIn: 'root',
	factory: () => defaultErrors
});


