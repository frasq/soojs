/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { sendmsg } from 'So-o';

import 'Hand';

let card1 = sendmsg(Card, 'new', Card.ACE, Card.SPADES);
let card2 = sendmsg(Card, 'new', Card.THREE, Card.CLUBS);
let card3 = sendmsg(Card, 'new', Card.ACE, Card.DIAMONDS);
let card4 = sendmsg(Card, 'new', Card.JACK, Card.HEARTS);
let card5 = sendmsg(Card, 'new', Card.SIX, Card.SPADES);

let hand = sendmsg(Hand, 'new', [card1, card2, card3, card4, card5]);

console.log(sendmsg(hand, 'toString'));
sendmsg(hand, 'reorder');
console.log(sendmsg(hand, 'toString'));
console.log(sendmsg(sendmsg(hand, 'card', 1), 'toString'));
sendmsg(hand, 'setCard', 2, sendmsg(Card, 'new', Card.ACE, Card.HEARTS));
console.log(sendmsg(hand, 'toString'));

let testhands = [
	[[Card.JACK, Card.SPADES], [Card.KING, Card.HEARTS], [Card.ACE, Card.DIAMONDS], [Card.TWO, Card.CLUBS], [Card.FIVE, Card.SPADES]],
	[[Card.ACE, Card.SPADES], [Card.THREE, Card.CLUBS], [Card.FOUR, Card.DIAMONDS], [Card.THREE, Card.HEARTS], [Card.SIX, Card.SPADES]],
	[[Card.SEVEN, Card.SPADES], [Card.KING, Card.HEARTS], [Card.SEVEN, Card.DIAMONDS], [Card.JACK, Card.CLUBS], [Card.JACK, Card.SPADES]],
	[[Card.FOUR, Card.SPADES], [Card.NINE, Card.HEARTS], [Card.NINE, Card.DIAMONDS], [Card.EIGHT, Card.CLUBS], [Card.NINE, Card.SPADES]],
	[[Card.KING, Card.HEARTS], [Card.JACK, Card.DIAMONDS], [Card.QUEEN, Card.CLUBS], [Card.TEN, Card.SPADES], [Card.ACE, Card.DIAMONDS]],
	[[Card.FOUR, Card.HEARTS], [Card.NINE, Card.HEARTS], [Card.ACE, Card.HEARTS], [Card.SEVEN, Card.HEARTS], [Card.QUEEN, Card.HEARTS]],
	[[Card.FOUR, Card.SPADES], [Card.TEN, Card.HEARTS], [Card.TEN, Card.DIAMONDS], [Card.FOUR, Card.CLUBS], [Card.TEN, Card.SPADES]],
	[[Card.KING, Card.DIAMONDS], [Card.JACK, Card.DIAMONDS], [Card.QUEEN, Card.DIAMONDS], [Card.TEN, Card.DIAMONDS], [Card.ACE, Card.DIAMONDS]],
];

for (let h of testhands) {
	let cards = h.map((c) => sendmsg(Card, 'perform', 'new', c));

	console.log(sendmsg(sendmsg(Hand, 'new', cards), 'toString'));
}
