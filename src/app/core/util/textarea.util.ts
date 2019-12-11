/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  23/5/2019
 *
 */

export class TextareaUtil {


	/**
	 * Divide el texto del TextArea en tres partes  y las devuelve en un arreglo
	 *@textarea Textarea sobre el qu ese realizara la operacion
	 *
	 * @return [Parte antes del texto seleccionado, Parte despues del texto seleccionado, texto seleccionado]
	 */
	static splitTextValueBySelection(textarea: HTMLInputElement | HTMLTextAreaElement): [string, string, string] {

		const value = textarea.value;
		const startSelection = textarea.selectionStart;
		const endSelection = textarea.selectionEnd;
		return [value.substring(0, startSelection), value.substring(endSelection), value.substring(startSelection, endSelection)];
	}

	/**
	 * Mueve el cursor en el textArea hacia la posicion especificada
	 * @textarea Textarea sobre el qu ese realizara la operacion
	 * @param position posicion a la que se quiere mover el cursor
	 * @param component componente donde se disparo el evento para que despues qeu se mueva la posicion del cursor en la formula
	 * devolverle el foco a este.
	 */
	static moveCursorPositionTo(textarea: HTMLInputElement | HTMLTextAreaElement, position, component: HTMLElement = null) {
		textarea.focus();
		textarea.setSelectionRange(position, position);
		if (component) {
			component.focus();
		}

	}


	/**
	 * Emite el evento Input del Textarea , es utilizado despues que se modifica el valor de la formula
	 * @textarea Textarea sobre el qu ese realizara la operacion
	 */
	static dispatchInputEventFromTextArea(textarea: HTMLInputElement | HTMLTextAreaElement) {
		textarea.dispatchEvent(new Event('input'));
	}
}


