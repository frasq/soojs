/**
 *
 * @copyright  2019 so-o.org
 * @version    1
 * @link       http://www.so-o.org
 */

"use strict";

import * as os from 'os';
import * as readline from 'readline';

import { sendmsg } from 'So-o';

import 'Deck';

(async () => {
	const deck = sendmsg(sendmsg(Deck, 'new', true), 'shuffle');

	const terminal = readline.createInterface({ input: process.stdin, output: process.stdout });

	const ask = (q) => new Promise((resolve) => terminal.question(`${q}? `, (r) => resolve(r.trim())));
	
	let play = true;

	while (play) {
		let hand = sendmsg(deck, 'hand');

		terminal.write(sendmsg(hand, 'toString'));
		terminal.write(os.EOL);
		
		await ask('Keep (1-5...)').then((s) => {
			let m = s.match(/[1-5]/g);
			
			let keep = m ? m.map((s) => Number.parseInt(s)) : [];
			
			for (let i = 1; i <= 5; i++) {
				if (keep.indexOf(i) == -1)
					sendmsg(hand, 'setCard', i, sendmsg(deck, 'deal'));
			}
		});
		
		terminal.write(sendmsg(hand, 'toString'));
		terminal.write(os.EOL);
		
		await ask('Play or (q)uit').then((s) => {
			if (s.charAt(0) == 'q' || s.charAt(0) == 'Q')
				play = false;
		});
	}

	terminal.close();
})();
