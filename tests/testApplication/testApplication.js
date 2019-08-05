/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

import {defclass, sendmsg, supersend } from 'So-o';

import 'Application';

import 'Calculator';
import 'CalculatorHelper';

let helper = sendmsg(CalculatorHelper, 'new');
let calc = sendmsg(Calculator, 'new', helper);

let app = sendmsg(Application, 'new', 'Calculator', calc);

console.log(sendmsg(app, 'appName'));
console.log(sendmsg(app, 'value'));

sendmsg(calc, 'clear');
sendmsg(calc, 'add', 5);
sendmsg(calc, 'sqrt');
sendmsg(calc, 'add', 1);
sendmsg(calc, 'div', 2);

let val = sendmsg(calc, 'value');

console.log(val);

sendmsg(calc, 'sto');
sendmsg(calc, 'clear');
console.log(sendmsg(calc, 'value'));
sendmsg(calc, 'rcl');
console.log(sendmsg(calc, 'value'));

sendmsg(calc, 'clear');
sendmsg(calc, 'add', 1);
sendmsg(calc, 'div', val);
console.log(sendmsg(calc, 'value'));

sendmsg(calc, 'clear');
sendmsg(calc, 'add', val);
sendmsg(calc, 'mul', val);
console.log(sendmsg(calc, 'value'));

sendmsg(app, 'clear');
sendmsg(app, 'add', 1);
sendmsg(app, 'div', val);
console.log(sendmsg(app, 'value'));

sendmsg(app, 'clear');
sendmsg(app, 'add', val);
sendmsg(app, 'mul', val);
console.log(sendmsg(app, 'value'));

