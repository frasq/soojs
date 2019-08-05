/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { defclass } from 'So-o';
import * as OL from 'OL';

defclass('Root',
	// superclass
	null,
	// revision
	1,
	// class properties
	null,
	// instance properties
	null,
	// class messages
	{	'get':			(self, attr) => OL.class_get(self, attr),
		'set':			(self, attr, val) => OL.class_set(self, attr, val),
		'new':			(self, ...args) => OL.object_send_message(OL.class_send_message(self, 'make'), 'init', args),
		'make':			(self) => OL.class_make(self),
		'free':			(self) => undefined,
		'initialize':	(self) => self,
		'class':		(self) => self,
		'name':			(self) => OL.class_name(self),
		'revision':		(self) => OL.class_revision(self),
		'superclass':	(self) => OL.class_superclass(self),
		'classMessages':
			(self, inherit = true) => {
				let messages = OL.class_class_messages(self);

				if (messages)
					messages = Object.keys(messages);

				if (inherit) {
					let sc = OL.class_superclass(self);

					if (sc) {
						let inherited = OL.class_send_message(sc, 'classMessages');

						if (inherited)
							messages = messages ? [... new Set([...messages, ...inherited])] : inherited;
					}
				}

				return messages && messages.length > 0 ? messages : null;
			},
		'instanceMessages':
			(self, inherit = true) => {
				let messages = OL.class_instance_messages(self);

				if (messages)
					messages = Object.keys(messages);

				if (inherit) {
					let sc = OL.class_superclass(self);

					if (sc) {
						let inherited = OL.class_send_message(sc, 'instanceMessages');

						if (inherited)
							messages = messages ? [... new Set([...messages, ...inherited])] : inherited;
					}
				}

				return messages && messages.length > 0 ? messages : null;
			},
		'classProperties':
			(self, inherit = true) => {
				let properties = OL.class_class_properties(self);

				if (properties)
					properties = [... properties];

				if (inherit) {
					let sc = OL.class_superclass(self);

					if (sc) {
						let inherited_properties = OL.class_send_message(sc, 'classProperties');
	
						if (inherited_properties)
							properties = properties ? [... new Set([...properties, ...inherited_properties])] : inherited_properties;
					}
				}

				return properties && properties.length > 0 ? properties : null;
			},
		'instanceProperties':
			(self, inherit = true) => {
				let properties = OL.class_instance_properties(self);

				if (properties)
					properties = [... properties];

				if (inherit) {
					let sc = OL.class_superclass(self);

					if (sc) {
						let inherited_properties = OL.class_send_message(sc, 'instanceProperties');
	
						if (inherited_properties)
							properties = properties ? [... new Set([...properties, ...inherited_properties])] : inherited_properties;
					}
				}

				return properties && properties.length > 0 ? properties : null;
			},
		'classMethodFor':			(self, msg) => OL.class_find_class_method(self, msg),
		'instanceMethodFor':		(self, msg) => OL.class_find_instance_method(self, msg),
		'addClassMessage':			(self, msg, f) => OL.class_add_class_message(self, msg, f),
		'removeClassMessage':		(self, msg) => OL.class_remove_class_message(self, msg),
		'addInstanceMessage':		(self, msg, f) => OL.class_add_instance_message(self, msg, f),
		'removeInstanceMessage':	(self, msg) => OL.class_remove_instance_message(self, msg),
		'addClassProperty':			(self, prop) => OL.class_add_class_property(self, prop),
		'removeClassProperty':		(self, prop) => OL.class_remove_class_property(self, prop),
		'addInstanceProperty':		(self, prop) => OL.class_add_instance_property(self, prop),
		'removeInstanceProperty':	(self, prop) => OL.class_remove_instance_property(self, prop),
		'perform':	(self, msg, args = false) => OL.class_send_message(self, msg, args),
		'read':		(self, sdata) => {
						let properties = OL.class_send_message(self, 'classProperties');

						if (!properties)
							return self;

						let data = JSON.parse(sdata);
						
						if (typeof data !== 'object')
							throw new TypeError();

						let attributes = {};

						for (let p of properties) {
							if (data.hasOwnProperty(p))
								attributes[p] = data[p];
						}
							
						return OL.class_set_attributes(self, attributes);
					},
		'write':	(self) => JSON.stringify(OL.class_attributes(self)),
		'error':	(self, err, ...args) => {
					    let errmsg = err;

					    for (let i = 0; i < args.length; i++)
					    	errmsg = errmsg.replace(new RegExp(`\\{${i}\\}`, 'gi'), args[i]);

						console.error(errmsg);

					    return self;
					},
		'doesNotContain':			(self, prop) => OL.class_send_message(self, 'error', [Root.InvalidClassProperty, OL.class_name(self), prop]),
		'doesNotRecognize':			(self, msg) => OL.class_send_message(self, 'error', [Root.InvalidClassMessage, OL.class_name(self), msg]),
		'notImplemented':			(self, msg) => OL.class_send_message(self, 'error', [Root.NotImplemented, OL.class_name(self), msg]),
		'subclassResponsibility':	(self, msg) => OL.class_send_message(self, 'error', [Root.SubclassResponsibility, OL.class_name(self), msg]),
	},
	// instance messages
	{	'get':			(self, attr) => OL.object_get(self, attr),
		'set':			(self, attr, val) => OL.object_set(self, attr, val),
		'init':			(self) => self,
		'free':			(self) => undefined,
		'class':		(self) => OL.object_class(self),
		'superclass':	(self) => OL.class_superclass(OL.object_class(self)),
		'messages':		(self, inherit = true) => OL.class_send_message(OL.object_class(self), 'instanceMessages', [inherit]),
		'properties':	(self, inherit = true) => OL.class_send_message(OL.object_class(self), 'instanceProperties', [inherit]),
		'respondsTo':	(self, msg) => OL.class_find_instance_method_class(OL.object_class(self), msg) ? true : false,
		'methodFor':	(self, msg) => OL.class_find_instance_method(OL.object_class(self), msg),
		'isKindOf':		(self, c) => OL.class_is_kind_of(OL.object_class(self), c),
		'assume':		(self, c) => OL.object_assume(self, c),
		'copy':			(self) => OL.object_copy(self),
		'toString':		(self) => '',
		'delegate':		(self, msg = false, ...args) => {
							let delegate = OL.object_get(self, 'delegate');

							if (!msg)
								return delegate;

							if (!delegate)
								return false;

							if (!OL.object_send_message(delegate, 'respondsTo', [msg]))
								return false;
			
							return OL.object_send_message(delegate, msg, args);
						},
		'setDelegate':	(self, delegate) => {
							if (! (delegate === null || (typeof delegate === 'object' && delegate instanceof OL.Instance)))
								throw new TypeError();

							return OL.object_set(self, 'delegate', delegate);
						},
		'perform':	(self, msg, args = false) => OL.object_send_message(self, msg, args),
		'read':		(self, sdata) => {
						let properties = OL.class_send_message(OL.object_class(self), 'instanceProperties');

						if (!properties)
							return self;

						let data = JSON.parse(sdata);
						
						if (typeof data !== 'object')
							throw new TypeError();

						let attributes = {};

						for (let p of properties) {
							if (data.hasOwnProperty(p))
								attributes[p] = data[p];
						}
							
						return OL.object_set_attributes(self, attributes);
					},
		'write':	(self) => JSON.stringify(OL.object_attributes(self)),
		'error':	(self, err, ...args) => {
						let errmsg = err;

						for (let i = 0; i < args.length; i++)
							errmsg = errmsg.replace(new RegExp(`\\{${i}\\}`, 'gi'), args[i]);

						console.error(errmsg);

						return self;
					},
		'doesNotContain':			(self, prop) => OL.object_send_message(self, 'error', [Root.InvalidInstanceProperty, OL.class_name(OL.object_class(self)), prop]),
		'doesNotRecognize':			(self, msg) => OL.object_send_message(self, 'error', [Root.InvalidInstanceMessage, OL.class_name(OL.object_class(self)), msg]),
		'notImplemented':			(self, msg) => OL.object_send_message(self, 'error', [Root.NotImplemented, OL.class_name(OL.object_class(self)), msg]),
		'subclassResponsibility':	(self, msg) => OL.object_send_message(self, 'error', [Root.SubclassResponsibility, OL.class_name(OL.object_class(self)), msg]),
	}
);

Root.InvalidClassProperty = '{0}::{1} Invalid class property';
Root.InvalidClassMessage = '{0}::{1} Invalid class message';
Root.InvalidInstanceProperty = '{0}::{1} Invalid instance property';
Root.InvalidInstanceMessage = '{0}::{1} Invalid instance message';

Root.NotImplemented = '{0}::{1} Not implemented';
Root.SubclassResponsibility = '{0}::{1} Subclass responsibility';
