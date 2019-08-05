/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { defclass, sendmsg, supersend } from 'So-o';

import 'Hand';

defclass('Deck', null, 1,
	null,
	['cards', 'top', 'shuffleWhenEmpty'],
	null,
	{	'init':
			(self, swe = false) => {
				sendmsg(self, 'set', 'shuffleWhenEmpty', swe ? true : false);

				let cards = [];

				for (let s = 0; s < 4; s++)
					for (let r = 0; r < 13; r++)
						cards[ 13*s+r ] = sendmsg(Card, 'new', r, s);

				sendmsg(self, 'set', 'cards', cards);
				sendmsg(self, 'set', 'top', 0);

				return self;
			},
		'shuffle':
			(self) => {
					let cards = sendmsg(self, 'get', 'cards');
					let len = cards.length;

					for (let i = cards.length - 1; i > 0; i--) {
				        const j = Math.floor(Math.random() * (i + 1));
				        const c = cards[j];
				        
				        cards[j] = cards[i], cards[i] = c;
					}

					sendmsg(self, 'set', 'cards', cards);
					sendmsg(self, 'set', 'top', 0);

					return self;
				},
		'check':
			(self) => {
				let top = sendmsg(self, 'get', 'top');

				if (++top >= 52) {
					if (sendmsg(self, 'get', 'shuffleWhenEmpty'))
						sendmsg(self, 'shuffle');

					top = 0;
				}

				sendmsg(self, 'set', 'top', top);

				return self;
			},
		'deal':
			(self) => {
				let cards = sendmsg(self, 'get', 'cards');
				let top = sendmsg(self, 'get', 'top');

				let c = cards[top];

				sendmsg(self, 'check');

				return c;
			},
		'hand':
			(self, hand = null) => {
				let cards = [];

				for (let n = 0; n < 5; n++)
					cards.push(sendmsg(self, 'deal'));

				return hand ? sendmsg(hand, 'init', cards) : sendmsg(Hand, 'new', cards);
			},
		'toString':
			(self) => {
				let cards = sendmsg(self, 'get', 'cards');
				let top = sendmsg(self, 'get', 'top');

				let s = cards.map((c) => sendmsg(c, 'toString'));

				return s.join(',', s) + ' ' + top;
			}
	}
);
