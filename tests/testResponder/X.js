/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { defclass, sendmsg } from 'So-o';

import 'Responder';

defclass('X', Responder, 1,
	null,
	null,
	null,
	{	'click':	(self) => {
						console.log('X clicked');
						sendmsg(self, 'respondTo', 'clicked', self);
					},
		'clicked':	(self, sender) => {
						console.log('X received a click from ' + sendmsg(sendmsg(sender, 'class'), 'name'));

						return false;
					}
	}
);
