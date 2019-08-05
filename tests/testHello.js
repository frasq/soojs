/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { sendmsg } from 'So-o';

import 'Hello';

var hello = sendmsg(Hello, 'new');

sendmsg(hello, 'hello');
