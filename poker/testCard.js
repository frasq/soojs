/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import { sendmsg } from 'So-o';

import 'Card';

let card_2c = sendmsg(Card, 'new', Card.TWO, Card.CLUBS);
let card_Td = sendmsg(Card, 'new', Card.TEN, Card.DIAMONDS);
let card_Kh = sendmsg(Card, 'new', Card.KING, Card.HEARTS);
let card_As = sendmsg(Card, 'new', Card.ACE, Card.SPADES);

console.log('2c -> ' + sendmsg(card_2c, 'toString') + ' (two of clubs)');
console.log('Td -> ' + sendmsg(card_Td, 'toString') + ' (ten of diamonds)');
console.log('Kh -> ' + sendmsg(card_Kh, 'toString') + ' (king of hearts)');
console.log('As -> ' + sendmsg(card_As, 'toString') + ' (ace of spades)');

console.log('-1 -> ' + sendmsg(card_Kh, 'compare', card_As));
console.log('0 -> ' + sendmsg(card_2c, 'compare', card_2c));
console.log('1 -> ' + sendmsg(card_Kh, 'compare', card_Td));
