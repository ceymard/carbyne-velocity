
import {Atom, Controller, clonedeep} from 'carbyne';
import {default as v, $} from 'velocity-animate';
import 'velocity-animate/velocity.ui';

function mkAnimation(elt, spec) {

}

function applyStarts(element, props) {
	for (var x in props) {
		if (Array.isArray(props[x]))
			element.style[x] = props[x][props[x].length - 1];
	}
}

// The velocity decorator ?
export function velocity(specs) {
	return function (atom) {
		if (specs.enter) {
			atom.on('mount', (ev, created) => {
				let enter = {e: atom.element, p: clonedeep(specs.enter), o: {duration: 200}};
				applyStarts(atom.element, enter.p);
				v(enter)
			});
		}

		if (specs.leave) {
			atom.on('unmount:before', ev => {
				let leave = {e: atom.element, p: clonedeep(specs.leave), o: {duration: 200}};
				applyStarts(atom.element, leave.p);
				return v(leave)
			});
		}

		atom.on('destroy:before', ev => {
			// Call remove data
			v.Utilities.removeData(atom.element);
			// console.dir($);
		});
	}
}


/// XXX this is not up to what we want
export class Staggerer {
	constructor(amount) {
		this.last = new Date;
		this.amount = amount;
		this.cumulated_amount = 0;
	}

	getDelay() : integer {
		let delta_since_last = (new Date) - this.last;
		this.cumulated_amount = Math.max(0, this.cumulated_amount - delta_since_last);

		this.last = new Date;
	}
}

export function V(element, specs) {
	let s = clonedeep(specs);
	if (element instanceof Atom) element = atom.element;
	s.e = element;
	return v(s);
}