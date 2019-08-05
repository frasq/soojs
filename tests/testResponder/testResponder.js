/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { sendmsg } from 'So-o';

import 'X';
import 'Y';
import 'Z';

let x = sendmsg(X, 'new');
let y = sendmsg(Y, 'new');
let z = sendmsg(Z, 'new');

sendmsg(x, 'click');

sendmsg(x, 'addNextResponder', y);
sendmsg(x, 'click');

sendmsg(X, 'removeInstanceMessage', 'clicked');
sendmsg(x, 'click');

sendmsg(x, 'addNextResponder', z);
for (let r of sendmsg(x, 'nextResponders'))
	console.log(sendmsg(sendmsg(r, 'class'), 'name'));
sendmsg(x, 'click');

sendmsg(x, 'removeNextResponder', y);
sendmsg(x, 'click');

sendmsg(z, 'addNextResponder', y);
sendmsg(x, 'click');
