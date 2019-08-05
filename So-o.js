/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import 'Root';

import { Definition } from 'OL';

export function defclass(name, superclass, revision, classProperties, instanceProperties, classMessages, instanceMessages) {
	let c = new Definition(name, superclass, revision, classProperties, instanceProperties, classMessages, instanceMessages);

	global[name] = c;
	
	if ('Root' !== name)
		sendmsg(c, 'initialize');

	return c;
}

export function sendmsg(rcv, msg, ...args) {
	return rcv.sendself(msg, args);
}

export function supersend(fc, rcv, msg, ...args) {
	return rcv.sendsuper(fc, msg, args);
}
