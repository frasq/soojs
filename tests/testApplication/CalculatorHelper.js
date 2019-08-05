/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { defclass, sendmsg, supersend } from 'So-o';

defclass('CalculatorHelper', null, 1,
		null,
		['mem'],
		null,
		{	'init':	(self) => {
						supersend(CalculatorHelper, self, 'init');

						sendmsg(self, 'clr');

						return self;
						},
			'clr':	(self) => sendmsg(self, 'sto', 0.0),
			'sto':	(self, val) => sendmsg(self, 'set', 'mem', val),
			'rcl':	(self) => sendmsg(self, 'get', 'mem')
		}
);
