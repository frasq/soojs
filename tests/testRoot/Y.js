/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { defclass, sendmsg, supersend } from 'So-o';

defclass('Y', X, 2,
		null,
		null,
		null,
		{	'init':	(self, value = 0) => {
						console.log('Y::init');
		
						supersend(Y, self, 'init', value);

						return self;
					},
			'f':	(self, n) => {
						console.log(`**${n*2}`);
		
						supersend(Y, self, 'f', n);

						return self;
					},
			'echo':	(self, ...args) => {
						if (args)
							console.log(args.join(''));
						return self;
					}
		}
);
