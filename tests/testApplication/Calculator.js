/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { defclass, sendmsg, supersend } from 'So-o';

defclass('Calculator', null, 1,
		null,
		['accu', 'delegate'],
		null,
		{	'init':	(self, delegate = null) => {
						supersend(Calculator, self, 'init');

						if (delegate)
							sendmsg(self, 'setDelegate', delegate);

						sendmsg(self, 'clear');

						return self;
					},
			'value':	(self) => sendmsg(self, 'get', 'accu'),
			'clear':	(self) => sendmsg(self, 'set', 'accu', 0.0),
			'add':		(self, val) => sendmsg(self, 'set', 'accu', sendmsg(self, 'get', 'accu') + val),
			'sub':		(self, val) => sendmsg(self, 'set', 'accu', sendmsg(self, 'get', 'accu') - val),
			'mul':		(self, val) => sendmsg(self, 'set', 'accu', sendmsg(self, 'get', 'accu') * val),
			'div':		(self, val) => sendmsg(self, 'set', 'accu', sendmsg(self, 'get', 'accu') / val),
			'sqrt':		(self, val) => sendmsg(self, 'set', 'accu', Math.sqrt(sendmsg(self, 'get', 'accu'))),
			'clr':		(self) => sendmsg(self, 'delegate', 'clr'),
			'sto':		(self) => sendmsg(self, 'delegate', 'sto', sendmsg(self, 'get', 'accu')),
			'rcl':		(self) => {
							let val = sendmsg(self, 'delegate', 'rcl');

							return val !== false ? sendmsg(self, 'set', 'accu', val) : false;
						}
		}
);
