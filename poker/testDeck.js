/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { sendmsg } from 'So-o';

import 'Deck';

let deck = sendmsg(Deck, 'new', true);

console.log(sendmsg(deck, 'toString'));
sendmsg(deck, 'shuffle');
console.log(sendmsg(deck, 'toString'));

let card = sendmsg(deck, 'deal');

console.log(sendmsg(card, 'toString'));

for (let n = 0; n < 5; n++)
	console.log(sendmsg(sendmsg(deck, 'hand'), 'toString'));

let ndeals = 100000;
let stats = [];
for (let i = 0; i < Hand.hand2s.length; i++)
	stats[i] = 0;

let hand = sendmsg(deck, 'hand');

let startTime = Date.now();

console.log('Dealing ' + ndeals + ' hands...');

for (let n = 0; n < ndeals; n++ )
	stats[ sendmsg(sendmsg(deck, 'hand', hand), 'evaluate') ]++;

let endTime = Date.now();

console.log( 'in ' + (endTime - startTime) / 1000 + ' s.');

let maxw = 0;

for (let s of Hand.hand2s) {
	const w = s.length;

	if (w > maxw)
		maxw = w;
}

let formatter = new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 });

for (let i = 0; i < Hand.hand2s.length; i++)
	console.log(Hand.hand2s[i].padStart(maxw) + '->' + stats[i] + "\t" + formatter.format(stats[i]/ndeals).padStart(6));

