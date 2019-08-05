/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { defclass, sendmsg, supersend } from 'So-o';

defclass('Z', Y, 3,
		null,
		null,
		null,
		{	'init':	(self, value = 0) => {
						console.log('Z::init');
			
						supersend(Z, self, 'init', value);

						return self;
					},
			'f':	(self, n) => {
						supersend(Z, self, 'f', n);

						return self;
					}
			}
);
