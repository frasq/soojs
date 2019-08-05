/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

import {defclass, sendmsg, supersend } from 'So-o';

import 'X';
import 'Y';
import 'Z';

console.log(sendmsg(X, 'name'));
console.log(sendmsg(X, 'revision'));
console.log(sendmsg(X, 'count'));

let x = sendmsg(X, 'new', -1);
console.log(sendmsg(sendmsg(x, 'superclass'), 'name'));
console.log(sendmsg(x, 'value'));
console.log(sendmsg(X, 'count'));

let y = sendmsg(Y, 'new', -2);
console.log(sendmsg(sendmsg(y, 'superclass'), 'name'));
console.log(sendmsg(y, 'value'));
console.log(sendmsg(X, 'count'));
console.log(sendmsg(Y, 'count'));

let z = sendmsg(Z, 'new', -3);
console.log(sendmsg(sendmsg(z, 'superclass'), 'name'));
console.log(sendmsg(z, 'value'));
console.log(sendmsg(X, 'count'));
console.log(sendmsg(Y, 'count'));
console.log(sendmsg(Z, 'count'));

sendmsg(x, 'f', 4);
sendmsg(y, 'f', 4);
sendmsg(z, 'f', 4);

sendmsg(y, 'echo', 'Hello', ', ', 'world', '!');

console.log(sendmsg(X, 'classMessages'));
console.log(sendmsg(X, 'instanceMessages'));
console.log(sendmsg(Y, 'classMessages'));
console.log(sendmsg(X, 'classMessages', false));
console.log(sendmsg(Y, 'instanceMessages', false));

console.log(sendmsg(X, 'classProperties'));
console.log(sendmsg(X, 'instanceProperties'));
console.log(sendmsg(Y, 'classProperties'));
console.log(sendmsg(X, 'classProperties', false));
console.log(sendmsg(X, 'instanceProperties', false));

console.log(sendmsg(X, 'classMethodFor', 'count'));
console.log(sendmsg(Y, 'classMethodFor', 'count'));

console.log(sendmsg(X, 'instanceMethodFor', 'f'));
console.log(sendmsg(Y, 'instanceMethodFor', 'f'));

sendmsg(Y, 'addClassMessage', 'supercount', (self) => supersend(Y, self, 'count'));
console.log(sendmsg(Y, 'classMessages', false));
console.log(sendmsg(Y, 'supercount'));
sendmsg(Y, 'removeClassMessage', 'supercount');
console.log(sendmsg(Y, 'classMessages', false));

sendmsg(y, 'g');
sendmsg(Y, 'addInstanceMessage', 'g', (self) => { console.log('Y::g'); return self; });
console.log(sendmsg(Y, 'instanceMessages', false));
sendmsg(y, 'g');
sendmsg(Y, 'removeInstanceMessage', 'g');
console.log(sendmsg(Y, 'instanceMessages', false));
sendmsg(y, 'g');

sendmsg(Y, 'addClassProperty', 'foobar');
console.log(sendmsg(Y, 'classProperties', false));
sendmsg(Y, 'removeClassProperty', 'foobar');
console.log(sendmsg(Y, 'classProperties', false));

sendmsg(Y, 'addInstanceProperty', 'barfoo');
console.log(sendmsg(Y, 'instanceProperties', false));
sendmsg(Y, 'removeInstanceProperty', 'barfoo');
console.log(sendmsg(Y, 'instanceProperties', false));

console.log(sendmsg(y, 'messages'));
console.log(sendmsg(y, 'messages', false));
console.log(sendmsg(y, 'properties'));
console.log(sendmsg(y, 'properties', false));
console.log(sendmsg(y, 'isKindOf', Root));
console.log(sendmsg(y, 'isKindOf', X));
console.log(sendmsg(x, 'isKindOf', Y));
console.log(sendmsg(y, 'methodFor', 'init'));
console.log(sendmsg(y, 'respondsTo', 'value'));
console.log(sendmsg(y, 'respondsTo', 'foobar'));

sendmsg(X, 'addInstanceProperty', 'delegate');
console.log(sendmsg(x, 'delegate'));
sendmsg(x, 'setDelegate', y);
console.log(sendmsg(sendmsg(sendmsg(x, 'delegate'), 'class'), 'name'));
sendmsg(x, 'delegate', 'echo', 'Hello', ', ', 'world', '!');
sendmsg(x, 'delegate', 'foobar');
sendmsg(y, 'delegate', 'echo', 'Hello', ', ', 'world', '!');
sendmsg(x, 'setDelegate', null);
sendmsg(x, 'delegate', 'echo', 'Hello', ', ', 'world', '!');
sendmsg(X, 'removeInstanceProperty', 'delegate');
console.log(sendmsg(X, 'instanceProperties', false));

sendmsg(X, 'error', '{0}::{1}', sendmsg(X, 'name'), 'foobar');
sendmsg(x, 'error', '{0}::{1}', sendmsg(X, 'name'), 'foobar');
sendmsg(X, 'doesNotContain', 'foobar');
sendmsg(X, 'doesNotRecognize', 'foobar');
sendmsg(x, 'doesNotContain', 'foobar');
sendmsg(x, 'doesNotRecognize', 'foobar');
sendmsg(x, 'notImplemented', 'foobar');
sendmsg(x, 'subclassResponsibility', 'foobar');

sendmsg(X, 'foobar');
sendmsg(x, 'foobar');

let sdata;

sdata = sendmsg(X, 'write');
console.log(sdata);
console.log(sendmsg(X, 'get', 'count'));
sendmsg(X, 'set', 'count', -1);
console.log(sendmsg(X, 'get', 'count'));
sendmsg(X, 'read', sdata);
console.log(sendmsg(X, 'get', 'count'));

sdata = sendmsg(x, 'write');
console.log(sdata);
console.log(sendmsg(x, 'get', 'value'));
sendmsg(x, 'set', 'value', 1);
console.log(sendmsg(x, 'get', 'value'));
sendmsg(x, 'read', sdata);
console.log(sendmsg(x, 'get', 'value'));
sdata = sendmsg(x, 'write');
console.log(sdata);

console.log(sendmsg(Y, 'perform', 'revision'));
sendmsg(y, 'perform', 'f', [3]);
sendmsg(y, 'perform', 'echo', ['Hello', ', ', 'world', '!']);

sendmsg(z, 'free');
console.log(sendmsg(Z, 'count'));
