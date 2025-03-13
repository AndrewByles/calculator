import { setDisplayValue } from './set-display-value.ts';

import './styles/main.css'

document.querySelector<HTMLDivElement>('#calculator')!.innerHTML = `
    <div>
        <div id="display"></div>
        <button class="button--number" type="button" value="7">7</button>
        <button class="button--number" type="button">8</button>
        <button class="button--number" type="button">9</button>
        <button class="button button--action" type="button">&#43;</button>
        
        <button class="button--number" type="button">4</button>
        <button class="button--number" type="button">5</button>
        <button class="button--number" type="button">6</button>
        <button class="button--number button--action" type="button">&#8722;</button>
        
        <button class="button--number" type="button">3</button>
        <button class="button--number" type="button">2</button>
        <button class="button--number" type="button">1</button>
        <button class="button button--action" type="button">&#247;</button>
        
        <button class="button--number" type="button">&#x2219;</button>
        <button class="button--number" type="button">0</button>
        <button class="button button--equals" type="button">&equals;</button>
        <button class="button button--action" type="button">&#215;</button>
    </div>
`;

setDisplayValue();
