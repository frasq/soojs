/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

export function Definition(cname, sc, rev, cprops, iprops, cmsgs, imsgs) {
	const varname= /^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/;

	if (! (typeof cname === 'string' && cname.match(varname)))
		throw new TypeError();

	if (! (sc === null || (typeof sc === 'object' && sc.prototype instanceof Definition)))
		throw new TypeError();
	
	if (!(Number.isInteger(rev) && rev > 0))
		throw new TypeError();

	this.prototype = Object.create(Definition.prototype);
	
	this.name = cname;
	this.revision = rev;
	this.superclass = 'Root' !== cname ? (sc ? sc : Root) : null;
	this.cproperties = cprops;
	this.iproperties = iprops;
	this.cmessages = cmsgs;
	this.imessages = imsgs;

	this.attributes = {};
}

Definition.prototype.toString = function() {
	return 'class(' + this.name + ')';
};

Definition.prototype.sendself = function(msg, args) {
	return class_send_message(this, msg, args);
}

Definition.prototype.sendsuper = function(fc, msg, args) {
	return class_super_send_message(fc, this, msg, args);
}

export function Instance(c) {
	if (! (typeof c === 'object' && c.prototype instanceof Definition))
		throw new TypeError();

	this.prototype = Object.create(Instance.prototype);

	this.class = c;

	this.attributes = {};
}

Instance.prototype.toString = function() {
	return 'object(' + this.class.name + ')';
};

Instance.prototype.sendself = function(msg, args) {
	return object_send_message(this, msg, args);
}

Instance.prototype.sendsuper = function(fc, msg, args) {
	return object_super_send_message(fc, this, msg, args);
}

//engine

function class_class_method_function(c, msg) {
	return c.cmessages[msg];
}

function class_instance_method_function(c, msg) {
	return c.imessages[msg];
}

//

export function class_name(c) {
	return c.name;
}

export function class_revision(c) {
	return c.revision;
}

export function class_superclass(c) {
	return c.superclass;
}

export function class_class_properties(c) {
	return c.cproperties;
}

export function class_instance_properties(c) {
	return c.iproperties;
}

export function class_class_messages(c) {
	return c.cmessages;
}

export function class_instance_messages(c) {
	return c.imessages;
}

export function class_set_class_properties(c, props) {
	c.cproperties = props;

	return c;
}

export function class_set_instance_properties(c, props) {
	c.iproperties = props;

	return c;
}

export function class_set_class_messages(c, msgs) {
	c.cmessages = msgs;

	return c;
}

export function class_set_instance_messages(c, msgs) {
	c.imessages = msgs;

	return c;
}

export function class_add_class_message(c, msg, f) {
	if (c.cmessages == null)
		c.cmessages = {};
	
	c.cmessages[msg] = f;

	return c;
}

export function class_remove_class_message(c, msg) {
	delete c.cmessages[msg];
	
	if (Object.keys(c.cmessages).length === 0)
		c.cmessages = null;
	
	return c;
}

export function class_add_instance_message(c, msg, f) {
	if (c.imessages == null)
		c.imessages = {};

	c.imessages[msg] = f;

	return c;
}

export function class_remove_instance_message(c, msg) {
	delete c.imessages[msg];

	if (Object.keys(c.imessages).length === 0)
		c.imessages = null;
	
	return c;
}

export function class_add_class_property(c, prop) {
	if (c.cproperties == null)
		c.cproperties = [];
	
	c.cproperties.push(prop);

	return c;
}

export function class_remove_class_property(c, prop) {
	if (! c.cproperties)
		return c;
	
	let i = c.cproperties.indexOf(prop);

	if (i === -1)
		return c;

	if (c.cproperties.length > 1)
		c.cproperties.splice(i, 1);
	else
		c.cproperties = null;

	return c;
}

export function class_add_instance_property(c, prop) {
	if (c.iproperties == null)
		c.iproperties = [];

	c.iproperties.push(prop);

	return c;
}

export function class_remove_instance_property(c, prop) {
	if (! c.iproperties)
		return c;
	
	let i = c.iproperties.indexOf(prop);

	if (i === -1)
		return c;

	if (c.iproperties.length > 1)
		c.iproperties.splice(i, 1);
	else
		c.iproperties = null;

	return c;
}

export function class_attributes(c) {
	return c.attributes;
}

export function class_set_attributes(c, data) {
	c.attributes = data;

	return c;
}

