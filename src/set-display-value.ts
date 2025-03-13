export const setDisplayValue = () => {
    const btns = document.getElementsByClassName('button--number');

    Array.from(btns).forEach((btn) => {
        btn.addEventListener('click', () => {
            const display = document.getElementById('display');
            display!.innerHTML += btn.innerHTML;
        });
    });
}

