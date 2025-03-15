export const calculatorContainer = '<div id="calculator"></div>';

export const buttonsContainer = '<div id="buttons"></div>'

export const displayContainer = '<div id="display"></div>';

export const display = '<div id="display-value"></div>';

export const subDisplay = `<div class="sub-display">
    <div id="memory"></div>
    <div id="operation-symbol"></div>
    <div id="sub-total"></div>
</div>`;

export const button = (value: string, className: string, id?: string) => {
    return `<button ${id ? `id="${id}"` : ''} class="${className}" type="button">${value}</button>`;
}

