/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { defclass, sendmsg, supersend } from 'So-o';

defclass('Card', null, 1,
	null,
	['rank', 'suit'],
	null,
	{	'init':
			(self, rank, suit) => {
				sendmsg(self, 'set', 'rank', rank);
				sendmsg(self, 'set', 'suit', suit);

				return self;
			},
		'rank':
			(self) => sendmsg(self, 'get', 'rank'),
		'suit':
			(self) => sendmsg(self, 'get', 'suit'),
		'compare':
			(self, card) => {
					let rank1 = sendmsg(self, 'get', 'rank');
					let rank2 = sendmsg(card, 'get', 'rank');

					return rank1 == rank2 ? 0 : rank1 > rank2 ? 1 : -1;
				},
		'toString':
			(self) => Card.rank2s[sendmsg(self, 'get', 'rank')] + Card.suit2s[sendmsg(self, 'get', 'suit')]
	}
);

Card.TWO	= 0;
Card.THREE	= 1;
Card.FOUR	= 2;
Card.FIVE	= 3;
Card.SIX	= 4;
Card.SEVEN	= 5;
Card.EIGHT	= 6;
Card.NINE	= 7;
Card.TEN	= 8;
Card.JACK	= 9;
Card.QUEEN	= 10;
Card.KING	= 11;
Card.ACE	= 12;

Card.CLUBS		= 0;
Card.DIAMONDS	= 1;
Card.HEARTS		= 2;
Card.SPADES		= 3;

Card.rank2s = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
Card.suit2s = ['c', 'd', 'h', 's'];
