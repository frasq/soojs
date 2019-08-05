/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

import 'So-o';

import 'X';
import 'Y';

console.log(Root.toString());

console.log(X.toString());
console.log(Y.toString());

import * as OL from 'OL';

console.log(OL.class_name(Root));
console.log(OL.class_name(X));

console.log(OL.class_revision(Root));

console.log(OL.class_superclass(Root));
console.log(OL.class_name(OL.class_superclass(X)));
console.log(OL.class_name(OL.class_superclass(Y)));

console.log(OL.class_class_properties(Root));
console.log(OL.class_class_messages(Root));
console.log(OL.class_instance_properties(X));
console.log(OL.class_instance_messages(Root));

OL.class_add_class_message(Root, 'foobar');
console.log(OL.class_class_messages(Root));
OL.class_remove_class_message(Root, 'foobar');
console.log(OL.class_class_messages(Root));

OL.class_add_instance_message(Root, 'foobar');
console.log(OL.class_instance_messages(Root));
OL.class_remove_instance_message(Root, 'foobar');
console.log(OL.class_instance_messages(Root));

OL.class_add_class_property(Root, 'foobar');
console.log(OL.class_class_properties(Root));
OL.class_remove_class_property(Root, 'foobar');
console.log(OL.class_class_properties(Root));

OL.class_add_instance_property(Root, 'foobar');
console.log(OL.class_instance_properties(Root));
OL.class_remove_instance_property(Root, 'foobar');
console.log(OL.class_instance_properties(Root));

console.log(OL.class_attributes(Root));

console.log(OL.class_is_kind_of(Root, Root));
console.log(OL.class_is_kind_of(X, Root));
console.log(OL.class_is_kind_of(Root, X));
console.log(OL.class_is_kind_of(Y, Root));

OL.class_add_class_property(Root, 'debug');
console.log(OL.class_get(Root, 'debug'));
console.log(OL.class_get(OL.class_set(Root, 'debug', true), 'debug'));
console.log(OL.class_get(OL.class_set(Root, 'debug', false), 'debug'));

let obj = OL.class_make(Root);
console.log(OL.class_name(OL.object_class(obj)));
let x = OL.class_make(X);
console.log(OL.class_name(OL.object_class(x)));
console.log(OL.class_name(OL.object_superclass(x)));
let y = OL.class_make(Y);
console.log(OL.class_name(OL.object_class(y)));
console.log(OL.class_name(OL.object_superclass(y)));

OL.object_assume(obj, Y);
console.log(OL.class_name(OL.object_class(obj)));

obj = OL.class_make(Root);
x = OL.class_make(X);
y = OL.class_make(Y);

console.log(OL.object_attributes(x));
console.log(OL.object_get(x, 'value'));
console.log(OL.object_get(OL.object_set(x, 'value', 1), 'value'));
console.log(OL.object_get(OL.object_set(y, 'value', 1), 'value'));

let y2 = OL.object_copy(y);

console.log(OL.class_name(OL.object_class(y2)));
console.log(OL.object_get(y2, 'value'));
console.log(OL.object_get(OL.object_set(y2, 'value', 2), 'value'));
console.log(OL.object_get(y, 'value'));

/*

OL.class_send_message(Root, 'error', "{0} is dead, but {1} is alive! {0} {2}", "ASP", "ASP.NET");
OL.class_send_message(Root, 'doesNotContain', 'foobar');
OL.class_send_message(Root, 'doesNotRecognize', 'foobar');
OL.class_send_message(Root, 'notImplemented', 'foobar');
OL.class_send_message(Root, 'subclassResponsibility', 'foobar');

OL.object_send_message(obj, 'error', "{0} is dead, but {1} is alive! {0} {2}", "ASP", "ASP.NET");
OL.object_send_message(obj, 'doesNotContain', 'foobar');
OL.object_send_message(obj, 'doesNotRecognize', 'foobar');
OL.object_send_message(obj, 'notImplemented', 'foobar');
OL.object_send_message(obj, 'subclassResponsibility', 'foobar');

*/