export function class_is_kind_of(c, ac) {
	if (c === ac)
		return true;

	let sc = class_superclass(c);

	return sc ? class_is_kind_of(sc, ac) : false;
}

//

export function class_get(c, attr) {
	if (!class_find_class_property(c, attr))
		return class_send_message(c, 'doesNotContain', [attr]);

	return c.attributes[attr];
}

export function class_set(c, attr, val) {
	if (!class_find_class_property(c, attr))
		return class_send_message(c, 'doesNotContain', [attr]);

	c.attributes[attr] = val;

	return c;
}

//

export function class_make(c) {
	return new Instance(c);
}

//

export function object_class(o) {
	return o.class;
}

export function object_superclass(o) {
	return class_superclass(object_class(o));
}

export function object_assume(o, c) {
	o.class = c;

	return o;
}

export function object_attributes(o) {
	return o.attributes;
}

export function object_set_attributes(o, attrs) {
	o.attributes = attrs;

	return o;
}

//

export function object_get(o, attr) {
	if (!class_find_instance_property(object_class(o), attr))
		return object_send_message(o, 'doesNotContain', [attr]);

	return o.attributes[attr];
}

export function object_set(o, attr, val) {
	if (!class_find_instance_property(object_class(o), attr))
		return object_send_message(o, 'doesNotContain', [attr]);

	o.attributes[attr] = val;

	return o;
}

//

export function object_copy(o) {
	let co = class_make(object_class(o));

	if (o.attributes)
		co.attributes = Object.assign({}, o.attributes);

	return co;
}

//

export function class_find_class_property(c, prop) {
	if (c.cproperties && c.cproperties.indexOf(prop) != -1)
		return c;
	
	let sc = class_superclass(c);

	return sc ? class_find_class_property(sc, prop) : false;
}

export function class_find_instance_property(c, prop) {
	if (c.iproperties && c.iproperties.indexOf(prop) != -1)
		return c;
	
	let sc = class_superclass(c);

	return sc ? class_find_instance_property(sc, prop) : false;
}

export function class_find_class_method_class(c, msg) {
	if (c.cmessages && c.cmessages.hasOwnProperty(msg))
		return c;

	let sc = class_superclass(c);

	return sc ? class_find_class_method_class(sc, msg) : false;
}

export function class_find_class_method(c, msg) {
	let _c = class_find_class_method_class(c, msg);

	return _c ? class_class_method_function(_c, msg) : false;
}

export function class_find_instance_method_class(c, msg) {
	if (c.imessages && c.imessages.hasOwnProperty(msg))
		return c;

	let sc = class_superclass(c);

	return sc ? class_find_instance_method_class(sc, msg) : false;
}

export function class_find_instance_method(c, msg) {
	let _c = class_find_instance_method_class(c, msg);

	return _c ? class_instance_method_function(_c, msg) : false;
}

//

export function class_apply_method(c, m, args) {
	return args ? m(c, ...args) : m(c);
}

export function class_send_message(c, msg, args) {
	let _c = class_find_class_method_class(c, msg);

	if (!_c)
		return class_send_message(c, 'doesNotRecognize', [msg, ...args]);

	let m = class_class_method_function(_c, msg);

	return class_apply_method(c, m, args);
}

export function class_super_send_message(fc, c, msg, args) {
	let sc = class_superclass(fc);

	let _c = class_find_class_method_class(sc, msg);

	if (!_c)
		return class_super_send_message(c, fc, 'doesNotRecognize', [msg, ...args]);

	let m = class_class_method_function(_c, msg);

	return class_apply_method(c, m, args);
}

export function object_apply_method(o, m, args) {
	return args ? m(o, ...args) : m(o);
}

export function object_send_message(o, msg, args) {
	let _c = class_find_instance_method_class(object_class(o), msg);

	if (!_c)
		return object_send_message(o, 'doesNotRecognize', [msg, ...args]);

	let m = class_instance_method_function(_c, msg);

	return object_apply_method(o, m, args);
}

export function object_super_send_message(fc, o, msg, args) {
	let sc = class_superclass(fc);

	let _c = class_find_instance_method_class(sc, msg);

	if (!_c)
		return object_super_send_message(o, fc, 'doesNotRecognize', [msg, ...args]);
	
	let m = class_instance_method_function(_c, msg);

	return object_apply_method(o, m, args);
}

