/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { defclass } from 'So-o';

defclass('Hello', null, 1,
	null,
	null,
	null,
	{	'hello':	(self) => {
						console.log('Hello from So-o!');
						
						return self;
					}
	}
);
