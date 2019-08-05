/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { defclass, sendmsg, supersend } from 'So-o';

import 'Card';

defclass('Hand', null, 1,
	null,
	['cards'],
	null,
	{	'init':
			(self, cards) => {
				if (! (Array.isArray(cards) && cards.length == 5))
					throw new TypeError();
	
				sendmsg(self, 'set', 'cards', cards);
	
				return self;
			},
		'copy':
			(self) => {
				let co = supersend(Hand, self, 'copy');
				let cards = sendmsg(co, 'get', 'cards');
	
				return sendmsg(co, 'set', 'cards', cards.slice(0));
			},
		'reorder':
			(self) => {
				let cards = sendmsg(self, 'get', 'cards');

				cards.sort((c1, c2) => sendmsg(c1, 'compare', c2));

				return self;
			},
		'card':
			(self, n) => {
				if (! (Number.isInteger(n) && n >= 1 && n <= 5))
					throw new RangeError();

				let cards = sendmsg(self, 'get', 'cards');

				return cards[n-1];
			},
		'setCard':
			(self, n, card) => {
				if (! (Number.isInteger(n) && n >= 1 && n <= 5))
					throw new RangeError();

				let cards = sendmsg(self, 'get', 'cards');

				cards[n-1] = card;

				return self;
			},
		'isOnePair':
			(self) => {
				// aabcd abbcd abccd abcdd
				let cards = sendmsg(self, 'get', 'cards');

				let r1 = sendmsg(cards[0], 'rank');
				let r2 = sendmsg(cards[1], 'rank');
				let r3 = sendmsg(cards[2], 'rank');
				let r4 = sendmsg(cards[3], 'rank');
				let r5 = sendmsg(cards[4], 'rank');

				if (r1 == r2 && r2 != r3 && r3 != r4 && r4 != r5)
					return true;

				if (r1 != r2 && r2 == r3 && r3 != r4 && r4 != r5)
					return true;

				if (r1 != r2 && r2 != r3 && r3 == r4 && r4 != r5)
					return true;

				if (r1 != r2 && r2 != r3 && r3 != r4 && r4 == r5)
					return true;

				return false;
			},
		'isTwoPairs':
			(self) => {
				// aabbc aabcc abbcc
				let cards = sendmsg(self, 'get', 'cards');

				let r1 = sendmsg(cards[0], 'rank');
				let r2 = sendmsg(cards[1], 'rank');
				let r3 = sendmsg(cards[2], 'rank');
				let r4 = sendmsg(cards[3], 'rank');
				let r5 = sendmsg(cards[4], 'rank');

				if (r1 == r2 && r2 != r3 && r3 == r4 && r4 != r5)
					return true;

				if (r1 == r2 && r2 != r3 && r3 != r4 && r4 == r5)
					return true;

				if (r1 != r2 && r2 == r3 && r3 != r4 && r4 == r5)
					return true;

				return false;
			},
		'isThreeOfKind':
			(self) => {
				// aabbc aabcc abbcc
				let cards = sendmsg(self, 'get', 'cards');

				let r1 = sendmsg(cards[0], 'rank');
				let r2 = sendmsg(cards[1], 'rank');
				let r3 = sendmsg(cards[2], 'rank');
				let r4 = sendmsg(cards[3], 'rank');
				let r5 = sendmsg(cards[4], 'rank');

				if (r1 == r2 && r2 == r3 && r3 != r4 && r4 != r5)
					return true;

				if (r1 != r2 && r2 == r3 && r3 == r4 && r4 != r5)
					return true;

				if (r1 != r2 && r2 != r3 && r3 == r4 && r4 == r5)
					return true;

				return false;
			},
		'isStraight':
			(self) => {
				// a(a+1)(a+2)(a+3)(a+4)
				let cards = sendmsg(self, 'get', 'cards');

				let r1 = sendmsg(cards[0], 'rank');
				let r2 = sendmsg(cards[1], 'rank');
				let r3 = sendmsg(cards[2], 'rank');
				let r4 = sendmsg(cards[3], 'rank');
				let r5 = sendmsg(cards[4], 'rank');

				if (r5 == r4+1 && r4 == r3+1 && r3 == r2+1 && r2 == r1+1)
					return true;	// could be a straight flush

				return false;
			},
		'isFlush':
			(self) => {
				let cards = sendmsg(self, 'get', 'cards');

				let s1 = sendmsg(cards[0], 'suit');
				let s2 = sendmsg(cards[1], 'suit');
				let s3 = sendmsg(cards[2], 'suit');
				let s4 = sendmsg(cards[3], 'suit');
				let s5 = sendmsg(cards[4], 'suit');

				if (s1 == s2 && s2 == s3 && s3 == s4 && s4 == s5)
					return true;	// could be a straight flush

				return false;
			},
		'isFullHouse':
			(self) => {
				// aaabb aabbb
				let cards = sendmsg(self, 'get', 'cards');

				let r1 = sendmsg(cards[0], 'rank');
				let r2 = sendmsg(cards[1], 'rank');
				let r3 = sendmsg(cards[2], 'rank');
				let r4 = sendmsg(cards[3], 'rank');
				let r5 = sendmsg(cards[4], 'rank');

				if (r1 == r2 && r2 == r3 && r3 != r4 && r4 == r5)
					return true;

				if (r1 == r2 && r2 != r3 && r3 == r4 && r4 == r5)
					return true;

				return false;
			},
		'isFourOfKind':
			(self) => {
				// aaaab abbbb
				let cards = sendmsg(self, 'get', 'cards');

				let r1 = sendmsg(cards[0], 'rank');
				let r2 = sendmsg(cards[1], 'rank');
				let r3 = sendmsg(cards[2], 'rank');
				let r4 = sendmsg(cards[3], 'rank');
				let r5 = sendmsg(cards[4], 'rank');

				if (r1 == r2 && r2 == r3 && r3 == r4)
					return true;

				if (r2 == r3 && r3 == r4 && r4 == r5)
					return true;


				return false;
			},
		'isStraightFlush':
			(self) => {
				// a(a+1)(a+2)(a+3)(a+4)
				if (sendmsg(self, 'isStraight') && sendmsg(self, 'isFlush'))
					return true;

				return false;
			},
		'evaluate':
			(self) => {
					// sort or nothing works!
					let copy = sendmsg(sendmsg(self, 'copy'), 'reorder');

					// DON'T change order
					if (sendmsg(copy, 'isStraightFlush'))
						return Hand.STRAIGHTFLUSH;

					if (sendmsg(copy, 'isFourOfKind'))
						return Hand.FOUROFKIND;

					if (sendmsg(copy, 'isFullHouse'))
						return Hand.FULLHOUSE;

					if (sendmsg(copy, 'isFlush'))
						return Hand.FLUSH;

					if (sendmsg(copy, 'isStraight'))
						return Hand.STRAIGHT;

					if (sendmsg(copy, 'isThreeOfKind'))
						return Hand.THREEOFKIND;

					if (sendmsg(copy, 'isTwoPairs'))
						return Hand.TWOPAIRS;

					if (sendmsg(copy, 'isOnePair'))
						return Hand.ONEPAIR;

					return Hand.NOTHING;
				},
		'toString':
			(self) => {
				let val = sendmsg(self, 'evaluate');
				let cards = sendmsg(self, 'get', 'cards');
				let s = cards.map((c) => sendmsg(c, 'toString'));

				return s.join(',', s) + ' -> ' + Hand.hand2s[val];
			}
	}
);

Hand.NOTHING		= 0;
Hand.ONEPAIR		= 1;
Hand.TWOPAIRS		= 2;
Hand.THREEOFKIND	= 3;
Hand.STRAIGHT		= 4;
Hand.FLUSH 			= 5;
Hand.FULLHOUSE		= 6;
Hand.FOUROFKIND		= 7;
Hand.STRAIGHTFLUSH	= 8;

Hand.hand2s	= [
	'NOTHING',
	'ONEPAIR',
	'TWOPAIRS',
	'THREEOFKIND',
	'STRAIGHT',
	'FLUSH',
	'FULLHOUSE',
	'FOUROFKIND',
	'STRAIGHTFLUSH',
];
