const BUTTON_CLASS = 'button--number';
const ACTION_BUTTON_CLASS = 'button--action';
const ACTION_SECONDARY_BUTTON_CLASS = 'button--action-secondary';
const EQUALS_BUTTON_CLASS = 'button--equals';
const OPERACTION_BUTTON_CLASS = 'button--operation';

export type Button = {
    value: string;
    className: string;
    id?: string;
}

export enum actionTypes {
    ADD = 'add',
    SUBTRACT = 'subtract',
    DIVIDE = 'divide',
    MULTIPLY = 'multiply',
    EQUALS = 'equals',
    NEGATE = 'negate',
    PERCENTAGE = 'percentage',
    SQUARE_ROOT = 'square-root',
    SQUARE = 'square',
    UNKNOWN = 'unknown',
}

export type ButtonAndAction = {
    button: Element;
    action: actionTypes;
}

export const buttonValues = [{
    value: 'AC',
    className: OPERACTION_BUTTON_CLASS,
    id: 'clear-all',
},{
    value: 'C',
    className: OPERACTION_BUTTON_CLASS,
    id: 'clear',
},{
    value: 'M&#43;/&#8722;',
    className: OPERACTION_BUTTON_CLASS,
    id: 'memory-add-remove',
},{
    value: 'MR',
    className: OPERACTION_BUTTON_CLASS,
    id: 'memory-recall',
},{
    value: '&#43;/&#8722;',
    className: ACTION_SECONDARY_BUTTON_CLASS,
    id: 'negate',
},{
    value: '&#37;',
    className: ACTION_SECONDARY_BUTTON_CLASS,
    id: 'percentage',
},{
    value: '&#8730;',
    className: ACTION_SECONDARY_BUTTON_CLASS,
    id: 'square-root',
},{
    value: 'x&#178;',
    className: ACTION_SECONDARY_BUTTON_CLASS,
    id: 'square',
},{
    value: '7',
    className: BUTTON_CLASS,
}, {
    value: '8',
    className: BUTTON_CLASS,
}, {
    value: '9',
    className: BUTTON_CLASS,
},{
    value: '&#43;',
    className: ACTION_BUTTON_CLASS,
    id: 'add',
}, {
    value: '4',
    className: BUTTON_CLASS,
}, {
    value: '5',
    className: BUTTON_CLASS,
}, {
    value: '6',
    className: BUTTON_CLASS,
},{
    value: '&#8722;',
    className: ACTION_BUTTON_CLASS,
    id: 'subtract'
}, {
    value: '3',
    className: BUTTON_CLASS,
}, {
    value: '2',
    className: BUTTON_CLASS,
}, {
    value: '1',
    className: BUTTON_CLASS,
}, {
    value: '&#247;',
    className: ACTION_BUTTON_CLASS,
    id: 'divide',
}, {
    value: '.',
    className: BUTTON_CLASS,
}, {
    value: '0',
    className: BUTTON_CLASS,
}, {
    value: '=',
    className: EQUALS_BUTTON_CLASS,
    id: 'equals',
}, {
    value: '&#215;',
    className: ACTION_BUTTON_CLASS,
    id: 'multiply',
}];