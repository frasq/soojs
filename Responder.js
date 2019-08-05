/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { defclass, sendmsg, supersend } from 'So-o';

defclass('Responder', null, 1,
	null,
	['nextResponders'],
	null,
	{	'nextResponders':		(self) => sendmsg(self, 'get', 'nextResponders'),
		'setNextResponders':	(self, responders) => sendmsg(self, 'set', 'nextResponders', responders),
		'addNextResponder':
			(self, r) => {
				let responders = sendmsg(self, 'get', 'nextResponders');

				if (!responders)
					sendmsg(self, 'set', 'nextResponders', [r]);
				else {
					if (responders.indexOf(r) == -1)
						responders.push(r);
				}

				return self;
			},
		'removeNextResponder':
			(self, r) => {
				let responders = sendmsg(self, 'get', 'nextResponders');

				if (responders) {
					let i = responders.indexOf(r);
					
					if (i != -1)
						responders.splice(i, 1);
				}
	
				return self;
			},
		'respondTo':
			(self, msg, ...args) => {
				if (sendmsg(self, 'respondsTo', msg) && sendmsg(self, msg, ...args))
					return self;

				let responders = sendmsg(self, 'get', 'nextResponders');
				
				if (responders) {
					for (let r of responders)
						sendmsg(r, 'respondTo', msg, ...args);
				}

				return self;
			}
	}
);
