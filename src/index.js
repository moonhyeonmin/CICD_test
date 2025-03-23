import {add} from './functions/add.js';
import {sub} from './functions/sub.js';

export const main = (a, b) => {
    return add(a, b) + sub(a, b);
};

console.log("change branch name");