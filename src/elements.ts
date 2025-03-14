export const display = '<div id="display"></div>';

export const button = (value: string, className: string, id?: string) => {
    return `<button ${id ? `id="${id}"` : ''} class="${className}" type="button" value="${value}">${value}</button>`;
}

