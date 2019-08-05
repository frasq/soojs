/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { defclass, sendmsg, supersend } from 'So-o';

defclass('X', null, 1,
		['count'],
		['value'],
		{	'new':	(self, value = 0) => {
						sendmsg(self, 'incr');
			
						return supersend(X, self, 'new', value);
					},
			'initialize':	(self) => sendmsg(self, 'set', 'count', 0),
			'incr':			(self) => sendmsg(self, 'set', 'count', sendmsg(self, 'get', 'count') + 1),
			'decr':			(self) => sendmsg(self, 'set', 'count', sendmsg(self, 'get', 'count') - 1),
			'count':		(self) => sendmsg(self, 'get', 'count')
		},
		{	'init':	(self, value = 0) => {
				console.log('X::init');

				supersend(X, self, 'init');

				sendmsg(self, 'set', 'value', value);
				
				return self;
			},
			'free':	(self) => {
				sendmsg(sendmsg(self, 'class'), 'decr');
				
				supersend(X, self, 'free');
			},
			'f':	(self, n) => {
						console.log(`*${n}`);
		
						if (n > 0)
							sendmsg(self, 'f', n-1);
		
						return self;
					},
			'g':	(self) => {
						console.log('X::g');
						
						return self;
					},
			'value':	(self) => sendmsg(self, 'get', 'value')
		}
);
