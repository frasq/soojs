/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { defclass, sendmsg, supersend } from 'So-o';

import 'Once';

defclass('Application', Once, 1,
	null,
	['appName', 'app'],
	null,
	{	'init':
			(self, appName = null, app = null) => {
				supersend(Application, self, 'init');

				if (appName) {
					sendmsg(self, 'set', 'appName', appName);
					
					if (app)
						sendmsg(self, 'set', 'app', app);
				}
				
				return self;
			},
		'appName':	(self) => sendmsg(self, 'get', 'appName'),
		'doesNotRecognize':
			(self, msg, ...args) => {
				let app = sendmsg(self, 'get', 'app');

				if (!app)
					return supersend(Application, self, 'doesNotRecognize', msg);

				return sendmsg(app, 'perform', msg, args);
			}
	}
);
