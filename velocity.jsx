
import {Atom, Controller, clonedeep} from 'carbyne';
import v from 'velocity-animate';
import 'velocity-animate/velocity.ui';

function mkAnimation(elt, spec) {

}

// The velocity decorator ?
export function velocity(specs) {
	return function (atom) {
		if (specs.enter) {
			atom.on('mount', (ev, created) => {
				let enter = {e: atom.element, p: clonedeep(specs.enter), o: {duration: 200}};
				v(enter)
			});
		}

		if (specs.leave) {
			atom.on('unmount:before', ev => {
				let leave = {e: atom.element, p: clonedeep(specs.leave), o: {duration: 200}};
				return v(leave)
			});
		}
	}
}

export function V(element, specs) {
	let s = clonedeep(specs);
	if (element instanceof Atom) element = atom.element;
	s.e = element;
	return v(s);
}