/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  12/2/2019
 * /
 */


export const newState = (state, obj) => Object.assign({}, ...state, ...obj);


export const newStateFromMany = (states: any[]) => states.reduce((acc, crr) => {
    return Object.assign({}, {...acc}, {...crr});
}, {});


export const toPayload = <T>(action: { payload: T }) => action.payload;
