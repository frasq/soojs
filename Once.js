/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { defclass, sendmsg, supersend } from 'So-o';

defclass('Once', null, 1,
	['instance'],
	null,
	{	'new':
			(self, ...args) => {
				let i = sendmsg(self, 'get', 'instance');
	
				if (!i) {
					i = supersend(Once, self, 'new', ...args);
					sendmsg(self, 'set', 'instance', i);
				}
	
				return i;
			}
	},
	null
);
