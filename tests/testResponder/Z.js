/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { defclass, sendmsg } from 'So-o';

import 'Responder';

defclass('Z', Responder, 1,
	null,
	null,
	null,
	{	'clicked':	(self, sender) => {
						console.log('Z received a click from ' + sendmsg(sendmsg(sender, 'class'), 'name'));

						return true;
					}
	}
);
