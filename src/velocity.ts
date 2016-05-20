
import {Atom, Controller, clonedeep} from 'carbyne';
import * as v from 'velocity-animate';

function mkAnimation(elt, spec) {

}

function applyStarts(element, props) {
	for (var x in props) {
		if (Array.isArray(props[x]))
			element.style[x] = props[x][props[x].length - 1];
	}
}


/// XXX this is not up to what we want
// export class Staggerer {
// 	constructor(amount) {
// 		this.last = new Date;
// 		this.amount = amount;
// 		this.cumulated_amount = 0;
// 	}

// 	getDelay() {
// 		let delta_since_last = (new Date) - this.last;
// 		this.cumulated_amount = Math.max(0, this.cumulated_amount - delta_since_last);

// 		this.last = new Date;
// 	}
// }

export class VelocityCtrl extends Controller {

	enter: Object
	leave: Object

	constructor(spec) {
		super()
		this.enter = spec.enter || null
		this.leave = spec.leave || null
	}

	setEnter(spec) {
		this.enter = spec
	}

	setLeave(spec) {
		this.leave = spec
	}

	onMount() {
		if (this.enter) {
			var enter = {e: this.atom.element, p: clonedeep(this.enter), o: {duration: 200}};
			applyStarts(this.atom.element, enter.p);
			v(enter)
		}
	}

	onUnmountBefore() {
		if (this.leave) {
			var leave = {e: this.atom.element, p: clonedeep(this.leave), o: {duration: 200}};
			applyStarts(this.atom.element, leave.p);
			return v(leave)
		}
	}

	onDestroyBefore() {
		v.Utilities.removeData(this.atom.element, ['velocity', 'fxqueue']);
	}
}

export function V(element, specs) {
	let s = clonedeep(specs);
	if (element instanceof Atom) element = element.element;
	s.e = element;
	return v(s);
}


// The velocity decorator ?
export function velocity(specs) {
	return function (atom) {
		atom.addController(new VelocityCtrl(clonedeep(specs)))
	}
}

